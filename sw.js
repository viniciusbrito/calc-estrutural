let CACHE_NAME = "version-5"
let CACHE_LIB = 'libs-3'

let files = [
    './',
    'js/calcula.js',
    'css/style.css'
]

let libs = [
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.ttf',
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
