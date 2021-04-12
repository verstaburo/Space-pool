class Popup extends google.maps.OverlayView {
  constructor(options) {
    super();
    this.defaultOptions = {
      distance: 15,
      iconClose: '',
      iconOpen: '',
    };
    // координаты
    this.position = options.position;
    // Dom элемент
    this.containerDiv = options.content;
    // маркер карты
    this.marker = options.marker;
    // как выглядит маркер при открытие попапа
    this.iconClose = options.iconClose || this.defaultOptions.iconClose;
    // как выглядит маркер при закрытии попапа
    this.iconOpen = options.iconOpen || this.defaultOptions.iconOpen;
    // расстояние от попапа до маркера
    this.distance = options.distance || this.defaultOptions.distance;
    Popup.preventMapHitsAndGesturesFrom(this.containerDiv);

    const _t = this;
  }

  open(map) {
    this.setMap(map);
    this.containerDiv.classList.add('is-show');
    const _t = this;
    const _marker = this.marker;

    if (this.iconOpen) {
      _marker.userState = 'open';
      _marker.setIcon(this.iconOpen);
    }
    map.addListener('click', () => {
      _t.close();
    });
  }

  close() {
    this.containerDiv.classList.remove('is-show');
    const _marker = this.marker;
    if (this.iconClose) {
      _marker.userState = 'close';
      _marker.setIcon(this.iconClose);
    }
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

    // автопозиционирование
    const dist = this.distance;
    const mapDiv = this.getMap().getDiv();
    const divPosition = this.getProjection().fromLatLngToDivPixel(
      this.position,
    );
    const mapSizes = mapDiv.getBoundingClientRect();
    const containerSizes = this.containerDiv.getBoundingClientRect();
    const distanceForRight = (mapSizes.width / 2) - divPosition.x - 30;
    const distanceForLeft = (mapSizes.width / 2) + (divPosition.x - 30);
    const distanceForTop = ((mapSizes.height / 2) + divPosition.y) - 50 - dist - 47;
    const freeDistanceRightX = distanceForRight - (containerSizes.width / 2);
    const freeDistanceLeftX = distanceForLeft - (containerSizes.width / 2);
    const freeDistanceY = distanceForTop - containerSizes.height;
    let newCenter = [0, 0];

    if (freeDistanceRightX < 0 && freeDistanceY < 0) {
      newCenter = [(0 - freeDistanceRightX), (0 + freeDistanceY)];
    } else if (freeDistanceRightX > 0 && freeDistanceY < 0) {
      newCenter = [0, (0 + freeDistanceY)];

      if (freeDistanceLeftX < 0) {
        newCenter = [(0 + freeDistanceLeftX), (0 + freeDistanceY)];
      }
    } else if (freeDistanceRightX < 0 && freeDistanceY > 0) {
      newCenter = [(0 - freeDistanceRightX), 0];
    } else if (freeDistanceLeftX < 0) {
      newCenter = [(0 + freeDistanceLeftX), 0];
    }

    this.getMap().panBy(newCenter[0], newCenter[1]);
  }

  /** Called when the popup is removed from the map. */
  onRemove() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  }

  /** Called each frame when the popup needs to draw itself. */
  draw() {
    const dist = this.distance;
    const divPosition = this.getProjection().fromLatLngToDivPixel(
      this.position,
    );
    // Hide the popup when it is far out of view.
    const display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
      ? 'block'
      : 'none';
    if (display === 'block') {
      this.containerDiv.style.top = `${divPosition.y - 47 - dist}px`;
      this.containerDiv.style.left = `${divPosition.x}px`;
    }

    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  }
}

