(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.LBT_SYNC=api;
})(typeof window!=="undefined"?window:null,function(){
  "use strict";
  const CLIENT_ID="832913804678-2k7r1vb63jnhnq5a33dabmaspnmbpbp9.apps.googleusercontent.com";
  const SCOPE="https://www.googleapis.com/auth/drive.appdata";
  const FILE_NAME="biblioteca-lbt-sync-v1.json";
  const AUTHORITATIVE_RESTORE_KEY="drive-authoritative-restore";
  const AUTHORITATIVE_CUTOFF_KEY="drive-authoritative-cutoff";
  const REPLICA_PROTOCOL="device-replica-v1";
  const SETTINGS_FIELDS=["theme","currentIds","order","calendar","lastPage","lastSubject","lastTab","lastBlock","lastUnitBySubject","zoomIndex","viewerVisible","indexVisible"];
  const EPOCH="1970-01-01T00:00:00.000Z";

  function stable(value){
    if(Array.isArray(value))return `[${value.map(stable).join(",")}]`;
    if(value&&typeof value==="object")return `{${Object.keys(value).sort().map(k=>`${JSON.stringify(k)}:${stable(value[k])}`).join(",")}}`;
    return JSON.stringify(value);
  }
  function time(value){const n=Date.parse(value||"");return Number.isFinite(n)?n:0}
  function chooseRecord(a,b){
    if(!a)return b;if(!b)return a;
    const ta=time(a.updatedAt||a.deletedAt||a.createdAt),tb=time(b.updatedAt||b.deletedAt||b.createdAt);
    if(ta!==tb)return ta>tb?a:b;
    return stable(a)>=stable(b)?a:b;
  }
  function mergeRecords(...groups){
    const merged=new Map();
    for(const group of groups)for(const item of Array.isArray(group)?group:[]){if(item&&typeof item.id==="string")merged.set(item.id,chooseRecord(merged.get(item.id),item))}
    return [...merged.values()].sort((a,b)=>a.id.localeCompare(b.id));
  }
  function normalizeSettings(input={},fallbackClock=EPOCH){
    const value={...input},clocks={...(input.fieldUpdatedAt||{})};
    const base=input.updatedAt||fallbackClock;
    for(const field of SETTINGS_FIELDS)if(Object.prototype.hasOwnProperty.call(value,field)&&!clocks[field])clocks[field]=base;
    value.fieldUpdatedAt=clocks;return value;
  }
  function mergeSettings(a={},b={}){
    a=normalizeSettings(a);b=normalizeSettings(b);
    const out={...a,...b,fieldUpdatedAt:{...a.fieldUpdatedAt}};
    for(const field of SETTINGS_FIELDS){
      const ac=a.fieldUpdatedAt[field]||EPOCH,bc=b.fieldUpdatedAt[field]||EPOCH;
      if(time(ac)>time(bc)||(time(ac)===time(bc)&&stable(a[field])>=stable(b[field]))){out[field]=a[field];out.fieldUpdatedAt[field]=ac}else{out[field]=b[field];out.fieldUpdatedAt[field]=bc}
    }
    out.updatedAt=Object.values(out.fieldUpdatedAt).sort().at(-1)||EPOCH;
    return out;
  }
  function validateEnvelope(value){
    if(!value||typeof value!=="object"||Array.isArray(value))throw new Error("El archivo de Drive no contiene un objeto válido.");
    if(value.schemaVersion!==1&&value.schemaVersion!==2)throw new Error("La versión del archivo de Drive no es compatible.");
    if(typeof value.appVersion!=="string"||typeof value.contentVersion!=="string"||!Number.isFinite(Date.parse(value.generatedAt))||typeof value.sourceDeviceId!=="string"||!value.sourceDeviceId||(value.authoritativeAt!==undefined&&!Number.isFinite(Date.parse(value.authoritativeAt))))throw new Error("El archivo de Drive está incompleto.");
    if(!value.settings||typeof value.settings!=="object")throw new Error("El archivo de Drive no contiene configuraciones válidas.");
    const normalized={...value,notes:Array.isArray(value.notes)?value.notes:[]};
    for(const key of ["subjects","events","highlights","notes"]){if(!Array.isArray(normalized[key])||normalized[key].some(item=>!item||typeof item!=="object"||typeof item.id!=="string"||!item.id||!Number.isFinite(Date.parse(item.updatedAt||item.deletedAt||item.createdAt))))throw new Error(`El archivo de Drive no contiene ${key} válidos.`)}
    return normalized;
  }
  function mergeEnvelopes(local,...remotes){
    let valid=[local,...remotes].map(validateEnvelope);
    const authoritativeAt=valid.map(x=>x.authoritativeAt).filter(Boolean).sort().at(-1)||null;
    if(authoritativeAt)valid=valid.filter(x=>x.authoritativeAt===authoritativeAt);
    return {
      schemaVersion:2,appVersion:local.appVersion,contentVersion:local.contentVersion,
      generatedAt:new Date().toISOString(),sourceDeviceId:local.sourceDeviceId,
      ...(authoritativeAt?{authoritativeAt}:{}),
      settings:valid.map(x=>x.settings).reduce(mergeSettings,{}),
      subjects:mergeRecords(...valid.map(x=>x.subjects)),events:mergeRecords(...valid.map(x=>x.events)),highlights:mergeRecords(...valid.map(x=>x.highlights)),notes:mergeRecords(...valid.map(x=>x.notes))
    };
  }
  function authHeaders(token,json=false){return {Authorization:`Bearer ${token}`,...(json?{"Content-Type":"application/json"}:{})}}
  async function driveFetch(fetcher,token,url,options={}){
    const response=await fetcher(url,{...options,headers:{...(options.headers||{}),...authHeaders(token)}});
    if(response.status===401){const error=new Error("La autorización de Google Drive venció.");error.code=401;throw error}
    if(!response.ok)throw new Error(`Google Drive respondió con estado ${response.status}.`);
    return response;
  }
  function multipartRelated(envelope,metadata){
    const boundary=`lbt_${crypto.randomUUID().replace(/-/g,"")}`;
    const body=[
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}`,
      `--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(envelope)}`,
      `--${boundary}--`
    ].join("\r\n");
    return {boundary,body,contentType:`multipart/related; boundary=${boundary}`};
  }

  class DriveSync{
    constructor({DB,appVersion,contentVersion,fetcher=fetch,onState=()=>{},onApplied=()=>{},withSyncLock=null}){this.DB=DB;this.appVersion=appVersion;this.contentVersion=contentVersion;this.fetcher=fetcher;this.onState=onState;this.onApplied=onApplied;this.withSyncLock=withSyncLock;this.token=null;this.expiresAt=0;this.needsReconnect=false;this.timer=null;this.running=false;this.again=false;this.blockedAfterReplace=false;this.authoritativeAt=null;this.deviceId=null;this.tokenClient=null;this.authInFlight=null;this.authResolve=null;this.authReject=null}
    hasToken(){return !!this.token&&Date.now()<this.expiresAt-30000}
    async init(){let item=await this.DB.get("meta","drive-device-id");if(!item){item={key:"drive-device-id",value:crypto.randomUUID(),updatedAt:new Date().toISOString()};await this.DB.put("meta",item)}this.deviceId=item.value;const restore=await this.DB.get("meta",AUTHORITATIVE_RESTORE_KEY),cutoff=await this.DB.get("meta",AUTHORITATIVE_CUTOFF_KEY);this.blockedAfterReplace=restore?.pending===true;this.authoritativeAt=(this.blockedAfterReplace?restore?.updatedAt:null)||cutoff?.value||null;this.onState(this.blockedAfterReplace?"pending-authoritative":"disconnected")}
    isAuthoritativePending(){return this.blockedAfterReplace}
    ensureTokenClient(){
      if(this.tokenClient)return this.tokenClient;
      if(!window.google?.accounts?.oauth2)throw new Error("Google Identity Services no pudo cargarse.");
      this.tokenClient=google.accounts.oauth2.initTokenClient({client_id:CLIENT_ID,scope:SCOPE,callback:async response=>{const resolve=this.authResolve,reject=this.authReject;try{if(response.error)throw new Error("Google no autorizó la conexión.");this.token=response.access_token;this.expiresAt=Date.now()+Number(response.expires_in||3600)*1000;this.needsReconnect=false;if(this.blockedAfterReplace){this.onState("pending-authoritative");resolve?.();return}await this.syncNow();resolve?.()}catch(error){reject?.(error)}}});return this.tokenClient
    }
    requestToken(){
      if(this.authInFlight)return this.authInFlight;
      try{const client=this.ensureTokenClient();this.authInFlight=new Promise((resolve,reject)=>{this.authResolve=resolve;this.authReject=reject;client.requestAccessToken({prompt:""})}).finally(()=>{this.authInFlight=null;this.authResolve=null;this.authReject=null});return this.authInFlight}catch(error){return Promise.reject(error)}
    }
    pauseForReconnect(){this.token=null;this.expiresAt=0;if(!this.needsReconnect){this.needsReconnect=true;this.onState("reconnect")}}
    disconnect(){const token=this.token;this.token=null;this.expiresAt=0;this.needsReconnect=false;clearTimeout(this.timer);this.onState("disconnected");try{if(token&&window.google?.accounts?.oauth2?.revoke)google.accounts.oauth2.revoke(token,()=>{})}catch(_){/* la copia local sigue disponible */}}
    localChanged(){if(this.blockedAfterReplace){this.onState("pending");return}if(this.hasToken()){this.onState("pending");if(this.running){this.again=true;return}clearTimeout(this.timer);this.timer=setTimeout(()=>this.syncNow().catch(()=>{}),3000)}else if(navigator.onLine)this.pauseForReconnect();else this.onState("offline")}
    async markLocalReplace(){this.blockedAfterReplace=true;this.authoritativeAt=new Date().toISOString();await this.DB.put("meta",{key:AUTHORITATIVE_RESTORE_KEY,pending:true,updatedAt:this.authoritativeAt});this.onState("pending-authoritative")}
    async snapshot(){const item=await this.DB.get("kv","settings");return {schemaVersion:2,appVersion:this.appVersion,contentVersion:this.contentVersion,generatedAt:new Date().toISOString(),sourceDeviceId:this.deviceId,...(this.authoritativeAt?{authoritativeAt:this.authoritativeAt}:{}),settings:normalizeSettings(item?.value||{},item?.updatedAt),subjects:await this.DB.getAll("subjects"),events:await this.DB.getAll("events"),highlights:await this.DB.getAll("highlights"),notes:await this.DB.getAll("notes")}}
    async listFiles(){const q=`name = '${FILE_NAME}' and trashed = false`;const url=`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${encodeURIComponent(q)}&fields=${encodeURIComponent("files(id,name,modifiedTime,createdTime,appProperties)")}`;return (await (await driveFetch(this.fetcher,this.token,url)).json()).files||[]}
    async download(id){return validateEnvelope(await (await driveFetch(this.fetcher,this.token,`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media`)).json())}
    async upload(envelope,id=null){const url=id?`https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(id)}?uploadType=multipart`:`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`;const replica={protocol:REPLICA_PROTOCOL,deviceId:this.deviceId};const metadata=id?{name:FILE_NAME,appProperties:replica}:{name:FILE_NAME,parents:["appDataFolder"],mimeType:"application/json",appProperties:replica};const multipart=multipartRelated(envelope,metadata);await driveFetch(this.fetcher,this.token,url,{method:id?"PATCH":"POST",headers:{"Content-Type":multipart.contentType},body:multipart.body})}
    async apply(envelope){if(this.DB.mergeSyncEnvelope)await this.DB.mergeSyncEnvelope(envelope,{chooseRecord,mergeSettings});else{const latest=validateEnvelope(await this.snapshot()),safe=mergeEnvelopes(envelope,latest);await this.DB.put("kv",{key:"settings",value:safe.settings,updatedAt:safe.settings.updatedAt||safe.generatedAt});for(const [store,items] of [["subjects",safe.subjects],["events",safe.events],["highlights",safe.highlights],["notes",safe.notes]])for(const item of items)await this.DB.put(store,item)}await this.onApplied()}
    ownReplica(files){return [...files].filter(file=>file.appProperties?.protocol===REPLICA_PROTOCOL&&file.appProperties?.deviceId===this.deviceId).sort((a,b)=>time(b.modifiedTime)-time(a.modifiedTime)||String(a.id).localeCompare(String(b.id)))[0]}
    async lockRound(action){if(this.withSyncLock)return this.withSyncLock(action);const locks=typeof navigator!=="undefined"&&navigator.locks;if(locks?.request)return locks.request(`biblioteca-lbt-drive-${this.deviceId}`,action);return action()}
    async syncRound(){const initial=validateEnvelope(await this.snapshot()),files=await this.listFiles(),remotes=[];for(const file of files)remotes.push(await this.download(file.id));const latest=validateEnvelope(await this.snapshot()),merged=mergeEnvelopes(initial,...remotes,latest);if(merged.authoritativeAt&&merged.authoritativeAt!==this.authoritativeAt){this.authoritativeAt=merged.authoritativeAt;await this.DB.put("meta",{key:AUTHORITATIVE_CUTOFF_KEY,value:this.authoritativeAt,updatedAt:new Date().toISOString()})}await this.apply(merged);const uploadSnapshot=mergeEnvelopes(merged,validateEnvelope(await this.snapshot()));await this.upload(uploadSnapshot,this.ownReplica(files)?.id||null)}
    async syncNow(){
      if(!this.hasToken()){this.pauseForReconnect();return}if(this.blockedAfterReplace){this.onState("pending-authoritative");return}if(this.running){this.again=true;return}
      this.running=true;this.onState("syncing");
      try{await this.lockRound(()=>this.syncRound());this.onState("synced")}
      catch(error){if(error.code===401)this.pauseForReconnect();else{this.onState(navigator.onLine?"error":"offline")}throw error}
      finally{this.running=false;if(this.again){this.again=false;this.syncNow().catch(()=>{})}}
    }
    async replaceRemote(){
      if(!this.hasToken()){this.onState("reconnect");throw new Error("Reconectá Google Drive antes de reemplazar la copia remota.")}
      this.onState("syncing");
      try{
        const local=validateEnvelope(await this.snapshot()),files=await this.listFiles();
        await this.upload(local,this.ownReplica(files)?.id||null);
        await this.DB.put("meta",{key:AUTHORITATIVE_CUTOFF_KEY,value:this.authoritativeAt,updatedAt:new Date().toISOString()});
        await this.DB.put("meta",{key:AUTHORITATIVE_RESTORE_KEY,pending:false,updatedAt:new Date().toISOString()});
        this.blockedAfterReplace=false;this.onState("synced");return true;
      }catch(error){if(error.code===401)this.pauseForReconnect();else this.onState(navigator.onLine?"error":"offline");throw error}
    }
  }
  return {CLIENT_ID,SCOPE,FILE_NAME,AUTHORITATIVE_RESTORE_KEY,AUTHORITATIVE_CUTOFF_KEY,REPLICA_PROTOCOL,SETTINGS_FIELDS,stable,chooseRecord,mergeRecords,normalizeSettings,mergeSettings,validateEnvelope,mergeEnvelopes,multipartRelated,DriveSync};
});
