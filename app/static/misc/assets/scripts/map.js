// http://leafletjs.com
// https: //github.com/Leaflet/Leaflet.markercluster
// библиотека подключена в app.min.js

$(document).ready(function () {
  // карта в спейсе
  function maps() {
    if (!$('#map').length) {
      return;
    }

    // базовые  настройки карты
    var map = L.map('map', {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView([51.513443, -0.102139], 13);

    // настройка доступа к mapbox картам
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
    }).addTo(map);

    // настройка иконки маркера
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

    // базовые  настройки карты
    var mapTwo = L.map('mapTwo', {
      scrollWheelZoom: false,
    }).setView([59.934, 30.335], 13);

    // настройка доступа к mapbox картам
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
    }).addTo(mapTwo);

    // настройка позиции кнопок зума
    mapTwo.zoomControl.setPosition('bottomright');

    // настройка иконки маркера
    var myMarker = L.icon({
      iconUrl: 'assets/images/map/marker-two.png',
      iconSize: [34, 42],
      iconAnchor: [10, 42],
    });

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

  // карта установки маркера нового спейса
  function markerMap() {
    if (!$('#marker-map').length) {
      return;
    }

    // базовые  настройки карты
    var map = L.map('marker-map', {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView([51.513443, -0.102139], 13);

    map.zoomControl.setPosition('bottomright');

    // настройка доступа к mapbox картам
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
    }).addTo(map);

    // получаем центр карты когда пользователь перестал ее таскать
    map.on('moveend', function (event) {
      var self = event.target;
      var newCoordinates = self.getCenter();
      var latitudeInput = $('[data-latitude]')[0];
      var longitudeInput = $('[data-longitude]')[0];
      if (latitudeInput && longitudeInput) {
        $(latitudeInput).val(newCoordinates.lat);
        $(longitudeInput).val(newCoordinates.lng);
      }
    });
  }

  // инициализация карт
  maps();
  mapsTwo();
  markerMap();
});
