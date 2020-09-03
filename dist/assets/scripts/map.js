$(document).ready(function () {
  var locations = [{
    coords: {
      lat: 51.93,
      lng: 30.325,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker0',
  }, {
    coords: {
      lat: 51.934,
      lng: 30.315,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'blue'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker1',
  }, {
    coords: {
      lat: 59.9345,
      lng: 30.3156,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['blue', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker2',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.335,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker3',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.305,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker4',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.335,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker5',
  }, {
    coords: {
      lat: 59.914,
      lng: 30.335,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker6',
  }, {
    coords: {
      lat: 59.934,
      lng: 30.325,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker7',
  }, {
    coords: {
      lat: 59.900,
      lng: 30.315,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker8',
  }, {
    coords: {
      lat: 59.934,
      lng: 30.300,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker9',
  }, {
    coords: {
      lat: 59.913,
      lng: 30.330,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker10',
  }, {
    coords: {
      lat: 59.927,
      lng: 30.338,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker11',
  }, {
    coords: {
      lat: 59.948,
      lng: 30.34,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker12',
  }, {
    coords: {
      lat: 59.988,
      lng: 30.324,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker13',
  }, {
    coords: {
      lat: 59.9,
      lng: 30.34476,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker14',
  }, {
    coords: {
      lat: 59.939,
      lng: 30.76,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker15',
  }, {
    coords: {
      lat: 59.941,
      lng: 30.9,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker16',
  }, {
    coords: {
      lat: 59.966,
      lng: 30.8,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker17',
  }, {
    coords: {
      lat: 59.977,
      lng: 30.73735,
    },
    popup: {
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: ['assets/images/nd/space2.jpg', 'assets/images/nd/space3.jpg',
        'assets/images/nd/space4.jpg',
      ],
    },
    selfName: 'marker18',
  }];

  var uluru = {
    lat: 59.914,
    lng: 30.335,
  };

  function initGMap() {
    var tagsMap = document.getElementById('tagsMap');
    var spaceMap = document.getElementById('spaceMap');
    var spaceMap1 = document.getElementById('spaceMap1');
    var spaceMap2 = document.getElementById('spaceMap2');
    var searchMap = document.getElementById('search-map');

    class Popup extends google.maps.OverlayView {
      constructor(position, content) {
        super();
        this.position = position;
        this.containerDiv = content;
        // Optionally stop clicks, etc., from bubbling up to the map.
        Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
      }
      open(map) {
        this.setMap(map);
        this.containerDiv.classList.add('is-show');
      }
      close() {
        this.containerDiv.classList.remove('is-show');
        this.setMap(null);
      }
      toggle() {
        if (this.containerDiv.classList.contains('is-show')) {
          this.close();
        } else {
          this.open();
        }
      }
      /** Called when the popup is added to the map. */
      onAdd() {
        this.getPanes().floatPane.appendChild(this.containerDiv);
      }
      /** Called when the popup is removed from the map. */
      onRemove() {
        if (this.containerDiv.parentElement) {
          this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
      }
      /** Called each frame when the popup needs to draw itself. */
      draw() {
        const divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position,
        );
        // Hide the popup when it is far out of view.
        const display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
          'block' :
          'none';
        if (display === 'block') {
          this.containerDiv.style.left = divPosition.x + 'px';
          this.containerDiv.style.top = (divPosition.y + 15) + 'px';
        }

        if (this.containerDiv.style.display !== display) {
          this.containerDiv.style.display = display;
        }
      }
    }

    var smallBlueIconParam = {
      url: "data:image/svg+xml,%3Csvg width='23' height='31' viewBox='0 0 23 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 11.5213C23 21.5047 11.5 31 11.5 31C11.5 31 0 21.2606 0 11.5213C0 5.15039 5.14089 0 11.5 0C17.8591 0 23 5.15039 23 11.5213Z' fill='%230085FF'/%3E%3Cpath d='M22.5 11.5213C22.5 16.3378 19.7155 21.0944 16.8584 24.6936C15.4376 26.4834 14.0156 27.9662 12.9487 29.0015C12.4155 29.5189 11.9718 29.9238 11.6622 30.1986C11.6047 30.2496 11.5518 30.2962 11.5038 30.3382C11.4549 30.2944 11.4008 30.2457 11.3419 30.1922C11.032 29.9111 10.588 29.4975 10.0545 28.9704C8.98702 27.9156 7.56436 26.4094 6.14288 24.6036C3.283 20.9706 0.5 16.2147 0.5 11.5213C0.5 5.42566 5.4179 0.5 11.5 0.5C17.5821 0.5 22.5 5.42566 22.5 11.5213Z' stroke='%231F1F1F' stroke-opacity='0.28'/%3E%3Ccircle cx='11.5' cy='10.5' r='4.5' fill='white'/%3E%3C/svg%3E ",
      size: new google.maps.Size(23, 31),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(12, 31),
      scaledSize: new google.maps.Size(23, 31),
    };

    var bigBlackIconParam = {
      url: "data:image/svg+xml,%3Csvg width='23' height='31' viewBox='0 0 23 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 11.5213C23 21.5047 11.5 31 11.5 31C11.5 31 0 21.2606 0 11.5213C0 5.15039 5.14089 0 11.5 0C17.8591 0 23 5.15039 23 11.5213Z' fill='black'/%3E%3Cpath d='M22.5 11.5213C22.5 16.3378 19.7155 21.0944 16.8584 24.6936C15.4376 26.4834 14.0156 27.9662 12.9487 29.0015C12.4155 29.5189 11.9718 29.9238 11.6622 30.1986C11.6047 30.2496 11.5518 30.2962 11.5038 30.3382C11.4549 30.2944 11.4008 30.2457 11.3419 30.1922C11.032 29.9111 10.588 29.4975 10.0545 28.9704C8.98702 27.9156 7.56436 26.4094 6.14288 24.6036C3.283 20.9706 0.5 16.2147 0.5 11.5213C0.5 5.42566 5.4179 0.5 11.5 0.5C17.5821 0.5 22.5 5.42566 22.5 11.5213Z' stroke='black' stroke-opacity='0.28'/%3E%3Ccircle cx='11.5' cy='10.5' r='4.5' fill='white'/%3E%3C/svg%3E ",
      size: new google.maps.Size(35, 47),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(17.5, 47),
      scaledSize: new google.maps.Size(35, 47),
    };

    // Карта на главной
    if (tagsMap) {
      var map = new google.maps.Map(
        tagsMap, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
          zoomControl: true,
        });

      var popups = [];
      var markers = locations.map(function (location, i) {
        var mm = new google.maps.Marker({
          position: location.coords,
          map: map,
          icon: {
            url: 'assets/images/nd/nd-map-marker.svg',
            size: new google.maps.Size(23, 31),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(12, 31),
            scaledSize: new google.maps.Size(23, 31),
          },
          userState: 'close',
        });
        var mmInfoContent = window.globalFunctions.generateMapPopup(location.popup);
        var mmInfo = new Popup(new google.maps.LatLng(location.coords.lat, location.coords.lng), mmInfoContent);
        popups.push(mmInfo);
        mm.addListener('click', function (evt) {
          const mMark = evt.ub.target;
          if (mm.userState === 'close') {
            popups.forEach(function (el) {
              el.close();
            });
            markers.forEach(function (el) {
              el.setIcon(smallBlueIconParam);
            });
            mm.userState = 'open';
            mm.setIcon(bigBlackIconParam);
            mmInfo.open(map);
          } else {
            mm.userState = 'close';
            mm.setIcon(smallBlueIconParam);
            mmInfo.close();
          }
        });
        return mm;
      });
    }

    // Карта в спейсе

    if (spaceMap) {
      var map2 = new google.maps.Map(
        spaceMap, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
        });

      var marker = new google.maps.Marker({
        position: uluru,
        map: map2,
        icon: {
          url: 'assets/images/nd/nd-map-marker.svg',
          size: new google.maps.Size(40, 54),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 54),
          scaledSize: new google.maps.Size(40, 54),
        },
      });
    }

    if (spaceMap1) {
      var mapSp1 = new google.maps.Map(
        spaceMap1, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
        });

      var markerSp1 = new google.maps.Marker({
        position: uluru,
        map: mapSp1,
        icon: {
          url: 'assets/images/nd/nd-map-marker.svg',
          size: new google.maps.Size(40, 54),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 54),
          scaledSize: new google.maps.Size(40, 54),
        },
      });
    }

    if (spaceMap2) {
      var mapSp2 = new google.maps.Map(
        spaceMap2, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
        });

      var markerSp2 = new google.maps.Marker({
        position: uluru,
        map: mapSp2,
        icon: {
          url: 'assets/images/nd/nd-map-marker.svg',
          size: new google.maps.Size(40, 54),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 54),
          scaledSize: new google.maps.Size(40, 54),
        },
      });
    }

    // Карта в поиске
    if (searchMap) {
      var map3 = new google.maps.Map(
        searchMap, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
        });

      var markerSymbol = {
        path: 'M46.5 23.7858C46.5 33.9179 40.7138 43.859 34.8568 51.3131C31.9359 55.0306 29.0138 58.109 26.8218 60.2579C25.7261 61.3321 24.8136 62.1733 24.1759 62.7452C23.8966 62.9957 23.67 63.1945 23.5039 63.3386C23.3374 63.1908 23.1095 62.9862 22.8281 62.7282C22.1901 62.1433 21.2774 61.2843 20.1814 60.1902C17.9888 58.0015 15.066 54.8755 12.1444 51.1258C6.28472 43.6053 0.5 33.6648 0.5 23.7858C0.5 10.9035 10.7871 0.5 23.5 0.5C36.2129 0.5 46.5 10.9035 46.5 23.7858Z',
        fillColor: '#0085ff',
        strokeColor: 'rgba(31, 31, 31)',
        strokeOpacity: 0.28,
        scale: 2.9,
      };

      var markers3 = locations.map(function (location, i) {
        return new google.maps.Marker({
          position: location.coords,
          map: map3,
          selfName: location.selfName,
          icon: {
            url: "data:image/svg+xml,%3Csvg width='23' height='31' viewBox='0 0 23 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 11.5213C23 21.5047 11.5 31 11.5 31C11.5 31 0 21.2606 0 11.5213C0 5.15039 5.14089 0 11.5 0C17.8591 0 23 5.15039 23 11.5213Z' fill='%230085FF'/%3E%3Cpath d='M22.5 11.5213C22.5 16.3378 19.7155 21.0944 16.8584 24.6936C15.4376 26.4834 14.0156 27.9662 12.9487 29.0015C12.4155 29.5189 11.9718 29.9238 11.6622 30.1986C11.6047 30.2496 11.5518 30.2962 11.5038 30.3382C11.4549 30.2944 11.4008 30.2457 11.3419 30.1922C11.032 29.9111 10.588 29.4975 10.0545 28.9704C8.98702 27.9156 7.56436 26.4094 6.14288 24.6036C3.283 20.9706 0.5 16.2147 0.5 11.5213C0.5 5.42566 5.4179 0.5 11.5 0.5C17.5821 0.5 22.5 5.42566 22.5 11.5213Z' stroke='%231F1F1F' stroke-opacity='0.28'/%3E%3Ccircle cx='11.5' cy='10.5' r='4.5' fill='white'/%3E%3C/svg%3E ",
            size: new google.maps.Size(23, 31),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(12, 31),
            scaledSize: new google.maps.Size(23, 31),
          },
        });
      });

      $(document).on('mouseenter', '.js-map-marker-link', function (evt) {
        var self = evt.currentTarget;
        var markerName = $(self).data('marker-name');
        var mark = $(markers3).filter(function (i, el) {
          return el.selfName === markerName;
        });
        mark[0].setIcon({
          url: "data:image/svg+xml,%3Csvg width='23' height='31' viewBox='0 0 23 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 11.5213C23 21.5047 11.5 31 11.5 31C11.5 31 0 21.2606 0 11.5213C0 5.15039 5.14089 0 11.5 0C17.8591 0 23 5.15039 23 11.5213Z' fill='black'/%3E%3Cpath d='M22.5 11.5213C22.5 16.3378 19.7155 21.0944 16.8584 24.6936C15.4376 26.4834 14.0156 27.9662 12.9487 29.0015C12.4155 29.5189 11.9718 29.9238 11.6622 30.1986C11.6047 30.2496 11.5518 30.2962 11.5038 30.3382C11.4549 30.2944 11.4008 30.2457 11.3419 30.1922C11.032 29.9111 10.588 29.4975 10.0545 28.9704C8.98702 27.9156 7.56436 26.4094 6.14288 24.6036C3.283 20.9706 0.5 16.2147 0.5 11.5213C0.5 5.42566 5.4179 0.5 11.5 0.5C17.5821 0.5 22.5 5.42566 22.5 11.5213Z' stroke='black' stroke-opacity='0.28'/%3E%3Ccircle cx='11.5' cy='10.5' r='4.5' fill='white'/%3E%3C/svg%3E ",
          size: new google.maps.Size(47, 64),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(23.5, 64),
          scaledSize: new google.maps.Size(47, 64),
        });
      });

      $(document).on('mouseleave', '.js-map-marker-link', function (evt) {
        var self = evt.currentTarget;
        var markerName = $(self).data('marker-name');
        var mark = $(markers3).filter(function (i, el) {
          return el.selfName === markerName;
        });
        mark[0].setIcon({
          url: "data:image/svg+xml,%3Csvg width='23' height='31' viewBox='0 0 23 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 11.5213C23 21.5047 11.5 31 11.5 31C11.5 31 0 21.2606 0 11.5213C0 5.15039 5.14089 0 11.5 0C17.8591 0 23 5.15039 23 11.5213Z' fill='%230085FF'/%3E%3Cpath d='M22.5 11.5213C22.5 16.3378 19.7155 21.0944 16.8584 24.6936C15.4376 26.4834 14.0156 27.9662 12.9487 29.0015C12.4155 29.5189 11.9718 29.9238 11.6622 30.1986C11.6047 30.2496 11.5518 30.2962 11.5038 30.3382C11.4549 30.2944 11.4008 30.2457 11.3419 30.1922C11.032 29.9111 10.588 29.4975 10.0545 28.9704C8.98702 27.9156 7.56436 26.4094 6.14288 24.6036C3.283 20.9706 0.5 16.2147 0.5 11.5213C0.5 5.42566 5.4179 0.5 11.5 0.5C17.5821 0.5 22.5 5.42566 22.5 11.5213Z' stroke='%231F1F1F' stroke-opacity='0.28'/%3E%3Ccircle cx='11.5' cy='10.5' r='4.5' fill='white'/%3E%3C/svg%3E ",
          size: new google.maps.Size(23, 31),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(12, 31),
          scaledSize: new google.maps.Size(23, 31),
        });
      });
    }
  }

  initGMap();

  // устаревший код
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
