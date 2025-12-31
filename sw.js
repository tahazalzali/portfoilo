const CACHE_NAME = 'portfolio-v4'; // Update this version to force cache refresh
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
  '/assets/img/work-5.jpg',
  '/media/tahaLogo.jpg',
  '/tahalogo-noblue.png'
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

// Fetch event - Stale-While-Revalidate strategy for better UX
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Create a fetch promise to get fresh content
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Check if valid response
            if (networkResponse && networkResponse.status === 200) {
              // Clone response to cache it
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed, return cached version or offline fallback
            return cachedResponse;
          });

        // Return cached response immediately, then update cache in background
        return cachedResponse || fetchPromise;
      })
  );
});

// Handle service worker updates gracefully
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});