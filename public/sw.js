const CACHE_NAME = 'next-pwa-cache-v1';
const STATIC_ASSETS = [
  '/', // Add your app's routes
  '/favicon.ico',
  '/_next/static/*', // Cache Next.js static files
  '/_next/image?*',  // Cache Next.js images
  // Add other static assets as needed
];

// Install event: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached assets or fetch from network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Handle API requests separately
  if (request.url.includes('/api/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cache.match(request));
      })
    );
    return;
  }

  // Handle other requests (e.g., static assets, dynamic routes)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (request.method === 'GET') {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    }).catch(() => {
      // Optionally, return a fallback page for offline
      if (request.mode === 'navigate') {
        return caches.match('/');
      }
    })
  );
});
