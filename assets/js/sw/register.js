if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => {
            console.log('SW Registred')
            reg.onupdatefound = () => {
                console.log('Updade Found')
            }
        })
        .catch(err => console.log('Error:', err))
}