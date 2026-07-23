(function(){
  const DB_NAME="biblioteca-lbt";
  const DB_VERSION=4;
  const STORES=["kv","subjects","events","highlights","cardProgress","exerciseProgress","syncQueue","meta"];
  let db=null, fallback=false;
  const FALLBACK_KEY="biblioteca-lbt-v04-fallback";
  let memoryFallback=Object.fromEntries(STORES.map(s=>[s,{}]));

  function fallbackData(){
    try{return JSON.parse(localStorage.getItem(FALLBACK_KEY))||memoryFallback;}
    catch(e){return memoryFallback;}
  }
  function saveFallback(data){memoryFallback=data;try{localStorage.setItem(FALLBACK_KEY,JSON.stringify(data));}catch(e){/* memoria de sesión */}}
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
    if(fallback){const data=fallbackData();data[store] ||= {};data[store][keyFor(store,value)]=value;saveFallback(data);return Promise.resolve(value)}
    return new Promise((res,rej)=>{const r=tx(store,"readwrite").put(value);r.onsuccess=()=>res(value);r.onerror=()=>rej(r.error)});
  }
  function del(store,key){
    if(fallback){const data=fallbackData();if(data[store])delete data[store][key];saveFallback(data);return Promise.resolve()}
    return new Promise((res,rej)=>{const r=tx(store,"readwrite").delete(key);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)});
  }
  function clear(store){
    if(fallback){const data=fallbackData();data[store]={};saveFallback(data);return Promise.resolve()}
    return new Promise((res,rej)=>{const r=tx(store,"readwrite").clear();r.onsuccess=()=>res();r.onerror=()=>rej(r.error)});
  }
  async function exportAll(){
    const stores={};for(const s of STORES)stores[s]=await getAll(s);
    return {format:"biblioteca-lbt-backup",schemaVersion:DB_VERSION,appVersion:window.LBT_DATA.APP_VERSION,exportedAt:new Date().toISOString(),stores};
  }
  async function importAll(payload,mode="merge"){
    if(!payload||payload.format!=="biblioteca-lbt-backup"||!payload.stores)throw new Error("Formato de respaldo inválido");
    if(mode==="replace")for(const s of STORES)await clear(s);
    for(const s of STORES){
      const items=Array.isArray(payload.stores[s])?payload.stores[s]:[];
      for(const item of items){
        if(mode==="merge"){
          const key=keyFor(s,item),existing=await get(s,key);
          if(existing){
            const a=existing.updatedAt||existing.createdAt||"",b=item.updatedAt||item.createdAt||"";
            if(a>b)continue;
          }
        }
        await put(s,item);
      }
    }
  }
  window.LBT_DB={open,get,getAll,put,del,clear,exportAll,importAll,isFallback:()=>fallback,stores:STORES};
})();
