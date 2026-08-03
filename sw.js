const CACHE_PREFIX = "biblioteca-lbt-";
const CACHE_VERSION = "biblioteca-lbt-v074-1";
const CORE = [
  "./",
  "./index.html",
  "./styles.css?v=0.7.4",
  "./styles-enhancements.css?v=0.7.3",
  "./organic-cards.css?v=0.7.3",
  "./organic-mind-map.css?v=0.7.3",
  "./js/authorized-users.js?v=0.7.3",
  "./js/auth.js?v=0.7.4",
  "./js/data.js?v=0.7.4",
  "./js/db.js?v=0.7.3",
  "./js/organic-cards.js?v=0.7.3",
  "./js/organic-mind-map.js?v=0.7.3",
  "./js/sync.js?v=0.7.3",
  "./js/content.js?v=0.7.3",
  "./js/notes.js?v=0.7.3",
  "./js/utilities.js?v=0.7.3",
  "./js/summary-factory.js?v=0.7.3",
  "./js/career-factory.js?v=0.7.3",
  "./js/app.js?v=0.7.4",
  "./content/catalog.json",
  "./content/subjects/quimica_organica/units/resumen-integral/organic-cards-v2.json",
  "./content/subjects/quimica_organica/units/resumen-integral/organic-mind-map.json",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./privacy.html",
  "./terms.html"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(CORE)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await caches.match(request)) || (fallbackUrl ? await caches.match(fallbackUrl) : Response.error());
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await caches.match(request);
  const update = fetch(request).then(response => {
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || (await update) || Response.error();
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "./index.html"));
    return;
  }
  if(url.pathname.endsWith("/content/catalog.json")){event.respondWith(fetch(request,{cache:"no-store"}));return}

  if (["script", "style", "worker"].includes(request.destination)) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});
