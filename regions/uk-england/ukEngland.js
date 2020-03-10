const jsonPath = "./regions/uk-england/uk-england.json";
var region = null;

function loadJson() {
    $.ajax({
        url: jsonPath,
        async: false,
        xhrFields: {
            withCredentials: false
        },
        crossDomain: false,
        success: function (jsonData) {
            region = jsonData;

            $.ajax({
                url: region.testSourceLink,
                async: false,
                crossDomain: false,
                xhrFields: {
                    withCredentials: false
                },
                success: function (htmlData) {
                    parser = new DOMParser();
                    htmlDoc = parser.parseFromString(htmlData, "text/html");
                    var table = htmlDoc.getElementsByTagName('table');
                }
            })
        }
    });
}


// function translateArray(array) {
//     let map = {}

//     parser = new DOMParser();
//     htmlDoc = parser.parseFromString(txt, "text/html");



//     while (array.length) {
//         let current = array.pop()
//         map[current] = map[current] || []
//         map[current].push(current)
//     }

//     return Object.keys(map1).map(key => map1[key])
// }


$(document).ready(function () {
    loadJson();
});