// обновление карт в поиске и на странице спейса
$(document).ready(() => {
  const locations = [{
    coords: {
      lat: 51.93,
      lng: 30.325,
    },
    price: '£ 150 - £ 3500',
    offerCount: '4',
  }, {
    coords: {
      lat: 51.934,
      lng: 30.315,
    },
    price: '£ 150 - £ 3500',
    offerCount: '12',
  }, {
    coords: {
      lat: 59.9345,
      lng: 30.3156,
    },
    price: '£ 150 - £ 3500',
    offerCount: '25',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.335,
    },
    price: '£ 150 - £ 3500',
    offerCount: '6',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.305,
    },
    price: '£ 150 - £ 3500',
    offerCount: '10',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.335,
    },
    price: '£ 150 - £ 3500',
    offerCount: '28',
  }, {
    coords: {
      lat: 59.914,
      lng: 30.335,
    },
    price: '£ 150 - £ 3500',
    offerCount: '9',
  }, {
    coords: {
      lat: 59.934,
      lng: 30.325,
    },
    price: '£ 150 - £ 3500',
    offerCount: '18',
  }, {
    coords: {
      lat: 59.900,
      lng: 30.315,
    },
    price: '£ 150 - £ 3500',
    offerCount: '2',
  }, {
    coords: {
      lat: 59.934,
      lng: 30.300,
    },
    price: '£ 150 - £ 3500',
    offerCount: '14',
  }, {
    coords: {
      lat: 59.913,
      lng: 30.330,
    },
    price: '£ 150 - £ 3500',
    offerCount: '11',
  }, {
    coords: {
      lat: 59.927,
      lng: 30.338,
    },
    price: '£ 150 - £ 3500',
    offerCount: '3',
  }, {
    coords: {
      lat: 59.948,
      lng: 30.34,
    },
    price: '£ 150 - £ 3500',
    offerCount: '5',
  }, {
    coords: {
      lat: 59.988,
      lng: 30.324,
    },
    price: '£ 150 - £ 3500',
    offerCount: '15',
  }, {
    coords: {
      lat: 59.9,
      lng: 30.34476,
    },
    price: '£ 150 - £ 3500',
    offerCount: '12',
  }, {
    coords: {
      lat: 59.939,
      lng: 30.76,
    },
    price: '£ 150 - £ 3500',
    offerCount: '1',
  }, {
    coords: {
      lat: 59.941,
      lng: 30.9,
    },
    price: '£ 150 - £ 3500',
    offerCount: '5',
  }, {
    coords: {
      lat: 59.966,
      lng: 30.8,
    },
    price: '£ 150 - £ 1500',
    offerCount: '20',
  }, {
    coords: {
      lat: 59.977,
      lng: 30.73735,
    },
    price: '£ 150 - £ 3500',
    offerCount: '2',
  }];

  const iconMarker = {
    path: 'M32.5 16.3528C32.5 23.2608 28.4673 30.0588 24.36 35.1772C22.3144 37.7265 20.2675 39.838 18.7319 41.3121C17.9644 42.0488 17.3253 42.6256 16.8791 43.0175C16.7324 43.1463 16.6065 43.2551 16.5039 43.3431C16.4005 43.2525 16.2734 43.1401 16.125 43.0069C15.6785 42.6061 15.0392 42.017 14.2714 41.2665C12.7351 39.7649 10.6876 37.6205 8.64125 35.0489C4.53115 29.8838 0.5 23.0865 0.5 16.3528C0.5 7.59059 7.64797 0.5 16.5 0.5C25.352 0.5 32.5 7.59059 32.5 16.3528Z',
    fillColor: '#0085FF',
    fillOpacity: 1,
    strokeColor: '#0969C1',
    scale: 1,
    anchor: new google.maps.Point(16, 44),
    labelOrigin: new google.maps.Point(16, 15),
  };
  const iconMarkerHover = {
    path: 'M32.5 16.3528C32.5 23.2608 28.4673 30.0588 24.36 35.1772C22.3144 37.7265 20.2675 39.838 18.7319 41.3121C17.9644 42.0488 17.3253 42.6256 16.8791 43.0175C16.7324 43.1463 16.6065 43.2551 16.5039 43.3431C16.4005 43.2525 16.2734 43.1401 16.125 43.0069C15.6785 42.6061 15.0392 42.017 14.2714 41.2665C12.7351 39.7649 10.6876 37.6205 8.64125 35.0489C4.53115 29.8838 0.5 23.0865 0.5 16.3528C0.5 7.59059 7.64797 0.5 16.5 0.5C25.352 0.5 32.5 7.59059 32.5 16.3528Z',
    fillColor: 'black',
    fillOpacity: 1,
    strokeColor: 'black',
    scale: 1,
    anchor: new google.maps.Point(16, 44),
    labelOrigin: new google.maps.Point(16, 15),
  };

  const iconMarkerActive = {
    path: 'M32.5 16.3528C32.5 23.2608 28.4673 30.0588 24.36 35.1772C22.3144 37.7265 20.2675 39.838 18.7319 41.3121C17.9644 42.0488 17.3253 42.6256 16.8791 43.0175C16.7324 43.1463 16.6065 43.2551 16.5039 43.3431C16.4005 43.2525 16.2734 43.1401 16.125 43.0069C15.6785 42.6061 15.0392 42.017 14.2714 41.2665C12.7351 39.7649 10.6876 37.6205 8.64125 35.0489C4.53115 29.8838 0.5 23.0865 0.5 16.3528C0.5 7.59059 7.64797 0.5 16.5 0.5C25.352 0.5 32.5 7.59059 32.5 16.3528Z',
    fillColor: 'black',
    fillOpacity: 1,
    strokeColor: 'black',
    scale: 1.18,
    anchor: new google.maps.Point(16, 44),
    labelOrigin: new google.maps.Point(16, 15),
  };

  const centerOfMap = {
    lat: 59.914,
    lng: 30.335,
  };

  const searchUnsortedMap = document.getElementById('search-map-unsort');
  const searchSortedMap = document.getElementById('search-map-bytype');
  const lonelyMap = document.getElementById('space-map');

  // дефолтная карта в резултатах поиска
  // Карта в поиске
  function searchMapSettings(mapEl, locationList, markerType) {
    if (mapEl) {
      const mapWrapper = mapEl;
      const map = new google.maps.Map(
        mapEl, {
          zoom: 13,
          center: centerOfMap,
          disableDefaultUI: true,
          zoomControl: false,
        },
      );

      mapWrapper.map = map;

      const popups = [];
      const markers = locationList.map((location, i) => {
        const mm = new google.maps.Marker({
          position: location.coords,
          map,
          icon: iconMarker,
          label: {
            text: location.offerCount || '',
            className: ' map-marker-label',
            color: '#fff',
            fontFamily: 'ProximaNova, Arial, sans-serif',
            fontSize: '18px',
            fontWeight: '700',
          },
          clicable: true,
          userState: 'default',
          markerType,
          labelText: location.offerCount,
        });
        const mmInfoContent = document.createElement('div');
        mmInfoContent.classList.add('map-marker-tooltip');
        mmInfoContent.append(location.price);
        const popupOptions = {
          position: new google.maps.LatLng(location.coords.lat, location.coords.lng),
          content: mmInfoContent,
          marker: mm,
          distance: 6,
        };
        const mmInfo = new Popup(popupOptions);
        popups.push(mmInfo);
        mm.addListener('mouseover', (evt) => {
          mmInfo.open(map, mm);
          if (mm.userState !== 'active') {
            mm.setIcon(iconMarkerHover);
          }
        });
        mm.addListener('mouseout', (evt) => {
          mmInfo.close();
          if (mm.userState !== 'active') {
            mm.setIcon(iconMarker);
          }
        });
        mm.addListener('click', () => {
          const isMapFull = $('body').hasClass('map-in-fullview');
          // const mMark = evt.target;
          // if (mm.userState === 'close') {
          //   searchMarkerPopups.forEach((el) => {
          //     el.close();
          //   });
          if (mm.userState !== 'active') {
            markers.forEach((el) => {
              const m = el;
              m.setIcon(iconMarker);
              m.setLabel({
                text: m.labelText,
                className: ' map-marker-label',
                color: '#fff',
                fontFamily: 'ProximaNova, Arial, sans-serif',
                fontSize: '18px',
                fontWeight: '700',
              });
              m.userState = 'default';
            });
            mm.setIcon(iconMarkerActive);
            mm.setLabel({
              text: '.',
              className: ' map-marker-label-circle',
              color: '#fff',
              fontSize: '1px',
            });
            mm.userState = 'active';
            if (mm.markerType === 'space') {
              if (isMapFull) {

              } else {

              }
            }

            if (mm.markerType === 'offer') {

            }
          } else {
            mm.setIcon(iconMarker);
            mm.setLabel({
              text: mm.labelText,
              className: ' map-marker-label',
              color: '#fff',
              fontFamily: 'ProximaNova, Arial, sans-serif',
              fontSize: '18px',
              fontWeight: '700',
            });
            mm.userState = 'default';
          }
          //   // mm.userState = 'open';
          //   // mm.setIcon(biggestBlackIconParam);
          //   mmInfo.open(map3);
          // } else {
          //   // mm.userState = 'close';
          //   // mm.setIcon(smallBlueIconParam);
          //   mmInfo.close();
          // }
        });
        return mm;
      });

      new MarkerClusterer(map, markers, {
        styles:
          [MarkerClusterer.withDefaultStyle({
            url: 'assets/images/nd/cluster-icon.svg',
            width: 70,
            height: 70,
            textColor: '#fff',
            textSize: 18,
            fontFamily: 'ProximaNova, sans-serif',
            fontWeight: 700,
          })],
      });
    }
  }

  searchMapSettings(searchSortedMap, locations, 'offer');
  searchMapSettings(searchUnsortedMap, locations, 'space');

  // сортированая карта в результатах поиска

  // карта одного спейса
});

