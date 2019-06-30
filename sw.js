const upToDateCacheName = 'restaurant-reviews-v1';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(upToDateCacheName).then((cache) => {
      cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/css/styles.css',
        '/css/media.css',
        '/data/restaurants.json',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames.filter((cacheName) => cacheName != upToDateCacheName)
          .map((cacheName) => caches.delete(cacheName))
        );
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('sw fetch');
  event.respondWith(
    caches.open(upToDateCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});