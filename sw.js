const CACHE_PREFIX = "biblioteca-lbt-";
const CACHE_VERSION = "biblioteca-lbt-v0119-single-inner-index";
const CORE = [
  "./","./index.html","./bienvenida.html",
  "./styles.css?v=0.11.0","./styles-enhancements.css?v=0.11.9","./styles-personal.css?v=0.10.9",
  "./organic-cards.css?v=0.7.3","./organic-mind-map.css?v=0.7.4",
  "./js/supabase-config.js?v=0.8.0","./js/auth.js?v=0.8.1","./js/data.js?v=0.11.9","./js/db.js?v=0.10.9","./js/supabase-sync.js?v=0.10.9",
  "./js/organic-cards.js?v=0.7.3","./js/qbi-mind-map-data.js?v=1.1.0","./js/qbi-mind-map-data.js?v=4.4.0","./js/organic-mind-map.js?v=0.11.1","./js/sync.js?v=0.11.0","./js/content.js?v=0.11.7","./js/study-workspace.js?v=0.11.9","./js/notes.js?v=0.7.3","./js/utilities.js?v=0.11.0","./js/app.js?v=0.11.9",
  "./js/reading-mode-v2.js?v=1.1.0","./js/qbi-official-frame-fix.js?v=1.0.0","./js/fisica-first-partial-guide.js?v=1.1.0","./js/fisica-topic-intros.js?v=1.2.0",
  "./js/estadistica-integral-bridge.js?v=1.4.0","./js/solved-update-status.js?v=1.0.0",
  "./content/catalog.json",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-integral.html?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-1.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-2.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-3.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-4.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-5.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-6.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-7.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-8.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-9.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-v140-payload-10.txt?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/theory.html?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/exercises.json?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/glossary.json?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-practica1-prompts-v130.json?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-practica2-v120-a.json?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-practica2-v120-b.json?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-source-prompts-v130.json?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-va-extension.html?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-lab-24-08.html?v=1.4.0",
  "./content/subjects/estadistica/units/probabilidad-practica-1/estadistica-campus-exercises.html?v=1.4.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/original.html?v=4.5.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-integrated-subject.js?v=4.5.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-math-render-fix.js?v=4.4.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-guide-memory-maps.js?v=4.4.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-guide-memory-equations.js?v=4.4.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzimas3-integration.js?v=4.5.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-tp2-extension.js?v=4.4.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzimas3-theory-1.txt?v=4.2.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzimas3-figures.txt?v=4.2.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzimas3-exercises-1.txt?v=4.2.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzimas3-exercises-2.txt?v=4.2.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzimas3-exercises-3.txt?v=4.2.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzimas3-exercises-4.txt?v=4.2.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-enzymes-extension.js?v=4.0.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-tp1-extension.js?v=4.0.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-exercises-v1.json?v=1.2.0",
  "./content/subjects/quimica_biologica1/units/proteinas-i/qbi-exercises-enzimas-i.json?v=1.0.0",
  "./manifest.webmanifest","./icons/icon.svg","./privacy.html","./terms.html"
];
self.addEventListener("install",event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE_VERSION);await Promise.all(CORE.map(async url=>{const response=await fetch(new Request(url,{cache:"reload"}));if(!response.ok)throw new Error(`No se pudo precachear ${url}`);await cache.put(url,response)}));await self.skipWaiting()})())});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE_VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function cacheFirstAndRefresh(request,fallbackUrl){const cache=await caches.open(CACHE_VERSION);const cached=(await cache.match(request))||(fallbackUrl?await cache.match(fallbackUrl):null);const update=fetch(request,{cache:"no-store"}).then(r=>{if(r&&r.ok)cache.put(request,r.clone());return r}).catch(()=>null);if(cached){update.catch(()=>null);return cached}return (await update)||Response.error()}
async function staleWhileRevalidate(request){const cache=await caches.open(CACHE_VERSION);const cached=await cache.match(request);const update=fetch(request,{cache:"no-store"}).then(r=>{if(r&&r.ok)cache.put(request,r.clone());return r}).catch(()=>null);return cached||(await update)||Response.error()}
async function fetchText(url){try{const r=await fetch(new Request(url,{cache:"no-store"}));return r.ok?await r.text():""}catch(_){return ""}}
async function injectFisicaGuides(request){const response=await cacheFirstAndRefresh(request);if(!response||!response.ok)return response||Response.error();const text=await response.text();const [guide,intros]=await Promise.all([fetchText("./js/fisica-first-partial-guide.js?v=1.1.0"),fetchText("./js/fisica-topic-intros.js?v=1.2.0")]);const safe=v=>v.replace(/<\/script/gi,"<\\/script"),injections=[];if(!text.includes('data-solved-fisica-guide="1"'))injections.push(guide?`<script data-solved-fisica-guide="1">${safe(guide)}</script>`:`<script src="/js/fisica-first-partial-guide.js?v=1.1.0" data-solved-fisica-guide="1"></script>`);if(!text.includes('data-solved-fisica-intros="1"'))injections.push(intros?`<script data-solved-fisica-intros="1">${safe(intros)}</script>`:`<script src="/js/fisica-topic-intros.js?v=1.2.0" data-solved-fisica-intros="1"></script>`);const body=injections.length?text.replace(/<\/body>/i,`${injections.join("")}</body>`):text,headers=new Headers(response.headers);headers.delete("content-length");headers.delete("content-encoding");headers.set("content-type","text/html; charset=utf-8");return new Response(body,{status:response.status,statusText:response.statusText,headers})}
async function injectAppShell(request,fallbackUrl){const response=await cacheFirstAndRefresh(request,fallbackUrl);if(!response||!response.ok)return response||Response.error();let text=await response.text();const injections=[];if(!text.includes('data-solved-reading-v2="1"'))injections.push('<script src="./js/reading-mode-v2.js?v=1.1.0" data-solved-reading-v2="1"></script>');if(!text.includes('data-solved-qbi-frame-fix="1"'))injections.push('<script src="./js/qbi-official-frame-fix.js?v=1.0.0" data-solved-qbi-frame-fix="1"></script>');if(!text.includes('data-solved-estadistica-integral="1"'))injections.push('<script src="./js/estadistica-integral-bridge.js?v=1.4.0" data-solved-estadistica-integral="1"></script>');if(!text.includes('data-solved-update-status="1"'))injections.push('<script src="./js/solved-update-status.js?v=1.0.0" data-solved-update-status="1"></script>');if(injections.length)text=text.replace(/<\/body>/i,`${injections.join("")}</body>`);const headers=new Headers(response.headers);headers.delete("content-length");headers.delete("content-encoding");headers.set("content-type","text/html; charset=utf-8");return new Response(text,{status:response.status,statusText:response.statusText,headers})}
self.addEventListener("fetch",event=>{const request=event.request;if(request.method!=="GET")return;const url=new URL(request.url);if(url.origin!==self.location.origin)return;if(request.mode==="navigate"){event.respondWith(injectAppShell(request,"./index.html"));return}if(url.pathname.endsWith("/content/catalog.json")){event.respondWith(fetch(request,{cache:"no-store"}));return}if(url.pathname.endsWith("/content/subjects/fisica1/units/resumen-integral/original.html")){event.respondWith(injectFisicaGuides(request));return}if(["script","style","worker"].includes(request.destination)){event.respondWith(cacheFirstAndRefresh(request));return}event.respondWith(staleWhileRevalidate(request))});
self.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")self.skipWaiting()});
