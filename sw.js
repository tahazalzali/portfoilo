const CACHE_NAME = 'portfolio-v1'; // Update this version to force cache refresh
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/custom-style.css',
  '/assets/css/cursor-follower.css',
  '/assets/js/main.js',
  '/assets/js/theme-switcher.js',
  '/assets/vendor/bootstrap/css/bootstrap.min.css',
  '/assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '/assets/vendor/glightbox/css/glightbox.min.css',
  '/assets/vendor/swiper/swiper-bundle.min.css',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/vendor/glightbox/js/glightbox.min.js',
  '/assets/vendor/typed.js/typed.min.js',
  '/assets/img/work-5.jpg'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone response to cache it
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
