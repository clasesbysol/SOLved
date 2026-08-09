const assert=require("node:assert/strict");
const {chooseRecord,mergeRecords,mergeSettings,mergeEnvelopes,validateEnvelope,multipartRelated,AUTHORITATIVE_RESTORE_KEY}=require("../js/sync.js");
const env=(patch={})=>({schemaVersion:1,appVersion:"0.4.5",contentVersion:"demo-2",generatedAt:"2026-01-01T00:00:00.000Z",sourceDeviceId:"device",settings:{},subjects:[],events:[],highlights:[],...patch});

{
  const a={id:"x",progress:10,updatedAt:"2026-01-01T00:00:00Z"},b={id:"x",progress:20,updatedAt:"2026-01-02T00:00:00Z"};
  assert.equal(chooseRecord(a,b).progress,20,"gana el registro más nuevo");
  assert.equal(chooseRecord({...a,progress:1},{...a,progress:2}).progress,2,"el empate es determinista");
}
{
  const merged=mergeRecords([{id:"a",updatedAt:"2026-01-01"}],[{id:"b",updatedAt:"2026-01-02"}]);
  assert.deepEqual(merged.map(x=>x.id),["a","b"],"conserva cambios de dos dispositivos");
  const tomb={id:"h",deletedAt:"2026-01-03",updatedAt:"2026-01-03"};
  assert.equal(mergeRecords([{id:"h",exact:"texto",updatedAt:"2026-01-01"}],[tomb])[0].deletedAt,tomb.deletedAt,"el tombstone nuevo gana");
  assert.equal(mergeRecords([tomb],[{id:"h",exact:"texto",updatedAt:"2026-01-01"}])[0].deletedAt,tomb.deletedAt,"un resaltado eliminado no reaparece");
}
{
  const a={theme:"dark",viewerVisible:true,fieldUpdatedAt:{theme:"2026-02-01",viewerVisible:"2026-01-01"}};
  const b={theme:"light",viewerVisible:false,fieldUpdatedAt:{theme:"2026-01-01",viewerVisible:"2026-02-01"}};
  const m=mergeSettings(a,b);assert.equal(m.theme,"dark");assert.equal(m.viewerVisible,false);
}
{
  const local=env({subjects:[{id:"s",progress:10,updatedAt:"2026-01-02"}],events:[{id:"local",updatedAt:"2026-01-02"}]});
  const remote=env({sourceDeviceId:"other",subjects:[{id:"s",progress:5,updatedAt:"2026-01-01"}],events:[{id:"remote",updatedAt:"2026-01-03"}]});
  const m=mergeEnvelopes(local,remote);assert.equal(m.subjects[0].progress,10);assert.deepEqual(m.events.map(x=>x.id),["local","remote"]);
}
assert.throws(()=>validateEnvelope({}),/versión/,"rechaza JSON corrupto");
assert.throws(()=>validateEnvelope(env({schemaVersion:5})),/compatible/,"rechaza esquema desconocido");
assert.deepEqual(validateEnvelope(env()).notes,[],"migra schema 1 con notes vacío");
{
  const stamp="2026-07-23T22:00:00Z",migrated=validateEnvelope(env({schemaVersion:2,notes:[]}));
  for(const key of ["studySessions","collections","bookmarks","activityLog"])assert.deepEqual(migrated[key],[],`schema 2 migra ${key} como array vacío`);
  const current=validateEnvelope(env({schemaVersion:3,studySessions:[{id:"session",status:"finished",updatedAt:stamp}],collections:[{id:"collection",updatedAt:stamp}],bookmarks:[{id:"bookmark",updatedAt:stamp}],activityLog:[{id:"activity",occurredAt:stamp,updatedAt:stamp}]}));
  assert.equal(current.studySessions[0].id,"session");assert.equal(current.activityLog[0].id,"activity");
}
{
  const old=env({notes:undefined}),newer=env({schemaVersion:2,sourceDeviceId:"notes-device",notes:[{id:"note-1",text:"Nueva",updatedAt:"2026-07-23T20:00:00Z"}]});
  const merged=mergeEnvelopes(old,newer);assert.equal(merged.schemaVersion,4);assert.equal(merged.notes[0].text,"Nueva","combina notas al migrar a schema 2");
  const tomb={id:"note-1",deletedAt:"2026-07-23T21:00:00Z",updatedAt:"2026-07-23T21:00:00Z"};assert.equal(mergeEnvelopes(newer,env({schemaVersion:2,notes:[tomb]})).notes[0].deletedAt,tomb.deletedAt,"el tombstone de nota evita que reaparezca");
}
assert.doesNotThrow(()=>mergeEnvelopes(env(),env({sourceDeviceId:"b"}),env({sourceDeviceId:"c"})),"combina múltiples archivos");
{
  global.crypto=require("node:crypto").webcrypto;
  const metadata={name:"biblioteca-lbt-sync-v1.json",parents:["appDataFolder"],mimeType:"application/json"};
  const content=env({subjects:[{id:"fisica1",progress:64,updatedAt:"2026-07-23T12:00:00Z"}]});
  const multipart=multipartRelated(content,metadata);
  assert.match(multipart.contentType,new RegExp(`^multipart/related; boundary=${multipart.boundary}$`));
  const metadataAt=multipart.body.indexOf(JSON.stringify(metadata)),contentAt=multipart.body.indexOf(JSON.stringify(content));
  assert.ok(metadataAt>0&&contentAt>metadataAt,"multipart ordena metadata antes del contenido");
  assert.ok(multipart.body.endsWith(`--${multipart.boundary}--`),"multipart cierra el boundary");
}
(async()=>{
  const {DriveSync}=require("../js/sync.js");
  global.crypto=require("node:crypto").webcrypto;global.navigator={onLine:true};
  const stores=Object.fromEntries(["kv","subjects","events","highlights","userMaterials","notes","studySessions","collections","bookmarks","activityLog","meta"].map(x=>[x,new Map()]));
  const DB={get:(s,k)=>Promise.resolve(stores[s].get(k)||null),getAll:s=>Promise.resolve([...stores[s].values()]),put:(s,v)=>{stores[s].set(s==="kv"||s==="meta"?v.key:v.id,v);return Promise.resolve(v)}};
  stores.kv.set("settings",{key:"settings",value:{theme:"dark",updatedAt:"2026-01-01",fieldUpdatedAt:{theme:"2026-01-01"}},updatedAt:"2026-01-01"});
  let uploads=0,downloads=0,lastUpload=null;
  const oldRemote=env({sourceDeviceId:"old-remote",subjects:[{id:"fisica1",progress:3,updatedAt:"2030-01-01T00:00:00Z"}]});
  const fetcher=async (url,options={})=>{
    if(url.includes("?alt=media")){downloads++;return new Response(JSON.stringify(oldRemote),{status:200})}
    if(url.includes("googleapis.com/drive/v3/files?"))return new Response(JSON.stringify({files:[{id:"old",modifiedTime:"2026-01-01"}]}),{status:200});
    uploads++;lastUpload={url,options};return new Response("{}",{status:200});
  };
  const sync=new DriveSync({DB,appVersion:"0.4.5",contentVersion:"demo-2",fetcher});await sync.init();
  await sync.markLocalReplace();assert.equal((await DB.get("meta",AUTHORITATIVE_RESTORE_KEY)).pending,true,"persiste el bloqueo autoritativo");
  await assert.rejects(()=>sync.replaceRemote(),/Reconectá/,"sin token no informa un reemplazo exitoso");assert.equal(uploads,0);
  const states=[];global.window={google:{accounts:{oauth2:{initTokenClient:({callback})=>({requestAccessToken:()=>callback({access_token:"memory-only",expires_in:3600})})}}}};global.google=global.window.google;
  const reloaded=new DriveSync({DB,appVersion:"0.4.5",contentVersion:"demo-2",fetcher,onState:state=>states.push(state)});await reloaded.init();assert.equal(reloaded.isAuthoritativePending(),true,"recupera el bloqueo después de recargar");
  await reloaded.requestToken();assert.equal(reloaded.isAuthoritativePending(),true,"obtener token no desbloquea");assert.equal(uploads,0,"obtener token no sube");assert.equal(downloads,0,"obtener token no mezcla el remoto viejo");
  assert.equal(await reloaded.replaceRemote(),true);assert.equal(uploads,1,"la confirmación autoritativa reemplaza Drive");assert.equal(downloads,0,"el reemplazo no descarga ni mezcla el remoto viejo");
  assert.equal((await DB.get("meta",AUTHORITATIVE_RESTORE_KEY)).pending,false,"solo la subida confirmada levanta el bloqueo");
  assert.match(new Headers(lastUpload.options.headers).get("content-type"),/^multipart\/related; boundary=/);assert.equal(lastUpload.options.body.includes('"sourceDeviceId":"old-remote"'),false,"la subida autoritativa no incluye el remoto viejo");
  await reloaded.syncNow();assert.equal(await DB.get("subjects","fisica1"),null,"una sincronización posterior ignora réplicas anteriores al reemplazo autoritativo");

  const makeDB=(deviceId,seed={})=>{
    const maps=Object.fromEntries(["kv","subjects","events","highlights","userMaterials","notes","studySessions","collections","bookmarks","activityLog","meta"].map(x=>[x,new Map()]));
    maps.meta.set("drive-device-id",{key:"drive-device-id",value:deviceId});
    maps.kv.set("settings",{key:"settings",value:{},updatedAt:"2026-01-01T00:00:00Z"});
    for(const [store,items] of Object.entries(seed))for(const item of items)maps[store].set(item.id,item);
    const api={get:(s,k)=>Promise.resolve(maps[s].get(k)||null),getAll:s=>Promise.resolve([...maps[s].values()]),put:(s,v)=>{maps[s].set(s==="kv"||s==="meta"?v.key:v.id,v);return Promise.resolve(v)}};
    api.mergeSyncEnvelope=async (envelope,{chooseRecord,mergeSettings})=>{const current=maps.kv.get("settings");maps.kv.set("settings",{key:"settings",value:mergeSettings(current?.value||{},envelope.settings),updatedAt:envelope.generatedAt});for(const store of ["subjects","events","highlights","userMaterials","notes","studySessions","collections","bookmarks","activityLog"])for(const item of envelope[store]||[])maps[store].set(item.id,chooseRecord(maps[store].get(item.id),item))};
    return {api,maps};
  };
  const grant=syncInstance=>{syncInstance.token="test-token";syncInstance.expiresAt=Date.now()+3600000};
  const multipartJson=options=>{const boundary=new Headers(options.headers).get("content-type").match(/boundary=(.+)$/)[1],parts=options.body.split(`--${boundary}`).filter(part=>part.includes("\r\n\r\n"));return {metadata:JSON.parse(parts[0].split("\r\n\r\n")[1].trim()),content:JSON.parse(parts[1].split("\r\n\r\n")[1].trim())}};

  {
    const local=makeDB("race-device",{subjects:[{id:"fisica1",progress:10,updatedAt:"2026-01-01T00:00:00Z"}]});
    let releaseList;const barrier=new Promise(resolve=>releaseList=resolve),uploaded=[];
    const raceFetcher=async (url,options={})=>{if(url.startsWith("https://www.googleapis.com/drive/v3/files?")){await barrier;return new Response(JSON.stringify({files:[{id:"legacy",modifiedTime:"2026-01-01"}]}),{status:200})}if(url.includes("?alt=media"))return new Response(JSON.stringify(env({sourceDeviceId:"legacy",subjects:[{id:"fisica1",progress:5,updatedAt:"2025-01-01T00:00:00Z"}]})),{status:200});uploaded.push(multipartJson(options));return new Response("{}",{status:200})};
    const raceSync=new DriveSync({DB:local.api,appVersion:"0.4.5",contentVersion:"demo-2",fetcher:raceFetcher});await raceSync.init();grant(raceSync);
    const pending=raceSync.syncNow();await Promise.resolve();await Promise.resolve();
    await local.api.put("subjects",{id:"fisica1",progress:91,updatedAt:"2026-07-23T20:00:00Z"});raceSync.localChanged();releaseList();await pending;
    assert.equal(local.maps.subjects.get("fisica1").progress,91,"una edición durante la espera no es sobrescrita en IndexedDB");
    assert.equal(uploaded.at(-1).content.subjects.find(x=>x.id==="fisica1").progress,91,"la edición durante la espera llega a Drive");
  }

  {
    const replicas=new Map([["legacy",{id:"legacy",modifiedTime:"2026-01-01",content:env()}]]);let listCount=0,releaseLists;const listsReady=new Promise(resolve=>releaseLists=resolve);
    const replicaFetcher=async (url,options={})=>{if(url.startsWith("https://www.googleapis.com/drive/v3/files?")){listCount++;if(listCount===2)releaseLists();await listsReady;return new Response(JSON.stringify({files:[...replicas.values()].map(({content,...file})=>file)}),{status:200})}if(url.includes("?alt=media")){const id=decodeURIComponent(url.match(/files\/([^?]+)/)[1]);return new Response(JSON.stringify(replicas.get(id).content),{status:200})}const parsed=multipartJson(options),match=url.match(/files\/([^?]+)/),id=match?decodeURIComponent(match[1]):`replica-${parsed.metadata.appProperties.deviceId}`;replicas.set(id,{id,modifiedTime:new Date().toISOString(),appProperties:parsed.metadata.appProperties,content:parsed.content});return new Response("{}",{status:200})};
    const a=makeDB("device-A",{subjects:[{id:"fisica1",progress:70,updatedAt:"2026-07-23T20:00:00Z"}]}),b=makeDB("device-B",{events:[{id:"parcial",title:"Parcial",updatedAt:"2026-07-23T20:01:00Z"}]});
    const syncA=new DriveSync({DB:a.api,appVersion:"0.4.5",contentVersion:"demo-2",fetcher:replicaFetcher}),syncB=new DriveSync({DB:b.api,appVersion:"0.4.5",contentVersion:"demo-2",fetcher:replicaFetcher});await Promise.all([syncA.init(),syncB.init()]);grant(syncA);grant(syncB);await Promise.all([syncA.syncNow(),syncB.syncNow()]);
    assert.equal(replicas.size,3,"cada deviceId crea y conserva su réplica física");
    await syncA.syncNow();assert.equal(a.maps.subjects.get("fisica1").progress,70);assert.equal(a.maps.events.get("parcial").title,"Parcial","una lectura posterior conserva los cambios simultáneos de A y B");
  }

  {
    let tail=Promise.resolve();const mutex=action=>{const run=tail.then(action);tail=run.catch(()=>{});return run};
    const shared=makeDB("same-install",{subjects:[{id:"quimica",progress:40,updatedAt:"2026-07-23T20:00:00Z"}],events:[{id:"coloquio",title:"Coloquio",updatedAt:"2026-07-23T20:01:00Z"}]});
    const remote=[];const tabFetcher=async (url,options={})=>{if(url.startsWith("https://www.googleapis.com/drive/v3/files?"))return new Response(JSON.stringify({files:remote.map(x=>({id:x.id,modifiedTime:x.modifiedTime,appProperties:x.appProperties}))}),{status:200});if(url.includes("?alt=media"))return new Response(JSON.stringify(remote.find(x=>url.includes(x.id)).content),{status:200});const parsed=multipartJson(options),id=remote[0]?.id||"same-replica";remote[0]={id,modifiedTime:new Date().toISOString(),appProperties:parsed.metadata.appProperties,content:parsed.content};return new Response("{}",{status:200})};
    const tabA=new DriveSync({DB:shared.api,appVersion:"0.4.5",contentVersion:"demo-2",fetcher:tabFetcher,withSyncLock:mutex}),tabB=new DriveSync({DB:shared.api,appVersion:"0.4.5",contentVersion:"demo-2",fetcher:tabFetcher,withSyncLock:mutex});await Promise.all([tabA.init(),tabB.init()]);grant(tabA);grant(tabB);await Promise.all([tabA.syncNow(),tabB.syncNow()]);
    assert.equal(remote.length,1,"dos pestañas de la misma instalación actualizan una única réplica");assert.equal(remote[0].content.subjects[0].progress,40);assert.equal(remote[0].content.events[0].title,"Coloquio","dos pestañas no pierden cambios");
  }
  console.log("Pruebas de sincronización y merge: OK");
})().catch(error=>{console.error(error);process.exitCode=1});
