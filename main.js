// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var map = null;


function initialize() {
    var england = { lat: 53.00, lng: -2.00 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: england
    });

    // This event listener calls addMarker() when the map is clicked.
    // google.maps.event.addListener(map, 'click', function (event) {
    //     addMarker(event.latLng);
    // });

}

// Adds a marker to the map.
function addMarker(location, lable) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        label: lable,
        map: map,
        draggable: false,
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

