/////Basic map setup
// Initialize map options
var newYorkCoords = [40.73, -74.0059];
var usCenterCoords = [39.8283, -98.5795];
var mapZoomLevel = 5;

// Create the map object with options.
var myMap = L.map("map-id", {
    center: usCenterCoords,
    zoom: mapZoomLevel,
    invert: 100
    // hue: 
});

// Create the title layer that will be the background of our map.
//initialMap is the layer object, have basemaps dictionary would have that list entered so it could be selected in the legend.
let USGS_USImageryTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    }).addTo(myMap);
let initialStreet =
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
let initialTopo =
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });



// // Test that markers are working
// var marker = L.marker(newYorkCoords, {
//     draggable: true,
//     title: "My First Marker"
// }).addTo(myMap);


// /////Get the marker data
// // Pull the "stations" property from response.data.
// let bikeMarkers = [];
// let geoData = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

// Add outline layer
var geojsonStyle = {
    fillColor:"#6B0504",
    color: "#001514",
    weight: 1,
    opacity: .2,
    fillOpacity: 0.6,
};

let vtOptions = {
    maxZoom: 16,
    tolerance: 3,
    debug: 0,
    style: geojsonStyle
  };
let vtLayer = L.geoJson.vt(tribalOutlines, vtOptions).addTo(myMap);

////Markers
// d3.json(geoData).then(response => {
//     // Pull the "stations" property from response.data. to shorten what's used in the loop
//     let stations = response.data.stations;

//     // //Use For Loop
//     // for (var index = 0; index < stations.length; index++) {
//     //     // console.log("Help I'm stuck in for loop")
//     //     let station = stations[index];

//     //     // For each station, create a marker, and bind a popup with the station's name.
//     //     let bikeMarker = L.marker([station.lat, station.lon])
//     //.bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>")
//     //.addTo(myMap);
//     //     // ;
//     //     // Add the marker to the bikeMarkers array.
//     //     bikeMarkers.push(bikeMarker);
//     // }

//     //Use forEach
//     stations.forEach(station => {
//         // For each station, create a marker, and bind a popup with the station's name.
//         let bikeMarker = L.marker([station.lat, station.lon])
//             .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>")
//             .addTo(myMap);
//         // Add the marker to the bikeMarkers array.
//         bikeMarkers.push(bikeMarker);
//     });
// });


///// Legend Setup
// // Create two separate layer groups: one for the city markers and another for the state markers.
// let stationMarkers = L.layerGroup(bikeMarkers);

// Create a baseMaps object to hold the lightmap layer.
let baseMaps = {
    "USGS Topo" : USGS_USImageryTopo,
    "Street": initialStreet,
    "Topography": initialTopo
};

// Create an overlayMaps object to hold the bikeStations layer.
let overlayMaps = {
    "Outlines": vtLayer
};

// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
legendControl = L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// legendControl.addOverlay(stationMarkers, "Stations");
