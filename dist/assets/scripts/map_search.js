/* eslint-disable max-len */
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

window.mapData = {
  markerIconArray: [
    {
      default: {
        path: 'M32.5 16.3528C32.5 23.2608 28.4673 30.0588 24.36 35.1772C22.3144 37.7265 20.2675 39.838 18.7319 41.3121C17.9644 42.0488 17.3253 42.6256 16.8791 43.0175C16.7324 43.1463 16.6065 43.2551 16.5039 43.3431C16.4005 43.2525 16.2734 43.1401 16.125 43.0069C15.6785 42.6061 15.0392 42.017 14.2714 41.2665C12.7351 39.7649 10.6876 37.6205 8.64125 35.0489C4.53115 29.8838 0.5 23.0865 0.5 16.3528C0.5 7.59059 7.64797 0.5 16.5 0.5C25.352 0.5 32.5 7.59059 32.5 16.3528Z',
        fillColor: '#0085FF',
        fillOpacity: 1,
        strokeColor: '#0969C1',
        scale: 1,
        anchor: new google.maps.Point(16, 44),
        labelOrigin: new google.maps.Point(16, 15),
      },
      hover: {
        path: 'M32.5 16.3528C32.5 23.2608 28.4673 30.0588 24.36 35.1772C22.3144 37.7265 20.2675 39.838 18.7319 41.3121C17.9644 42.0488 17.3253 42.6256 16.8791 43.0175C16.7324 43.1463 16.6065 43.2551 16.5039 43.3431C16.4005 43.2525 16.2734 43.1401 16.125 43.0069C15.6785 42.6061 15.0392 42.017 14.2714 41.2665C12.7351 39.7649 10.6876 37.6205 8.64125 35.0489C4.53115 29.8838 0.5 23.0865 0.5 16.3528C0.5 7.59059 7.64797 0.5 16.5 0.5C25.352 0.5 32.5 7.59059 32.5 16.3528Z',
        fillColor: 'black',
        fillOpacity: 1,
        strokeColor: 'black',
        scale: 1,
        anchor: new google.maps.Point(16, 44),
        labelOrigin: new google.maps.Point(16, 15),
      },
      active: {
        path: 'M32.5 16.3528C32.5 23.2608 28.4673 30.0588 24.36 35.1772C22.3144 37.7265 20.2675 39.838 18.7319 41.3121C17.9644 42.0488 17.3253 42.6256 16.8791 43.0175C16.7324 43.1463 16.6065 43.2551 16.5039 43.3431C16.4005 43.2525 16.2734 43.1401 16.125 43.0069C15.6785 42.6061 15.0392 42.017 14.2714 41.2665C12.7351 39.7649 10.6876 37.6205 8.64125 35.0489C4.53115 29.8838 0.5 23.0865 0.5 16.3528C0.5 7.59059 7.64797 0.5 16.5 0.5C25.352 0.5 32.5 7.59059 32.5 16.3528Z',
        fillColor: 'black',
        fillOpacity: 1,
        strokeColor: 'black',
        scale: 1,
        anchor: new google.maps.Point(16, 44),
        labelOrigin: new google.maps.Point(16, 15),
      },
      visited: {
        path: 'M32.5 16.3528C32.5 23.2608 28.4673 30.0588 24.36 35.1772C22.3144 37.7265 20.2675 39.838 18.7319 41.3121C17.9644 42.0488 17.3253 42.6256 16.8791 43.0175C16.7324 43.1463 16.6065 43.2551 16.5039 43.3431C16.4005 43.2525 16.2734 43.1401 16.125 43.0069C15.6785 42.6061 15.0392 42.017 14.2714 41.2665C12.7351 39.7649 10.6876 37.6205 8.64125 35.0489C4.53115 29.8838 0.5 23.0865 0.5 16.3528C0.5 7.59059 7.64797 0.5 16.5 0.5C25.352 0.5 32.5 7.59059 32.5 16.3528Z',
        fillColor: '#0F5493',
        fillOpacity: 1,
        strokeColor: '#144673',
        scale: 1,
        anchor: new google.maps.Point(16, 44),
        labelOrigin: new google.maps.Point(16, 15),
      },
      labelClass: 'map-marker-label',
    },
    {
      default: {
        path: 'M39.5 20.0693C39.5 28.5897 34.5902 36.9593 29.6081 43.2455C27.1248 46.3789 24.6403 48.9738 22.7765 50.7853C21.8449 51.6908 21.0691 52.3998 20.5271 52.8817C20.3155 53.0698 20.1395 53.2234 20.0039 53.3404C19.8677 53.2201 19.6905 53.062 19.4769 52.8679C18.9347 52.375 18.1586 51.6509 17.2267 50.7287C15.3623 48.8836 12.8771 46.2483 10.3931 43.0877C5.40827 36.745 0.5 28.376 0.5 20.0693C0.5 9.24616 9.21845 0.5 20 0.5C30.7816 0.5 39.5 9.24616 39.5 20.0693Z',
        fillColor: '#0085FF',
        fillOpacity: 1,
        strokeColor: '#0969C1',
        scale: 0.65,
        anchor: new google.maps.Point(20, 44),
        labelOrigin: new google.maps.Point(20, 23),
      },
      hover: {
        path: 'M39.5 20.0693C39.5 28.5897 34.5902 36.9593 29.6081 43.2455C27.1248 46.3789 24.6403 48.9738 22.7765 50.7853C21.8449 51.6908 21.0691 52.3998 20.5271 52.8817C20.3155 53.0698 20.1395 53.2234 20.0039 53.3404C19.8677 53.2201 19.6905 53.062 19.4769 52.8679C18.9347 52.375 18.1586 51.6509 17.2267 50.7287C15.3623 48.8836 12.8771 46.2483 10.3931 43.0877C5.40827 36.745 0.5 28.376 0.5 20.0693C0.5 9.24616 9.21845 0.5 20 0.5C30.7816 0.5 39.5 9.24616 39.5 20.0693Z',
        fillColor: '#0085FF',
        fillOpacity: 1,
        strokeColor: '#0969C1',
        scale: 0.65,
        anchor: new google.maps.Point(20, 44),
        labelOrigin: new google.maps.Point(20, 23),
      },
      active: {
        path: 'M39.5 20.0693C39.5 28.5897 34.5902 36.9593 29.6081 43.2455C27.1248 46.3789 24.6403 48.9738 22.7765 50.7853C21.8449 51.6908 21.0691 52.3998 20.5271 52.8817C20.3155 53.0698 20.1395 53.2234 20.0039 53.3404C19.8677 53.2201 19.6905 53.062 19.4769 52.8679C18.9347 52.375 18.1586 51.6509 17.2267 50.7287C15.3623 48.8836 12.8771 46.2483 10.3931 43.0877C5.40827 36.745 0.5 28.376 0.5 20.0693C0.5 9.24616 9.21845 0.5 20 0.5C30.7816 0.5 39.5 9.24616 39.5 20.0693Z',
        fillColor: '#0085FF',
        fillOpacity: 1,
        strokeColor: '#0969C1',
        scale: 0.65,
        anchor: new google.maps.Point(20, 44),
        labelOrigin: new google.maps.Point(20, 23),
      },
      visited: {
        path: 'M39.5 20.0693C39.5 28.5897 34.5902 36.9593 29.6081 43.2455C27.1248 46.3789 24.6403 48.9738 22.7765 50.7853C21.8449 51.6908 21.0691 52.3998 20.5271 52.8817C20.3155 53.0698 20.1395 53.2234 20.0039 53.3404C19.8677 53.2201 19.6905 53.062 19.4769 52.8679C18.9347 52.375 18.1586 51.6509 17.2267 50.7287C15.3623 48.8836 12.8771 46.2483 10.3931 43.0877C5.40827 36.745 0.5 28.376 0.5 20.0693C0.5 9.24616 9.21845 0.5 20 0.5C30.7816 0.5 39.5 9.24616 39.5 20.0693Z',
        fillColor: '#0085FF',
        fillOpacity: 1,
        strokeColor: '#0969C1',
        scale: 0.65,
        anchor: new google.maps.Point(20, 44),
        labelOrigin: new google.maps.Point(20, 23),
      },
      labelClass: 'map-marker-label-circle-big',
    },
    {
      default: {
        path: 'M55.5 28.2457C55.5 40.3094 48.5893 52.1353 41.6073 60.9916C38.124 65.4101 34.6394 69.0687 32.0256 71.6226C30.7189 72.8993 29.6307 73.8992 28.8699 74.5791C28.4992 74.9105 28.2063 75.1658 28.0039 75.3401C27.8013 75.1615 27.5071 74.899 27.1341 74.5583C26.3731 73.863 25.2846 72.8419 23.9776 71.5417C21.3632 68.9406 17.878 65.2254 14.3939 60.7688C7.40916 51.8344 0.5 40.0091 0.5 28.2457C0.5 12.8988 12.7972 0.5 28 0.5C43.2028 0.5 55.5 12.8988 55.5 28.2457Z',
        fillColor: '#323232',
        fillOpacity: 1,
        strokeColor: 'black',
        scale: 1,
        anchor: new google.maps.Point(28, 76),
        labelOrigin: new google.maps.Point(28, 29),
      },
      hover: {
        path: 'M55.5 28.2457C55.5 40.3094 48.5893 52.1353 41.6073 60.9916C38.124 65.4101 34.6394 69.0687 32.0256 71.6226C30.7189 72.8993 29.6307 73.8992 28.8699 74.5791C28.4992 74.9105 28.2063 75.1658 28.0039 75.3401C27.8013 75.1615 27.5071 74.899 27.1341 74.5583C26.3731 73.863 25.2846 72.8419 23.9776 71.5417C21.3632 68.9406 17.878 65.2254 14.3939 60.7688C7.40916 51.8344 0.5 40.0091 0.5 28.2457C0.5 12.8988 12.7972 0.5 28 0.5C43.2028 0.5 55.5 12.8988 55.5 28.2457Z',
        fillColor: '#323232',
        fillOpacity: 1,
        strokeColor: 'black',
        scale: 1,
        anchor: new google.maps.Point(28, 76),
        labelOrigin: new google.maps.Point(28, 29),
      },
      active: {
        path: 'M55.5 28.2457C55.5 40.3094 48.5893 52.1353 41.6073 60.9916C38.124 65.4101 34.6394 69.0687 32.0256 71.6226C30.7189 72.8993 29.6307 73.8992 28.8699 74.5791C28.4992 74.9105 28.2063 75.1658 28.0039 75.3401C27.8013 75.1615 27.5071 74.899 27.1341 74.5583C26.3731 73.863 25.2846 72.8419 23.9776 71.5417C21.3632 68.9406 17.878 65.2254 14.3939 60.7688C7.40916 51.8344 0.5 40.0091 0.5 28.2457C0.5 12.8988 12.7972 0.5 28 0.5C43.2028 0.5 55.5 12.8988 55.5 28.2457Z',
        fillColor: '#323232',
        fillOpacity: 1,
        strokeColor: 'black',
        scale: 1,
        anchor: new google.maps.Point(28, 76),
        labelOrigin: new google.maps.Point(28, 29),
      },
      visited: {
        path: 'M55.5 28.2457C55.5 40.3094 48.5893 52.1353 41.6073 60.9916C38.124 65.4101 34.6394 69.0687 32.0256 71.6226C30.7189 72.8993 29.6307 73.8992 28.8699 74.5791C28.4992 74.9105 28.2063 75.1658 28.0039 75.3401C27.8013 75.1615 27.5071 74.899 27.1341 74.5583C26.3731 73.863 25.2846 72.8419 23.9776 71.5417C21.3632 68.9406 17.878 65.2254 14.3939 60.7688C7.40916 51.8344 0.5 40.0091 0.5 28.2457C0.5 12.8988 12.7972 0.5 28 0.5C43.2028 0.5 55.5 12.8988 55.5 28.2457Z',
        fillColor: '#323232',
        fillOpacity: 1,
        strokeColor: 'black',
        scale: 1,
        anchor: new google.maps.Point(28, 76),
        labelOrigin: new google.maps.Point(28, 29),
      },
      labelClass: 'map-marker-label',
    },
  ],
};

