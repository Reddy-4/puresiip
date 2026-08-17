// Caches the app's own files (not your Firebase data) so the app shell
// appears instantly on repeat opens, even on a slow connection.
var CACHE_NAME = 'aquatrack-shell-v2';
var SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(SHELL_FILES);
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.filter(function(n){ return n !== CACHE_NAME; }).map(function(n){ return caches.delete(n); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event){
  var url = event.request.url;
  // Only handle our own files this way — Firebase/auth/data requests always go straight to the network.
  if(event.request.method !== 'GET' || url.indexOf(self.location.origin) !== 0){
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(cached){
      var networkFetch = fetch(event.request).then(function(response){
        if(response && response.status === 200){
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, copy); });
        }
        return response;
      }).catch(function(){ return cached; });
      // show cached shell instantly, refresh it in the background for next time
      return cached || networkFetch;
    })
  );
});