// старые версии карт и карты на других страницах
$(document).ready(() => {
  const locations = [{
    coords: {
      lat: 51.93,
      lng: 30.325,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker0',
  }, {
    coords: {
      lat: 51.934,
      lng: 30.315,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'blue'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker1',
  }, {
    coords: {
      lat: 59.9345,
      lng: 30.3156,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['blue', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker2',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.335,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker3',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.305,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker4',
  }, {
    coords: {
      lat: 59.924,
      lng: 30.335,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker5',
  }, {
    coords: {
      lat: 59.914,
      lng: 30.335,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker6',
  }, {
    coords: {
      lat: 59.934,
      lng: 30.325,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker7',
  }, {
    coords: {
      lat: 59.900,
      lng: 30.315,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker8',
  }, {
    coords: {
      lat: 59.934,
      lng: 30.300,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker9',
  }, {
    coords: {
      lat: 59.913,
      lng: 30.330,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker10',
  }, {
    coords: {
      lat: 59.927,
      lng: 30.338,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker11',
  }, {
    coords: {
      lat: 59.948,
      lng: 30.34,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker12',
  }, {
    coords: {
      lat: 59.988,
      lng: 30.324,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker13',
  }, {
    coords: {
      lat: 59.9,
      lng: 30.34476,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker14',
  }, {
    coords: {
      lat: 59.939,
      lng: 30.76,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker15',
  }, {
    coords: {
      lat: 59.941,
      lng: 30.9,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker16',
  }, {
    coords: {
      lat: 59.966,
      lng: 30.8,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker17',
  }, {
    coords: {
      lat: 59.977,
      lng: 30.73735,
    },
    popup: {
      href: '#',
      title: 'First Base - Cannon Street',
      colorBoxes: ['orange', 'red', 'green'],
      gallery: [
        [{
          srcset: 'assets/images/nd/space2.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space2.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space26.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space26.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
        [{
          srcset: 'assets/images/nd/space27.webp',
          media: '(min-width: 1400px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.webp',
          media: '(max-width: 1399px)',
          type: 'image/webp',
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(min-width: 1400px)',
          type: 'image/jpeg',
          default: true,
        }, {
          srcset: 'assets/images/nd/space27.jpg',
          media: '(max-width: 1399px)',
          type: 'image/jpeg',
        }],
      ],
    },
    selfName: 'marker18',
  }];

  const uluru = {
    lat: 59.914,
    lng: 30.335,
  };

  function initGMap() {
    const tagsMap = document.getElementById('tagsMap');
    const spaceMap = document.getElementById('spaceMap');
    const spaceMap1 = document.getElementById('spaceMap1');
    const spaceMap2 = document.getElementById('spaceMap2');
    const searchMap = document.getElementById('search-map');
    const addSpaceMap = document.getElementById('add-map');

    const smallBlueIconParam = {
      url: "data:image/svg+xml,%3Csvg width='23' height='31' viewBox='0 0 23 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 11.5213C23 21.5047 11.5 31 11.5 31C11.5 31 0 21.2606 0 11.5213C0 5.15039 5.14089 0 11.5 0C17.8591 0 23 5.15039 23 11.5213Z' fill='%230085FF'/%3E%3Cpath d='M22.5 11.5213C22.5 16.3378 19.7155 21.0944 16.8584 24.6936C15.4376 26.4834 14.0156 27.9662 12.9487 29.0015C12.4155 29.5189 11.9718 29.9238 11.6622 30.1986C11.6047 30.2496 11.5518 30.2962 11.5038 30.3382C11.4549 30.2944 11.4008 30.2457 11.3419 30.1922C11.032 29.9111 10.588 29.4975 10.0545 28.9704C8.98702 27.9156 7.56436 26.4094 6.14288 24.6036C3.283 20.9706 0.5 16.2147 0.5 11.5213C0.5 5.42566 5.4179 0.5 11.5 0.5C17.5821 0.5 22.5 5.42566 22.5 11.5213Z' stroke='%231F1F1F' stroke-opacity='0.28'/%3E%3Ccircle cx='11.5' cy='10.5' r='4.5' fill='white'/%3E%3C/svg%3E ",
      size: new google.maps.Size(23, 31),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(12, 31),
      scaledSize: new google.maps.Size(23, 31),
    };

    const bigBlackIconParam = {
      url: "data:image/svg+xml,%3Csvg width='23' height='31' viewBox='0 0 23 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 11.5213C23 21.5047 11.5 31 11.5 31C11.5 31 0 21.2606 0 11.5213C0 5.15039 5.14089 0 11.5 0C17.8591 0 23 5.15039 23 11.5213Z' fill='black'/%3E%3Cpath d='M22.5 11.5213C22.5 16.3378 19.7155 21.0944 16.8584 24.6936C15.4376 26.4834 14.0156 27.9662 12.9487 29.0015C12.4155 29.5189 11.9718 29.9238 11.6622 30.1986C11.6047 30.2496 11.5518 30.2962 11.5038 30.3382C11.4549 30.2944 11.4008 30.2457 11.3419 30.1922C11.032 29.9111 10.588 29.4975 10.0545 28.9704C8.98702 27.9156 7.56436 26.4094 6.14288 24.6036C3.283 20.9706 0.5 16.2147 0.5 11.5213C0.5 5.42566 5.4179 0.5 11.5 0.5C17.5821 0.5 22.5 5.42566 22.5 11.5213Z' stroke='black' stroke-opacity='0.28'/%3E%3Ccircle cx='11.5' cy='10.5' r='4.5' fill='white'/%3E%3C/svg%3E ",
      size: new google.maps.Size(35, 47),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(17.5, 47),
      scaledSize: new google.maps.Size(35, 47),
    };

    const biggestBlackIconParam = {
      url: "data:image/svg+xml,%3Csvg width='23' height='31' viewBox='0 0 23 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 11.5213C23 21.5047 11.5 31 11.5 31C11.5 31 0 21.2606 0 11.5213C0 5.15039 5.14089 0 11.5 0C17.8591 0 23 5.15039 23 11.5213Z' fill='black'/%3E%3Cpath d='M22.5 11.5213C22.5 16.3378 19.7155 21.0944 16.8584 24.6936C15.4376 26.4834 14.0156 27.9662 12.9487 29.0015C12.4155 29.5189 11.9718 29.9238 11.6622 30.1986C11.6047 30.2496 11.5518 30.2962 11.5038 30.3382C11.4549 30.2944 11.4008 30.2457 11.3419 30.1922C11.032 29.9111 10.588 29.4975 10.0545 28.9704C8.98702 27.9156 7.56436 26.4094 6.14288 24.6036C3.283 20.9706 0.5 16.2147 0.5 11.5213C0.5 5.42566 5.4179 0.5 11.5 0.5C17.5821 0.5 22.5 5.42566 22.5 11.5213Z' stroke='black' stroke-opacity='0.28'/%3E%3Ccircle cx='11.5' cy='10.5' r='4.5' fill='white'/%3E%3C/svg%3E ",
      size: new google.maps.Size(47, 64),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(23.5, 64),
      scaledSize: new google.maps.Size(47, 64),
    };

    // Карта на главной
    if (tagsMap) {
      const map = new google.maps.Map(
        tagsMap, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
          zoomControl: true,
        },
      );

      const popups = [];
      const markers = locations.map((location, i) => {
        const mm = new google.maps.Marker({
          position: location.coords,
          map,
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
        const mmInfoContent = window.globalFunctions.generateMapPopup(location.popup);
        const popupOptions = {
          position: new google.maps.LatLng(location.coords.lat, location.coords.lng),
          content: mmInfoContent,
          marker: mm,
          distance: 15,
          iconOpen: bigBlackIconParam,
          iconClose: smallBlueIconParam,
        };
        const mmInfo = new Popup(popupOptions);
        popups.push(mmInfo);
        mm.addListener('click', (evt) => {
          const mMark = evt.target;
          if (mm.userState === 'close') {
            popups.forEach((el) => {
              el.close();
            });
            markers.forEach((el) => {
              el.setIcon(smallBlueIconParam);
            });
            // mm.userState = 'open';
            // mm.setIcon(bigBlackIconParam);
            mmInfo.open(map);
          } else {
            // mm.userState = 'close';
            // mm.setIcon(smallBlueIconParam);
            mmInfo.close();
          }
        });
        return mm;
      });
    }

    // Карта в спейсе

    if (spaceMap) {
      const map2 = new google.maps.Map(
        spaceMap, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
        },
      );

      const marker = new google.maps.Marker({
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
      const mapSp1 = new google.maps.Map(
        spaceMap1, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
        },
      );

      const markerSp1 = new google.maps.Marker({
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
      const mapSp2 = new google.maps.Map(
        spaceMap2, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
        },
      );

      const markerSp2 = new google.maps.Marker({
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
      const map3 = new google.maps.Map(
        searchMap, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
          zoomControl: true,
        },
      );

      const searchMarkerPopups = [];
      const markers3 = locations.map((location, i) => {
        const mm = new google.maps.Marker({
          position: location.coords,
          map: map3,
          selfName: location.selfName,
          icon: smallBlueIconParam,
          userState: 'close',
        });
        const mmInfoContent = window.globalFunctions.generateMapPopup(location.popup);
        const popupOptions = {
          position: new google.maps.LatLng(location.coords.lat, location.coords.lng),
          content: mmInfoContent,
          marker: mm,
          distance: 15,
          iconOpen: bigBlackIconParam,
          iconClose: smallBlueIconParam,
        };
        const mmInfo = new Popup(popupOptions);
        searchMarkerPopups.push(mmInfo);
        mm.addListener('click', (evt) => {
          const mMark = evt.target;
          if (mm.userState === 'close') {
            searchMarkerPopups.forEach((el) => {
              el.close();
            });
            markers3.forEach((el) => {
              el.setIcon(smallBlueIconParam);
            });
            // mm.userState = 'open';
            // mm.setIcon(biggestBlackIconParam);
            mmInfo.open(map3);
          } else {
            // mm.userState = 'close';
            // mm.setIcon(smallBlueIconParam);
            mmInfo.close();
          }
        });
        return mm;
      });

      $(document).on('mouseenter', '.js-map-marker-link', (evt) => {
        const self = evt.currentTarget;
        const markerName = $(self).data('marker-name');
        const mark = $(markers3).filter((i, el) => el.selfName === markerName);
        mark[0].setIcon(biggestBlackIconParam);
      });

      $(document).on('mouseleave', '.js-map-marker-link', (evt) => {
        const self = evt.currentTarget;
        const markerName = $(self).data('marker-name');
        const mark = $(markers3).filter((i, el) => el.selfName === markerName);
        if (mark[0].userState === 'close') {
          mark[0].setIcon(smallBlueIconParam);
        } else if (mark[0].userState === 'open') {
          mark[0].setIcon(bigBlackIconParam);
        }
      });
    }

    // Карта в add/edit space manager - location

    if (addSpaceMap) {
      const mapASM = new google.maps.Map(
        addSpaceMap, {
          zoom: 13,
          center: uluru,
          disableDefaultUI: true,
        },
      );

      mapASM.addListener('center_changed', function () {
        const _this = this;
        const newCoord = _this.getCenter();
        const latitude = newCoord.lat();
        const longitude = newCoord.lng();
        const inputForCoord = document.querySelector('input[data-map-coordinates]');
        if (inputForCoord) {
          inputForCoord.value = `${latitude},${longitude}`;
        }
      });
    }
  }

  initGMap();
});
