const CACHE_PREFIX = "biblioteca-lbt-";
const CACHE_VERSION = "biblioteca-lbt-v0106-1";
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
  "./js/fisica-topic-intros.js?v=1.2.0",
  "./content/subjects/fisica1/units/resumen-integral/physics-mind-map.json?v=1.2.0",
  "./js/reading-mode-v2.js?v=1.1.0",
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

async function fetchText(url){
  try{
    const response=await fetch(new Request(url,{cache:"no-store"}));
    return response.ok?await response.text():"";
  }catch(_){return ""}
}

async function injectFisicaGuides(request){
  const response=await cacheFirstAndRefresh(request);
  if(!response||!response.ok)return response||Response.error();
  const text=await response.text();
  const [guide,intros]=await Promise.all([
    fetchText("./js/fisica-first-partial-guide.js?v=1.1.0"),
    fetchText("./js/fisica-topic-intros.js?v=1.2.0")
  ]);
  const safe=value=>value.replace(/<\/script/gi,"<\\/script");
  const guideMarker='data-solved-fisica-guide="1"';
  const introsMarker='data-solved-fisica-intros="1"';
  const injections=[];
  if(!text.includes(guideMarker))injections.push(guide?`<script ${guideMarker}>${safe(guide)}</script>`:`<script src="/js/fisica-first-partial-guide.js?v=1.1.0" ${guideMarker}></script>`);
  if(!text.includes(introsMarker))injections.push(intros?`<script ${introsMarker}>${safe(intros)}</script>`:`<script src="/js/fisica-topic-intros.js?v=1.2.0" ${introsMarker}></script>`);
  const body=injections.length?text.replace(/<\/body>/i,`${injections.join("")}</body>`):text;
  const headers=new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.set("content-type","text/html; charset=utf-8");
  return new Response(body,{status:response.status,statusText:response.statusText,headers});
}

async function injectAppShell(request,fallbackUrl){
  const response=await cacheFirstAndRefresh(request,fallbackUrl);
  if(!response||!response.ok)return response||Response.error();
  const text=await response.text();
  const marker='data-solved-reading-v2="1"';
  const injection=`<script src="./js/reading-mode-v2.js?v=1.1.0" ${marker}></script>`;
  const body=text.includes(marker)?text:text.replace(/<\/body>/i,`${injection}</body>`);
  const headers=new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.set("content-type","text/html; charset=utf-8");
  return new Response(body,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  if(request.mode==="navigate"){
    event.respondWith(injectAppShell(request,"./index.html"));
    return;
  }
  if(url.pathname.endsWith("/content/catalog.json")){event.respondWith(fetch(request,{cache:"no-store"}));return}
  if(url.pathname.endsWith("/content/subjects/fisica1/units/resumen-integral/original.html")){
    event.respondWith(injectFisicaGuides(request));
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
