const CACHE_PREFIX = "biblioteca-lbt-";
const CACHE_VERSION = "biblioteca-lbt-v0104-16";
const CORE = [
  "./",
  "./index.html",
  "./bienvenida.html",
  "./styles.css?v=0.10.4",
  "./styles-enhancements.css?v=0.10.4",
  "./styles-personal.css?v=0.10.4",
  "./organic-cards.css?v=0.7.3",
  "./organic-mind-map.css?v=0.7.3",
  "./js/supabase-config.js?v=0.8.0",
  "./js/auth.js?v=0.8.1",
  "./js/data.js?v=0.10.4",
  "./js/db.js?v=0.10.4",
  "./js/supabase-sync.js?v=0.10.4",
  "./js/organic-cards.js?v=0.7.3",
  "./js/organic-mind-map.js?v=0.7.3",
  "./js/fisica-first-partial-guide.js?v=1.1.0",
  "./js/sync.js?v=0.10.4",
  "./js/content.js?v=0.8.4",
  "./js/study-workspace.js?v=0.10.4",
  "./js/notes.js?v=0.7.3",
  "./js/utilities.js?v=0.10.4",
  "./js/summary-factory.js?v=0.7.3",
  "./js/career-factory.js?v=0.7.3",
  "./js/app.js?v=0.10.4",
  "./content/catalog.json",
  "./content/subjects/quimica_organica/units/resumen-integral/organic-cards-v2.json",
  "./content/subjects/quimica_organica/units/resumen-integral/organic-mind-map.json",
  "./content/subjects/quimica_biologica1/units/proteinas-i/original.html?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzymes-extension.js?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-tp1-extension.js?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qb3-payload-1.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qb3-payload-2.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qb3-payload-3.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qb3-payload-4.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qb3-payload-5.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qb3-payload-6.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qb3-payload-7.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/concept-glossary-1.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/concept-glossary-2.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/concept-glossary-3.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/concept-glossary-4.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/concept-glossary-5.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/concept-glossary-6.txt?v=3.5.1",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-exercises.js?v=1.0.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-exercises.js?v=1.3.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-exercises-v1.json?v=1.2.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-exercises-enzimas-i.json?v=1.0.0",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./privacy.html",
  "./terms.html"
];

self.addEventListener("install", event => {
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_VERSION);
    await Promise.all(CORE.map(async url=>{
      const response=await fetch(new Request(url,{cache:"reload"}));
      if(!response.ok)throw new Error(`No se pudo precachear ${url}`);
      await cache.put(url,response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE_VERSION).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

async function cacheFirstAndRefresh(request,fallbackUrl){
  const cache=await caches.open(CACHE_VERSION);
  const cached=(await cache.match(request))||(fallbackUrl?await cache.match(fallbackUrl):null);
  const update=fetch(request,{cache:"no-store"}).then(response=>{
    if(response&&response.ok)cache.put(request,response.clone());
    return response;
  }).catch(()=>null);
  if(cached){update.catch(()=>null);return cached}
  return (await update)||Response.error();
}

async function staleWhileRevalidate(request){
  const cache=await caches.open(CACHE_VERSION);
  const cached=await cache.match(request);
  const update=fetch(request).then(response=>{
    if(response&&response.ok)cache.put(request,response.clone());
    return response;
  }).catch(()=>null);
  return cached||(await update)||Response.error();
}

async function injectFisicaFirstPartialGuide(request){
  const response=await cacheFirstAndRefresh(request);
  if(!response||!response.ok)return response||Response.error();
  const text=await response.text();
  let guide="";
  try{
    const guideResponse=await fetch(new Request("./js/fisica-first-partial-guide.js?v=1.1.0",{cache:"no-store"}));
    if(guideResponse.ok)guide=await guideResponse.text();
  }catch(_){}
  const safeGuide=guide.replace(/<\/script/gi,"<\\/script");
  const marker="data-solved-fisica-guide=\"1\"";
  const injection=safeGuide?`<script ${marker}>${safeGuide}</script>`:'<script src="/js/fisica-first-partial-guide.js?v=1.1.0" data-solved-fisica-guide="1"></script>';
  const body=text.includes(marker)?text:text.replace(/<\/body>/i,`${injection}</body>`);
  const headers=new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  return new Response(body,{status:response.status,statusText:response.statusText,headers});
}

const READING_VIEWER_HOTFIX=`
/* SOLved reading viewer hotfix v0.10.4-16: el iframe visible es el viewport. */
html.immersive-reading .rich-document,
html.immersive-reading .imported-html-frame,
html.immersive-reading .personal-pdf-frame{
  position:fixed!important;
  inset:0!important;
  display:block!important;
  box-sizing:border-box!important;
  width:100dvw!important;
  height:100dvh!important;
  min-width:0!important;
  min-height:0!important;
  max-width:none!important;
  max-height:none!important;
  margin:0!important;
  padding:0!important;
  border:0!important;
  border-radius:0!important;
  transform:none!important;
  transform-origin:0 0!important;
  z-index:2147483400!important;
  background:#fff!important;
}
html.immersive-reading .reading-mode-exit{
  position:fixed!important;
  z-index:2147483647!important;
}
`;

async function injectReadingViewerHotfix(request){
  const response=await cacheFirstAndRefresh(request);
  if(!response||!response.ok)return response||Response.error();
  const css=await response.text();
  const headers=new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.set("content-type","text/css; charset=utf-8");
  return new Response(`${css}\n${READING_VIEWER_HOTFIX}`,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  if(request.mode==="navigate"){
    event.respondWith(cacheFirstAndRefresh(request,"./index.html"));
    return;
  }
  if(url.pathname.endsWith("/content/catalog.json")){event.respondWith(fetch(request,{cache:"no-store"}));return}
  if(url.pathname.endsWith("/content/subjects/fisica1/units/resumen-integral/original.html")){
    event.respondWith(injectFisicaFirstPartialGuide(request));
    return;
  }
  if(url.pathname.endsWith("/styles-personal.css")){
    event.respondWith(injectReadingViewerHotfix(request));
    return;
  }

  if(["script","style","worker"].includes(request.destination)){
    event.respondWith(cacheFirstAndRefresh(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

self.addEventListener("message",event=>{
  if(event.data?.type==="SKIP_WAITING")self.skipWaiting();
});