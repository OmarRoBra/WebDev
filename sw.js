const CACHE_NAME = 'omar_carrousel',
  urlsToCache = [
    './',
    './main.js',
    './js/vue.js',
    './style.css',
    './js/bootstrap.bundle.js',
    './css/bootstrap.css',

    './img/1.jpg',
    './img/3.jpeg',
    './img/4jpg.jpg',
    './img/2.jpg'
  ]
  self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
  })
  
  //una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
  self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]
  
    e.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              //Eliminamos lo que ya no se necesita en cache
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName)
              }
            })
          )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
  })
  
  //cuando el navegador recupera una url
  self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
      caches.match(e.request)
        .then( function(res) {
          return res || fetch(e.request).then(async function(response) {
            const cache = await caches.open('v1')
            cache.put(e.request, response.clone())
            return response
            })
        }))})