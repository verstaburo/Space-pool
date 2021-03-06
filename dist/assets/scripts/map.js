// http://leafletjs.com
// https: //github.com/Leaflet/Leaflet.markercluster
// библиотека подключена в app.min.js

$(document).ready(function () {
  // function initGMap() {
  //   // The location of Uluru
  //   var uluru = {
  //     lat: -25.344,
  //     lng: 131.036
  //   };
  //   // The map, centered at Uluru
  //   var map = new google.maps.Map(
  //     document.getElementById('googleMap'), {
  //       zoom: 4,
  //       center: uluru
  //     });
  //   // The marker, positioned at Uluru
  //   var marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map
  //   });
  // }

  // initGMap();

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
      [51.934, 30.315],
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

  // карта на странице результатов поиска
  function searchMap() {
    if (!$('#searchMap').length) {
      return;
    }

    // базовые  настройки карты
    var map = L.map('searchMap', {
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
    var markerOptions = {
      iconSize: [36, 46],
      iconAnchor: [12, 46],
      popupAnchor: [0, -52],
      className: 'map-icon',
    };

    // настройки попапа маркера
    var popupOptions = {
      maxWidth: 100,
      maxHeight: 100,
      minWidth: 0,
      closeButton: false,
      className: 'map-popup',
    };

    var markers = {};

    // добавляем точку на карту по координатам
    var addMarker = function (coordinates, popuptext, id) {
      // контент для иконки
      var markerOpt = markerOptions;
      markerOpt.html = '<div class="map-icon__wrapper" data-map-marker-id="' + id + '"><img src="assets/images/map/marker-two.png" class="map-icon__icon"><img src="assets/images/map/marker-two-active.png" class="map-icon__icon-active"></div>';
      var icon = L.divIcon(markerOpt);

      // инициализируем маркер
      var marker = L.marker(coordinates, {
        icon: icon,
      });

      // цепляем попап
      var text = popuptext;
      marker.bindPopup('<div class="map-popup__text">' + text + '</div>', popupOptions).openPopup();

      // отправляем на карту
      marker.addTo(map);

      markers[id] = marker;
    }

    // точки
    var source = [{
        coord: [51.534, -0.082139],
        id: 'space1',
        popuptext: '150&pound;/mo',
      },
      {
        coord: [51.5345, -0.092139],
        id: 'space2',
        popuptext: '350&pound;/mo',
      },
      {
        coord: [51.524, -0.111139],
        id: 'space3',
        popuptext: '250&pound;/mo',
      },
      {
        coord: [51.524, -0.099139],
        id: 'space4',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.524, -0.122139],
        id: 'space5',
        popuptext: '550&pound;/mo',
      },
      {
        coord: [51.514, -0.098139],
        id: 'space6',
        popuptext: '650&pound;/mo',
      },
      {
        coord: [51.534, -0.102439],
        id: 'space7',
        popuptext: '750&pound;/mo',
      },
      {
        coord: [51.500, -0.101139],
        id: 'space8',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.534, -0.132109],
        id: 'space9',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.513, -0.102135],
        id: 'spaceTen',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.527, -0.112139],
        id: 'spaceEleven',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.548, -0.072439],
        id: 'spaceTwelve',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.588, -0.97139],
        id: 'id13',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.5, -0.104139],
        id: 'id14',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.539, -0.086139],
        id: 'id15',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.541, -0.112139],
        id: 'id16',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.566, -0.102189],
        id: 'id17',
        popuptext: '450&pound;/mo',
      },
      {
        coord: [51.577, -0.102339],
        id: 'id18',
        popuptext: '450&pound;/mo',
      }
    ];

    for (var i = 0; i < source.length; i++) {
      var m = source[i];
      addMarker(m.coord, m.popuptext, m.id);
    }

    window.mapMarkers = markers;

    // снимаем активное состояние маркера при клике по карте
    map.on('click', function () {
      var allIcons = $('.map-icon');
      $(allIcons).removeClass('is-active');
    });

    // добовляем активное состояние маркеру по клику + активируем соответствующий слайд на разрешениях ниже 1024
    $(document).on('click', '.map-icon', function (evt) {
      var self = evt.currentTarget;
      var allIcons = $('.map-icon');
      if ($(self).is('.is-active')) {
        $(self).removeClass('is-active');
      } else {
        $(allIcons).removeClass('is-active');
        $(self).addClass('is-active');

        // смена слайдов при клике на маркер
        if (window.Modernizr.mq('(max-width:' + (window.globalOptions.sizes.md - 1) + 'px)')) {
          var markId = $(self).find('[data-map-marker-id]').attr('data-map-marker-id');
          var sw = $('.js-slider-map').find('.js-slider-container')[0].swiper;
          var targetSlide = $('.js-slider-map .swiper-slide[data-map-marker="' + markId + '"]').first().attr('data-swiper-slide-index');
          // блокируем событие changeBySlide
          window.manualChange = true;
          // не ломаем слайдер если маркеру не соответствует ни один слайд
          var index = (targetSlide === undefined) ? 0 : parseInt(targetSlide, 10);
          // переходим на нужный слайд
          sw.slideToLoop(index);
        }
      }
    });

    // засветка маркера при смене слайдов
    $(document).on('changeBySlide', '.map-icon', function (evt) {
      var self = evt.currentTarget;
      var allIcons = $('.map-icon');
      $(allIcons).removeClass('is-active');
      $(self).addClass('is-active');
      var markId = $(self).find('[data-map-marker-id]').attr('data-map-marker-id');
      window.mapMarkers[markId].openPopup();
    });

    // перерисовываем карту
    $(document).on('isOpenMap', '#searchMap', function () {
      map.invalidateSize(true);
    });
  }

  // инициализация карт
  maps();
  mapsTwo();
  markerMap();
  searchMap();
});
