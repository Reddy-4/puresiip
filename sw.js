// Minimal service worker — just enough to make "Add to Home Screen" behave
// like a real installed app. It does not cache anything special; your data
// always comes live from Firebase, not from this file.
self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  self.clients.claim();
});

self.addEventListener('fetch', function(event){
  event.respondWith(
    fetch(event.request).catch(function(){
      return caches.match(event.request);
    })
  );
});
