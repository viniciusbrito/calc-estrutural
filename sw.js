let CACHE_NAME = "version-2.0"
let CACHE_LIB = 'libs-2.0'

let files = [
    './',
    'assets/js/bootstrap.bundle.min.js',
    'assets/js/calcula.js',
    'assets/css/bootstrap.min.css',
    'assets/css/all.min.css',
    'assets/css/style.css',
    'assets/img/favicon.ico',
    'assets/webfonts/fa-solid-900.woff2',
    'assets/webfonts/fa-solid-900.woff',
    'assets/webfonts/fa-solid-900.ttf',
]

let libs = [
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
]

self.addEventListener('install', () => {
    console.log("SW Installed")
})

self.addEventListener('activate', () => {
    console.log('SW Activated')
    caches.open(CACHE_NAME).then(cache => {
        cache.addAll(files).then(() => {
            caches.keys().then(cacheNames => {
                cacheNames.map(cacheName => {
                    if(cacheName !== CACHE_NAME)
                        return caches.delete(cacheName)
                })
            })
        })
    })

    libs.forEach((url) => {
        fetch(url).then(response => {
            caches.open(CACHE_LIB).then(cache => {
                cache.put(url, response)
            })
        })
    })
})


self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then(response => {
        return response? response : fetch(event.request)
    }))
})
