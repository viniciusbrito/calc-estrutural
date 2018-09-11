if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('SW Registred'))
        .catch(err => console.log('Error:', err))
}