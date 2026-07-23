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
assert.throws(()=>validateEnvelope(env({schemaVersion:2})),/compatible/,"rechaza esquema desconocido");
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
  const stores=Object.fromEntries(["kv","subjects","events","highlights","meta"].map(x=>[x,new Map()]));
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
  console.log("Pruebas de sincronización y merge: OK");
})().catch(error=>{console.error(error);process.exitCode=1});
