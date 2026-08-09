(function(){
  let DB_NAME=window.SOLVED_PROFILE_DB_NAME||"solved-profile-guest";
  const DB_VERSION=8;
  const STORES=["kv","subjects","events","highlights","cardProgress","exerciseProgress","syncQueue","meta","contentPackages","importedHtml","userMaterials","notes","studySessions","collections","bookmarks","activityLog"];
  let db=null, fallback=false;
  const FALLBACK_KEY="biblioteca-lbt-v050-fallback",LEGACY_FALLBACK_KEY="biblioteca-lbt-v04-fallback",TRANSIENT_META=new Set(["drive-device-id","drive-authoritative-restore","drive-authoritative-cutoff","drive-preference","drive-auth-preference","drive-auth-state","locks"]);
  let memoryFallback=Object.fromEntries(STORES.map(s=>[s,{}]));

  function fallbackData(){
    try{const current=localStorage.getItem(FALLBACK_KEY),legacy=localStorage.getItem(LEGACY_FALLBACK_KEY);if(!current&&legacy)localStorage.setItem(FALLBACK_KEY,legacy);return JSON.parse(current||legacy)||memoryFallback;}
    catch(e){return memoryFallback;}
  }
  function saveFallback(data){memoryFallback=data;try{localStorage.setItem(FALLBACK_KEY,JSON.stringify(data));}catch(e){window.dispatchEvent(new CustomEvent("lbt-fallback-error",{detail:"El almacenamiento local está lleno. Los cambios quedan sólo en memoria y pueden perderse al cerrar."}));throw new Error("No se pudo persistir el almacenamiento alternativo")}}
  function keyFor(store,value){return store==="kv"||store==="meta"?value.key:value.id;}
  function open(){
    return new Promise(resolve=>{
      if(!("indexedDB" in window)){fallback=true;resolve({fallback:true});return;}
      let req;try{req=indexedDB.open(DB_NAME,DB_VERSION)}catch(error){fallback=true;resolve({fallback:true,error});return;}
      req.onupgradeneeded=()=>{
        const d=req.result;
        if(!d.objectStoreNames.contains("kv"))d.createObjectStore("kv",{keyPath:"key"});
        if(!d.objectStoreNames.contains("subjects"))d.createObjectStore("subjects",{keyPath:"id"});
        if(!d.objectStoreNames.contains("events")){
          const s=d.createObjectStore("events",{keyPath:"id"});s.createIndex("date","date");s.createIndex("subjectId","subjectId");
        }
        if(!d.objectStoreNames.contains("highlights")){
          const s=d.createObjectStore("highlights",{keyPath:"id"});s.createIndex("subjectId","subjectId");s.createIndex("blockId","blockId");
        }
        if(!d.objectStoreNames.contains("cardProgress"))d.createObjectStore("cardProgress",{keyPath:"id"});
        if(!d.objectStoreNames.contains("exerciseProgress"))d.createObjectStore("exerciseProgress",{keyPath:"id"});
        if(!d.objectStoreNames.contains("syncQueue"))d.createObjectStore("syncQueue",{keyPath:"id"});
        if(!d.objectStoreNames.contains("meta"))d.createObjectStore("meta",{keyPath:"key"});
        if(!d.objectStoreNames.contains("contentPackages"))d.createObjectStore("contentPackages",{keyPath:"id"});
        if(!d.objectStoreNames.contains("importedHtml")){const s=d.createObjectStore("importedHtml",{keyPath:"id"});s.createIndex("subjectId","subjectId");s.createIndex("order","order")}
        if(!d.objectStoreNames.contains("userMaterials")){const s=d.createObjectStore("userMaterials",{keyPath:"id"});s.createIndex("subjectId","subjectId");s.createIndex("section","section");s.createIndex("order","order")}
        if(!d.objectStoreNames.contains("notes")){const s=d.createObjectStore("notes",{keyPath:"id"});s.createIndex("subjectId","subjectId");s.createIndex("unitId","unitId")}
        if(!d.objectStoreNames.contains("studySessions")){const s=d.createObjectStore("studySessions",{keyPath:"id"});s.createIndex("subjectId","subjectId");s.createIndex("status","status")}
        if(!d.objectStoreNames.contains("collections"))d.createObjectStore("collections",{keyPath:"id"});
        if(!d.objectStoreNames.contains("bookmarks")){const s=d.createObjectStore("bookmarks",{keyPath:"id"});s.createIndex("collectionId","collectionId");s.createIndex("targetId","targetId")}
        if(!d.objectStoreNames.contains("activityLog")){const s=d.createObjectStore("activityLog",{keyPath:"id"});s.createIndex("occurredAt","occurredAt");s.createIndex("type","type")}
      };
      req.onsuccess=()=>{db=req.result;db.onversionchange=()=>db.close();resolve({fallback:false});};
      req.onerror=()=>{fallback=true;resolve({fallback:true,error:req.error});};
      req.onblocked=()=>{fallback=true;resolve({fallback:true,error:new Error("IndexedDB bloqueada")});};
    });
  }
  function tx(store,mode="readonly"){return db.transaction(store,mode).objectStore(store);}
  function get(store,key){
    if(fallback){return Promise.resolve(fallbackData()[store]?.[key]??null)}
    return new Promise((res,rej)=>{const r=tx(store).get(key);r.onsuccess=()=>res(r.result??null);r.onerror=()=>rej(r.error)});
  }
  function getAll(store){
    if(fallback){return Promise.resolve(Object.values(fallbackData()[store]||{}))}
    return new Promise((res,rej)=>{const r=tx(store).getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error)});
  }
  function put(store,value){
    if(fallback){const data=fallbackData();data[store] ||= {};data[store][keyFor(store,value)]=value;saveFallback(data);window.SOLVED_CLOUD?.queueChange(store,value);return Promise.resolve(value)}
    return new Promise((res,rej)=>{const r=tx(store,"readwrite").put(value);r.onsuccess=()=>{window.SOLVED_CLOUD?.queueChange(store,value);res(value)};r.onerror=()=>rej(r.error)});
  }
  function mergeSyncEnvelope(envelope,{chooseRecord,mergeSettings}){
    if(fallback){
      const data=fallbackData();
      const currentSettings=data.kv?.settings;
      data.kv ||= {};
      data.kv.settings={key:"settings",value:mergeSettings(currentSettings?.value||{},envelope.settings),updatedAt:envelope.generatedAt};
      for(const store of ["subjects","events","highlights","userMaterials","notes","studySessions","collections","bookmarks","activityLog"]){const items=envelope[store]||[];
        data[store] ||= {};
        for(const item of items)data[store][item.id]=chooseRecord(data[store][item.id],item);
      }
      saveFallback(data);return Promise.resolve();
    }
    return new Promise((resolve,reject)=>{
      const syncStores=["subjects","events","highlights","userMaterials","notes","studySessions","collections","bookmarks","activityLog"],transaction=db.transaction(["kv",...syncStores],"readwrite");
      transaction.oncomplete=()=>resolve();transaction.onerror=()=>reject(transaction.error);transaction.onabort=()=>reject(transaction.error||new Error("No se pudo combinar la sincronización."));
      const kv=transaction.objectStore("kv"),settingsRequest=kv.get("settings");
      settingsRequest.onsuccess=()=>{
        const settings=mergeSettings(settingsRequest.result?.value||{},envelope.settings);
        kv.put({key:"settings",value:settings,updatedAt:settings.updatedAt||envelope.generatedAt});
      };
      for(const store of syncStores){const items=envelope[store]||[];
        const objectStore=transaction.objectStore(store);
        for(const item of items){
          const request=objectStore.get(item.id);
          request.onsuccess=()=>objectStore.put(chooseRecord(request.result,item));
        }
      }
    });
  }
  function installContentPackage(record){
    if(fallback)return put("contentPackages",record);
    return new Promise((resolve,reject)=>{const transaction=db.transaction("contentPackages","readwrite");transaction.objectStore("contentPackages").put(record);transaction.oncomplete=()=>resolve(record);transaction.onerror=()=>reject(transaction.error);transaction.onabort=()=>reject(transaction.error)});
  }
  function del(store,key){
    if(fallback){const data=fallbackData();if(data[store])delete data[store][key];saveFallback(data);window.SOLVED_CLOUD?.remove(store,key);return Promise.resolve()}
    return new Promise((res,rej)=>{const r=tx(store,"readwrite").delete(key);r.onsuccess=()=>{window.SOLVED_CLOUD?.remove(store,key);res()};r.onerror=()=>rej(r.error)});
  }
  function clear(store){
    if(fallback){const data=fallbackData();data[store]={};saveFallback(data);return Promise.resolve()}
    return new Promise((res,rej)=>{const r=tx(store,"readwrite").clear();r.onsuccess=()=>res();r.onerror=()=>rej(r.error)});
  }
  const portable=(store,item)=>(store!=="meta"||!TRANSIENT_META.has(item.key)&&!String(item.key||"").includes("token")&&!String(item.key||"").includes("lock"))&&(store!=="studySessions"||["finished","cancelled"].includes(item.status));
  async function exportAll(){
    const stores={};for(const s of STORES)stores[s]=(await getAll(s)).filter(item=>portable(s,item));stores.syncQueue=[];
    return {format:"biblioteca-lbt-backup",schemaVersion:DB_VERSION,appVersion:window.LBT_DATA.APP_VERSION,exportedAt:new Date().toISOString(),stores};
  }
  function normalizeImport(payload){if(!payload||payload.format!=="biblioteca-lbt-backup"||!payload.stores||typeof payload.stores!=="object")throw new Error("Formato de respaldo inválido");const normalized={};for(const store of STORES){const input=payload.stores[store]??[];if(!Array.isArray(input))throw new Error(`Store ${store} inválida`);normalized[store]=input.filter(item=>portable(store,item)).map(item=>{if(!item||typeof item!=="object"||typeof keyFor(store,item)!=="string"||!keyFor(store,item))throw new Error(`Registro inválido en ${store}`);if(store==="contentPackages"){if(!item.data||!window.LBT_CONTENT?.validate)throw new Error("Paquete de contenido sin validador");window.LBT_CONTENT.validate(item.data)}return structuredClone(item)})}normalized.syncQueue=[];return normalized}
  async function importAll(payload,mode="merge"){
    const normalized=normalizeImport(payload),device=await get("meta","drive-device-id");if(fallback){const before=structuredClone(fallbackData()),next=mode==="replace"?Object.fromEntries(STORES.map(store=>[store,{}])):structuredClone(before);try{for(const store of STORES)for(const item of normalized[store]){const key=keyFor(store,item),existing=next[store]?.[key];if(mode==="merge"&&existing&&(existing.updatedAt||existing.createdAt||"")>(item.updatedAt||item.createdAt||""))continue;(next[store]||={})[key]=item}if(device)(next.meta||={})["drive-device-id"]=device;saveFallback(next);return}catch(error){memoryFallback=before;throw error}}
    return new Promise((resolve,reject)=>{const transaction=db.transaction(STORES,"readwrite");transaction.oncomplete=()=>resolve();transaction.onerror=()=>reject(transaction.error);transaction.onabort=()=>reject(transaction.error||new Error("Importación abortada"));try{if(mode==="replace")for(const store of STORES)transaction.objectStore(store).clear();for(const store of STORES)for(const item of normalized[store]){const objectStore=transaction.objectStore(store),key=keyFor(store,item);if(mode!=="merge"){objectStore.put(item);continue}const request=objectStore.get(key);request.onsuccess=()=>{const existing=request.result;if(!existing||(existing.updatedAt||existing.createdAt||"")<=(item.updatedAt||item.createdAt||""))objectStore.put(item)}}if(device)transaction.objectStore("meta").put(device)}catch(error){transaction.abort();reject(error)}})
  }
  function setProfile(profile){if(db)throw new Error("El perfil debe elegirse antes de abrir IndexedDB");DB_NAME=profile?.mode==="authorized-google"&&profile.sub?`solved-profile-${profile.sub}`:"solved-profile-guest"}
  window.LBT_DB={open,get,getAll,put,del,clear,mergeSyncEnvelope,installContentPackage,exportAll,importAll,setProfile,isFallback:()=>fallback,stores:STORES,get dbName(){return DB_NAME}};
})();