function resetActiveMarker(mapId) {
  if (!mapId) return;
  const { activeMarker } = window.mapData[mapId];
  if (!activeMarker) return;
  const markerIcons = window.mapData.markerIconArray;
  if (activeMarker) {
    activeMarker.setIcon(markerIcons[activeMarker.markerIconIndex].visited);
    activeMarker.setLabel({
      text: activeMarker.labelText,
      className: ' map-marker-label',
      color: '#fff',
      fontFamily: 'ProximaNova, Arial, sans-serif',
      fontSize: '18px',
      fontWeight: '700',
    });
    activeMarker.userState = 'default';
    window.mapData[mapId].activeMarker = null;
  }
}

function generateMarker(data, map) {
  const activeIconIndex = data.iconIndex || 0;
  const markersIcon = window.mapData.markerIconArray;
  const mm = new google.maps.Marker({
    position: data.coords,
    map,
    icon: data.visited ? markersIcon[activeIconIndex].visited : markersIcon[activeIconIndex].default,
    label: {
      text: data.offerCount || '.',
      className: markersIcon[activeIconIndex].labelClass || 'map-marker-label',
      color: '#fff',
      fontFamily: 'ProximaNova, Arial, sans-serif',
      fontSize: '18px',
      fontWeight: '700',
    },
    clicable: true,
    userState: 'default',
    markerType: data.markerType,
    labelText: data.offerCount,
    offerTitle: data.offerTitle || undefined,
    offerColor: data.offerColor || undefined,
    url: data.spaceUrl,
    visited: data.visited || false,
    markerIconIndex: activeIconIndex,
  });

  if (data.popupText) {
    const isLO = data.markerType === 'lonelyOffer';
    const mmInfoContent = isLO ? document.createElement('a') : document.createElement('div');
    if (isLO) {
      mmInfoContent.classList.add('map-marker-tooltip-offer');
      mmInfoContent.classList.add('js-marker-link');
      mmInfoContent.setAttribute('href', data.url);
      mmInfoContent.mm = mm;
    } else {
      mmInfoContent.classList.add('map-marker-tooltip');
    }
    mmInfoContent.append(data.popupText);

    const popupOptions = {
      position: new google.maps.LatLng(data.coords.lat, data.coords.lng),
      content: mmInfoContent,
      marker: mm,
      distance: 6,
    };

    const mmInfo = new Popup(popupOptions);

    if (data.markerType === 'lonelyOffer') {
      mmInfo.open(map, mm);
      mm.setIcon(markersIcon[activeIconIndex].hover);
    } else {
      mm.addListener('mouseover', (evt) => {
        mmInfo.open(map, mm);
        if (mm.userState !== 'active') {
          mm.setIcon(markersIcon[activeIconIndex].hover);
        }
      });

      mm.addListener('mouseout', (evt) => {
        mmInfo.close();
        if (mm.userState !== 'active') {
          const icon = mm.visited ? markersIcon[activeIconIndex].visited : markersIcon[activeIconIndex].default;
          mm.setIcon(icon);
        }
      });
    }
  }
  mm.addListener('click', (evt) => {
    const layersStatus = window.globalFunctions.layoutsMethods.whichLayerActive();
    const bp = window.globalOptions.ndsizes;
    const wW = window.innerWidth;
    const mapId = map.getDiv().getAttribute('id');

    if (layersStatus.map || mm.markerType === 'offer') {
      resetActiveMarker(mapId);
      if (mm.userState !== 'active') {
        mm.setIcon(markersIcon[activeIconIndex].active);
        // mm.setLabel({
        //   text: '.',
        //   className: ' map-marker-label-circle',
        //   color: '#fff',
        //   fontSize: '1px',
        // });
        mm.userState = 'active';
        mm.visited = true;
        window.mapData[mapId].activeMarker = mm;
      } else {
        const icon = mm.visited ? markersIcon[activeIconIndex].visited : markersIcon[activeIconIndex].default;
        mm.setIcon(icon);
        // mm.setLabel({
        //   text: mm.labelText,
        //   className: ' map-marker-label',
        //   color: '#fff',
        //   fontFamily: 'ProximaNova, Arial, sans-serif',
        //   fontSize: '18px',
        //   fontWeight: '700',
        // });
        mm.userState = 'default';
      }

      switch (mm.markerType) {
        case 'space': {
          if (wW >= bp.sm) {
            window.globalFunctions.layoutsMethods.open('list', { sourceElement: undefined, marker: mm });
          } else {
            window.globalFunctions.layoutsMethods.open('space', { sourceElement: undefined, marker: mm });
            window.globalFunctions.layoutsMethods.redirectOnTab('tab-space-offers');
          }
          break;
        }
        case 'offer': {
          if (wW >= bp.sm) {
            const fullmap = window.globalFunctions.layoutsMethods.whichLayerActive().map;
            if (fullmap) {
              window.globalFunctions.layoutsMethods.open('list', { sourceElement: undefined, marker: mm });
            } else {
              window.globalFunctions.layoutsMethods.open('offer', { sourceElement: undefined, marker: mm }, { title: mm.offerTitle, color: mm.offerColor });
            }
          } else {
            window.globalFunctions.layoutsMethods.open('offer', { sourceElement: undefined, marker: mm }, { title: mm.offerTitle, color: mm.offerColor });
          }
          break;
        }
        default:
          break;
      }
    } else {
      resetActiveMarker(mapId);
      if (mm.userState !== 'active') {
        mm.setIcon(markersIcon[activeIconIndex].active);
        mm.userState = 'active';
        mm.visited = true;
        window.mapData[mapId].activeMarker = mm;
      } else {
        const icon = mm.visited ? markersIcon[activeIconIndex].visited : markersIcon[activeIconIndex].default;
        mm.setIcon(icon);
        mm.userState = 'default';
      }

      switch (mm.markerType) {
        case 'space': {
          // if (wW < bp.sm) {
          //   window.globalFunctions.layoutsMethods.open('space', { sourceElement: undefined, marker: mm });
          //   window.globalFunctions.layoutsMethods.redirectOnTab('tab-space-describe');
          // } else {
          //   const url = mm.url || '/';
          //   window.open(url, '_blank');
          // }
          window.globalFunctions.layoutsMethods.open('space', { sourceElement: undefined, marker: mm });
          window.globalFunctions.layoutsMethods.redirectOnTab('tab-space-describe');
          break;
        }
        case 'offer': {
          window.globalFunctions.layoutsMethods.open('offer', { sourceElement: undefined, marker: mm }, { title: mm.offerTitle, color: mm.offerColor });
          break;
        }
        default:
          break;
      }
    }
    map.setCenter(mm.position);
  });
  return mm;
}

