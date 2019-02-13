// http://leafletjs.com
// https: //github.com/Leaflet/Leaflet.markercluster

$(document).ready(() => {
  // карта в спейсе
  function maps() {
    if (!$('#map').length) {
      return;
    }

    var map = L.map('map', {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView([51.513443, -0.102139], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
    }).addTo(map);

    var myMarker = L.icon({
      iconUrl: 'assets/images/map/map-marker.png',
      iconSize: [43, 46],
      iconAnchor: [13, 46],
    });

    // добавляем точку на карту по координатам
    var addMarker = function (coordinates) {
      L.marker(coordinates, {
        icon: myMarker,
      }).addTo(map);
    }

    addMarker([51.513443, -0.102139]);
  }

  // карта на главной
  function mapsTwo() {
    if (!$('#mapTwo').length) {
      return;
    }
    var mapTwo = L.map('mapTwo', {
      scrollWheelZoom: false,
    }).setView([59.934, 30.335], 13);
    var myMarker = L.icon({
      iconUrl: 'assets/images/map/marker-two.png',
      iconSize: [34, 42],
      iconAnchor: [10, 42],
    });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
    }).addTo(mapTwo);

    mapTwo.zoomControl.setPosition('bottomright');

    // добавляем точку на карту по координатам
    var addMarker = function (coordinates) {
      L.marker(coordinates, {
        icon: myMarker,
      }).addTo(mapTwo);
    }

    var source = [
      [59.934, 30.315],
      [59.9345, 30.3156],
      [59.924, 30.335],
      [59.924, 30.305],
      [59.924, 30.335],
      [59.914, 30.335],
      [59.934, 30.325],
      [59.900, 30.315],
      [59.934, 30.300],
      [59.913, 30.330],
      [59.927, 30.338],
      [59.948, 30.34],
      [59.988, 30.324],
      [59.9, 30.34476],
      [59.939, 30.76],
      [59.941, 30.9],
      [59.966, 30.8],
      [59.977, 30.73735]
    ];

    for (var i = 0; i < source.length; i++) {
      addMarker(source[i]);
    }
  }

  maps();
  mapsTwo();
});
