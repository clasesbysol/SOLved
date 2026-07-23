import { test, expect } from "@playwright/test";

const envelope = patch => ({schemaVersion:1,appVersion:"0.4.5",contentVersion:"demo-2",generatedAt:"2026-07-23T12:00:00.000Z",sourceDeviceId:"remote-device",settings:{theme:"light",fieldUpdatedAt:{theme:"2026-07-23T12:00:00.000Z"}},subjects:[],events:[],highlights:[],...patch});

async function mockGoogle(page, remoteFiles=[]) {
  await page.route("https://accounts.google.com/gsi/client", route => route.fulfill({status:200,contentType:"application/javascript",body:""}));
  await page.addInitScript(files => {
    window.__driveMock={files,uploads:[],downloads:[],tokensIssued:0,force401:false,failUploads:0};
    window.google={accounts:{oauth2:{
      initTokenClient:({callback})=>({requestAccessToken:()=>{window.__driveMock.tokensIssued++;setTimeout(()=>callback({access_token:`memory-token-${window.__driveMock.tokensIssued}`,expires_in:3600}),0)}}),
      revoke:(_token,callback)=>callback?.()
    }}};
    const realFetch=window.fetch.bind(window);
    window.fetch=async (url,options={})=>{
      url=String(url);if(!url.includes("googleapis.com"))return realFetch(url,options);
      if(window.__driveMock.force401){window.__driveMock.force401=false;return new Response("",{status:401})}
      if(url.includes("/drive/v3/files?")&&!url.includes("upload"))return new Response(JSON.stringify({files:window.__driveMock.files.map(x=>x.meta)}),{status:200,headers:{"Content-Type":"application/json"}});
      const download=window.__driveMock.files.find(x=>url.includes(`/files/${x.meta.id}?alt=media`));
      if(download){window.__driveMock.downloads.push(download.meta.id);return new Response(JSON.stringify(download.data),{status:200,headers:{"Content-Type":"application/json"}})}
      if(url.includes("/upload/drive/v3/files")){window.__driveMock.uploads.push({url,method:options.method,headers:Object.fromEntries(new Headers(options.headers)),body:options.body});if(window.__driveMock.failUploads>0){window.__driveMock.failUploads--;return new Response("",{status:500})}return new Response(JSON.stringify({id:"canonical"}),{status:200,headers:{"Content-Type":"application/json"}})}
      return new Response("not mocked",{status:500});
    };
  }, remoteFiles);
}

