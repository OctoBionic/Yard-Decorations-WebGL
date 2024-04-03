const cacheName = "MeanTrick-YardDecorations-.1";
const contentToCache = [
    "Build/Yard Decorations WebGL.loader.js",
    "Build/89f144bec95feafccb7b50251aa57e8d.js",
    "Build/fbd10611fe7beab56a57024f3c838d43.data",
    "Build/db8680627a931413d33d693fbf3e1123.wasm",
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
