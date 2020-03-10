const jsonPath = "./regions/uk-england/uk-england.json";
var region = null;
const CREDENTIAL = "";

function loadJson() {
    var locationNumberMap = null;
    var totalNumber = 0;
    $.ajax({
        url: jsonPath,
        async: false,
        success: function (jsonData) {
            region = jsonData;
            // region = JSON.parse(jsonData);

            locationGeoMap = new Map(region.locationsGeocode);
            /* For getting geography code at the first time only */
            // updateAndPrintGeoDataToConsole(region, locationGeoMap);

            locationNumberMap = new Map(region.locationsGeocode);
            retriveHtml(region.testSourceLink, function (err, htmlData) {

                if (err != null) {
                    console.error(err);
                } else {
                    parser = new DOMParser();
                    htmlDoc = htmlData;
                    var updateTime = htmlDoc.getElementsByClassName("publication-header__last-changed")[0].textContent;
                    addUpdateTime(updateTime);
                    var dataSet = Array.from(htmlDoc.getElementsByTagName('table')[0]
                        .getElementsByTagName('tbody')[0]
                        .getElementsByTagName('tr'));
                    dataSet.forEach(tr => {
                        let location = tr.getElementsByTagName('td')[0].textContent;
                        let number = tr.getElementsByTagName('td')[1].textContent;
                        totalNumber += parseInt(number);
                        locationNumberMap.set(location, number);
                        let geocodeSet = locationGeoMap.get(location).split(",");
                        let locationObject = { lat: parseFloat(geocodeSet[0]), lng: parseFloat(geocodeSet[1]) };
                        if (number && number !== "" && number !== "0") {
                            // addMarker(locationObject, number+" "+location);
                            addMarker(locationObject, number);
                        }
                    });
                    addTotalMarker(totalNumber);
                }
            });

        }
    });
    return locationNumberMap;
}

function updateAndPrintGeoDataToConsole(region, locationGeoMap) {

    locationGeoMap.forEach((geocode, location, map) => {
        if (!geocode || geocode === "") {
            locationGeoMap.set(location, getGeocodeWithLocationName(location, region.regionName))
        }
    });
    region.locationsGeocode = [...locationGeoMap];

    /* Copy the console log to the json file to update your geography setting */
    console.log(JSON.stringify(region)); //Save the geocode to your json file
}

function getGeocodeWithLocationName(locationName, regionName) {
    var geocode = null;
    let address = locationName + ', ' + regionName
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + CREDENTIAL,
        async: false,
        success: function (jsonData) {
            let geoData = jsonData;
            geoLoc = geoData.results[0].geometry.location;
            geocode = geoLoc.lat + "," + geoLoc.lng;
        }
    });
    return geocode;
}

function addTotalMarker(total) {
    $("#totalNumber").text(total);
}

function addUpdateTime(updateTime) {
    $("#data-source").append(", " + updateTime);
}

function retriveHtml(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'document';

    xhr.onload = function () {

        var status = xhr.status;

        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };

    xhr.send();
};


$(document).ready(function () {
    var dataMap = loadJson();
});