async function tokenLeaks(page) {
  return page.evaluate(async () => {
    const database=await new Promise((resolve,reject)=>{const r=indexedDB.open("biblioteca-lbt");r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
    const values={};for(const name of database.objectStoreNames)values[name]=await new Promise((resolve,reject)=>{const r=database.transaction(name).objectStore(name).getAll();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
    return JSON.stringify({local:{...localStorage},session:{...sessionStorage},values}).includes("memory-token");
  });
}

test("@desktop funciona localmente sin Google y conserva cambios offline", async ({page,context}) => {
  await mockGoogle(page);await page.goto("/");
  await expect(page.locator("#driveActionBtn")).toHaveText("Conectar Google Drive");
  await context.setOffline(true);
  await page.locator('[data-progress="fisica1"]').fill("41");
  await expect(page.locator("#syncText")).toHaveText("Sin conexión");
  expect(await page.evaluate(()=>window.LBT_DB.get("subjects","fisica1").then(x=>x.progress))).toBe(41);
  await context.setOffline(false);
});

test("@desktop conecta, crea appDataFolder y no persiste el token", async ({page}) => {
  await mockGoogle(page);await page.goto("/");await page.locator("#driveActionBtn").click();
  await expect(page.locator("#syncText")).toHaveText("Sincronizado con Drive");
  const [upload]=await page.evaluate(()=>window.__driveMock.uploads);expect(upload.url).toContain("uploadType=multipart");expect(upload.method).toBe("POST");expect(upload.headers["content-type"]).toMatch(/^multipart\/related; boundary=/);
  expect(await tokenLeaks(page)).toBe(false);
  await page.reload();expect(await tokenLeaks(page)).toBe(false);
});

test("@desktop descarga y combina progreso, calendario, resaltados y múltiples copias", async ({page}) => {
  const files=[
    {meta:{id:"older",name:"biblioteca-lbt-sync-v1.json",modifiedTime:"2026-07-22T10:00:00Z"},data:envelope({events:[{id:"event-a",subjectId:"fisica1",date:"2026-08-01",title:"Parcial",updatedAt:"2026-07-22T10:00:00Z"}]})},
    {meta:{id:"newer",name:"biblioteca-lbt-sync-v1.json",modifiedTime:"2026-07-23T10:00:00Z"},data:envelope({subjects:[{id:"fisica1",status:"recursando",progress:73,updatedAt:"2026-07-23T10:00:00Z"}],highlights:[{id:"remote-h",subjectId:"fisica1",blockId:"fisica1:Vista integral:intro",start:0,end:5,exact:"Texto",prefix:"",suffix:" de prueba de la herram",updatedAt:"2026-07-23T10:00:00Z"}]})}
  ];
  await mockGoogle(page,files);await page.goto("/");await page.locator("#driveActionBtn").click();await expect(page.locator("#syncText")).toHaveText("Sincronizado con Drive");
  const stored=await page.evaluate(async()=>({subject:await LBT_DB.get("subjects","fisica1"),event:await LBT_DB.get("events","event-a"),highlight:await LBT_DB.get("highlights","remote-h")}));
  expect(stored.subject.progress).toBe(73);expect(stored.event.title).toBe("Parcial");expect(stored.highlight.exact).toBe("Texto");
  const uploads=await page.evaluate(()=>window.__driveMock.uploads);expect(uploads[0].url).toContain("/files/newer");expect(uploads[0].method).toBe("PATCH");
});

test("@desktop conserva cambios ante 401 y reconecta solo mediante botón", async ({page}) => {
  await mockGoogle(page);await page.goto("/");await page.evaluate(()=>window.__driveMock.force401=true);await page.locator("#driveActionBtn").click();
  await expect(page.locator("#syncText")).toHaveText("Reconectar Drive");
  expect(await page.evaluate(()=>window.__driveMock.tokensIssued)).toBe(1);
  await page.locator("#driveActionBtn").click();await expect(page.locator("#syncText")).toHaveText("Sincronizado con Drive");
  expect(await page.evaluate(()=>window.__driveMock.tokensIssued)).toBe(2);
});

test("@desktop rechaza remoto corrupto sin modificar IndexedDB", async ({page}) => {
  const bad=[{meta:{id:"bad",name:"biblioteca-lbt-sync-v1.json",modifiedTime:"2026-07-23T10:00:00Z"},data:{schemaVersion:99}}];
  await mockGoogle(page,bad);await page.goto("/");await expect(page.locator('[data-progress="fisica1"]')).toBeVisible();const before=await page.evaluate(()=>LBT_DB.get("subjects","fisica1"));await page.locator("#driveActionBtn").click();await expect(page.locator("#syncText")).toHaveText("Error de sincronización");expect(await page.evaluate(()=>LBT_DB.get("subjects","fisica1"))).toEqual(before);
});

test("@desktop conserva la restauración autoritativa hasta una subida real", async ({page}) => {
  const remote=envelope({subjects:[{id:"fisica1",status:"recursando",progress:3,updatedAt:"2030-01-01T00:00:00Z"}]});
  await mockGoogle(page,[{meta:{id:"old",name:"biblioteca-lbt-sync-v1.json",modifiedTime:"2030-01-01T00:00:00Z"},data:remote}]);await page.goto("/");
  const restoredAt="2026-07-23T12:00:00.000Z";
  const backup={format:"biblioteca-lbt-backup",schemaVersion:4,appVersion:"0.4.5",exportedAt:restoredAt,stores:{
    kv:[{key:"settings",value:{theme:"light",currentIds:["fisica1"],order:["fisica1"],calendar:{year:2026,month:6},fieldUpdatedAt:{theme:restoredAt},updatedAt:restoredAt},updatedAt:restoredAt}],
    subjects:[{id:"fisica1",status:"cursando",progress:88,updatedAt:restoredAt}],events:[],highlights:[],cardProgress:[],exerciseProgress:[],syncQueue:[],meta:[]
  }};
  await page.locator("#backupBtn").click();await page.locator("#importReplaceBtn").click();await page.locator("#restoreInput").setInputFiles({name:"respaldo.json",mimeType:"application/json",buffer:Buffer.from(JSON.stringify(backup))});
  await expect(page.locator(".toast")).toHaveText("Respaldo restaurado localmente");await page.locator("#backupBtn").click();await expect(page.locator("#replaceDriveBtn")).toBeVisible();
  await page.reload();await page.locator("#backupBtn").click();await expect(page.locator("#replaceDriveBtn")).toBeVisible();expect(await page.evaluate(()=>LBT_DB.get("subjects","fisica1").then(x=>x.progress))).toBe(88);
  page.on("dialog",dialog=>dialog.accept());await page.locator("#replaceDriveBtn").click();await expect(page.locator("#replaceDriveBtn")).toBeVisible();await expect(page.locator(".toast")).toHaveText("Reconectá Google Drive antes de reemplazar la copia remota.");expect(await page.evaluate(()=>window.__driveMock.uploads.length)).toBe(0);
  await page.locator('#backupModal [data-close="backupModal"]').click();await page.locator("#driveActionBtn").click();await expect(page.locator("#syncText")).toHaveText("Cambios pendientes");await page.locator("#backupBtn").click();await expect(page.locator("#replaceDriveBtn")).toBeVisible();
  expect(await page.evaluate(()=>({uploads:__driveMock.uploads.length,downloads:__driveMock.downloads.length}))).toEqual({uploads:0,downloads:0});expect(await page.evaluate(()=>LBT_DB.get("subjects","fisica1").then(x=>x.progress))).toBe(88);
  await page.evaluate(()=>window.__driveMock.failUploads=1);await page.locator("#replaceDriveBtn").click();await expect(page.locator("#replaceDriveBtn")).toBeVisible();await expect(page.locator(".toast")).not.toHaveText("Copia de Drive reemplazada");
  await page.locator("#replaceDriveBtn").click();await expect(page.locator("#replaceDriveBtn")).toBeHidden();await expect(page.locator(".toast")).toHaveText("Copia de Drive reemplazada");
  const result=await page.evaluate(async()=>({uploads:__driveMock.uploads,downloads:__driveMock.downloads,progress:(await LBT_DB.get("subjects","fisica1")).progress}));expect(result.downloads).toEqual([]);expect(result.progress).toBe(88);
  const upload=result.uploads.at(-1),type=upload.headers["content-type"],boundary=type.split("boundary=")[1];expect(type).toMatch(/^multipart\/related; boundary=/);
  const parts=upload.body.split(`--${boundary}`).filter(part=>part.includes("application/json"));expect(parts).toHaveLength(2);expect(JSON.parse(parts[0].split("\r\n\r\n")[1].trim())).toEqual({name:"biblioteca-lbt-sync-v1.json"});const content=JSON.parse(parts[1].split("\r\n\r\n")[1].trim());expect(content.subjects.find(x=>x.id==="fisica1").progress).toBe(88);expect(content.subjects.some(x=>x.progress===3)).toBe(false);
  await page.reload();await page.locator("#backupBtn").click();await expect(page.locator("#replaceDriveBtn")).toBeHidden();
});

test("@mobile conecta Drive sin almacenar credenciales", async ({page}) => {
  await mockGoogle(page);await page.goto("/");await page.locator("#driveActionBtn").click();await expect(page.locator("#syncText")).toHaveText("Sincronizado con Drive");expect(await tokenLeaks(page)).toBe(false);
});
