const cacheName = "MeanTrick-YardDecorations-.1";
const contentToCache = [
    "Build/Yard Decorations WebGL.loader.js",
    "Build/09ad3308d9f71322a38a671bc18a0d29.js",
    "Build/97b3aabd92d731ffb0c1a309b07abc07.data",
    "Build/5de49865bd2ee6632202de319d02b994.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
