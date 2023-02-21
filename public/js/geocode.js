let geocoder

function initGeocode() {
    console.log('Geocodificador inicializado')
    geocoder = new google.maps.Geocoder()
}

document.querySelector('#location').onkeyup = () => {

    const location = document.querySelector('#location').value
    const query = { address: location }

    geocoder
        .geocode(query)
        .then(({ results }) => {
            const lat = results[0].geometry.location.lat()
            const lng = results[0].geometry.location.lng()

            console.log(lat, lng)
        })
        .catch(err => console.error(err))
}
