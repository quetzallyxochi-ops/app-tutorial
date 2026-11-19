// sw.js - Cachea tus archivos locales para consulta sin conexión
const CACHE_NAME = "tutorial-movil-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./control-versiones.html",
  "./persistencia-datos.html",
  "./gestion-sensores.html",
  "./recursos-multimedia.html",
  "./servicios-notificaciones.html",
  "./librerias-toolkits.html",
  "./depuracion-seguridad.html",
  "./referencias.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});
