let myMap

function initMap() {
    myMap = new google.maps.Map(document.querySelector('#map'),
        {
            zoom: 15,
            center: { lat: 40.41021719585687, lng: - 3.6964127095024857 },
        }
    )
}
