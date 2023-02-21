let autocomplete

function initAutocomplete() {
    const latitudQuerry = document.querySelector('#latitude')
    const longitudeQuerry = document.querySelector('#longitude')
    const locationQuerry = document.querySelector('#location')
    const autocomplete = new google.maps.places.Autocomplete(locationQuerry)
    locationQuerry.addEventListener('keydown', function (event) {
        event.key === "Enter" ? event.preventDefault() : undefined
    })
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace()
        latitudQuerry.value = place.geometry.location.lat()
        longitudeQuerry.value = place.geometry.location.lng()
    })
}
