// Nombre del caché que guardará los archivos de la app
const CACHE_NAME = 'agripac-app-cache-v1';
// Lista de archivos que se guardarán para que la app funcione offline
const urlsToCache = [
  './',
  './index.html' // Asegúrate que tu archivo HTML se llame así
];

// Evento "install": Se ejecuta cuando la PWA se instala.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento "fetch": Se ejecuta cada vez que la app pide un archivo.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en el caché, lo devuelve.
        if (response) {
          return response;
        }
        // Si no, lo busca en internet.
        return fetch(event.request);
      }
    )
  );
});