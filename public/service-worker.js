importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.6.0/workbox-sw.js'
);

if (workbox) {
  console.log('Workbox is loaded.');

  // Precache and route setup
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // Example runtime caching route
  workbox.routing.registerRoute(
    ({ url }) =>
      url.origin === self.location.origin && url.pathname.endsWith('.png'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 50 })],
    })
  );

  // Handle skip waiting
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
} else {
  console.log(
    'Workbox could not be loaded. Check the network connection or CDN availability.'
  );
}
