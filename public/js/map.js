let myMap

const idEvent = document.querySelector('#id').value

axios
    .get(`/api/events/${idEvent}`)
    .then(({ data }) => setMarkers(data))
    .catch(err => console.log(err))

function initMap() {
    myMap = new google.maps.Map(document.querySelector('#map'),
        {
            zoom: 15,
            center: { lat: 40.392456, lng: -3.698440299999999 },
        }
    )
}

function setMarkers(event) {
    lat = event.location.coordinates[0]
    lng = event.location.coordinates[1]
    myMap.setCenter({ lat, lng })
    new google.maps.Marker({
        map: myMap,
        position: { lat, lng },
        title: event.title,
    })

}