function initGMap(mapEl, center) {
  if (!mapEl) return undefined;
  const map = new google.maps.Map(
    mapEl, {
      zoom: 12,
      center,
      disableDefaultUI: true,
      zoomControl: false,
    },
  );

  map.addListener('click', () => {
    const mapId = map.getDiv().getAttribute('id');
    resetActiveMarker(mapId);
  });

  return map;
}

function setMarkersOnMap(locationList, centerMap, mapId) {
  const mapWrapper = document.getElementById(mapId);
  if (!mapWrapper) return;
  const map = initGMap(mapWrapper, centerMap);
  if (map) {
    const markers = locationList.map((location) => generateMarker(location, map));

    window.mapData[mapId] = {
      map,
      markers,
    };

    if (markers.length > 1) {
      const cluster = new MarkerClusterer(map, markers, {
        calculator(mrks) {
          let result = 0;
          mrks.forEach((el) => {
            result += Number(el.labelText);
          });
          return { text: result, index: 1 };
        },
        maxZoom: 15,
        averageCenter: true,
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
}

function clearMapMarkers(mapId) {
  const { mapData } = window;

  if (markerClusterer) {
    markerClusterer.clearMarkers();
    mapData[mapId].markers = null;
  } else if (mapData.markers) {
    mapData[mapId].markers.forEach((el) => el.setMap(null));
    mapData[mapId].markers = null;
  }
}

window.mapData.setMarkersOnMap = setMarkersOnMap;
window.mapData.clearMapMarkers = clearMapMarkers;
window.mapData.resetActiveMarker = resetActiveMarker;

function initMap() {
  const searchMap = document.getElementById('search-map');

  if (searchMap) {
    const mapMarkersUrl = searchMap.getAttribute('data-map-markers-url');

    if (mapMarkersUrl) {
      fetch(mapMarkersUrl).then((response) => response.json()).then((result) => {
        setMarkersOnMap(result.markers, result.center, 'search-map');
      });
    }
  }

  const lonelyMap = document.getElementById('space-map');

  if (lonelyMap) {
    const mapMarkerUrl = lonelyMap.getAttribute('data-map-markers-url');

    if (mapMarkerUrl) {
      fetch(mapMarkerUrl).then((response) => response.json()).then((result) => {
        setMarkersOnMap(result.markers, result.center, 'space-map');
      });
    }
  }

  const lonelyOfferMap = document.getElementById('offer-map');

  if (lonelyOfferMap) {
    const mapMarkerUrl = lonelyOfferMap.getAttribute('data-map-markers-url');

    if (mapMarkerUrl) {
      fetch(mapMarkerUrl).then((response) => response.json()).then((result) => {
        setMarkersOnMap(result.markers, result.center, 'offer-map');
      });
    }
  }
}

window.initMap = initMap;

$(document).ready(() => {
  initMap();
});
