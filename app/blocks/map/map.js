/* eslint-disable no-unused-vars */
// http://leafletjs.com
// Для кластеров использовать: https://github.com/Leaflet/Leaflet.markercluster
import L from 'leaflet';

const $ = window.$;

export function maps() {
  if (!$('#map').length) {
    return;
  }

  const map = L.map('map', {
    scrollWheelZoom: false,
  }).setView([51.513443, -0.102139], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
  }).addTo(map);

  map.zoomControl.setPosition('bottomright');

  const myMarker = L.icon({
    iconUrl: 'assets/images/map/map-marker.png',
    iconSize: [43, 46],
    iconAnchor: [13, 46],
  });
  const marker = L.marker([51.513443, -0.102139], {
    icon: myMarker,
  }).addTo(map);
}

export function mapsTwo() {
  if (!$('#mapTwo').length) {
    return;
  }
  const mapTwo = L.map('mapTwo', {
    scrollWheelZoom: false,
  }).setView([59.934, 30.335], 13);
  const myMarker = L.icon({
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

  const marker = L.marker([59.934, 30.315], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerTwo = L.marker([59.9345, 30.3156], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerQ = L.marker([59.924, 30.335], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerW = L.marker([59.924, 30.305], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerE = L.marker([59.924, 30.335], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerR = L.marker([59.914, 30.335], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerT = L.marker([59.934, 30.325], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerA = L.marker([59.900, 30.315], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerS = L.marker([59.934, 30.300], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerD = L.marker([59.913, 30.330], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerF = L.marker([59.927, 30.338], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerG = L.marker([59.948, 30.34], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerH = L.marker([59.988, 30.324], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerJ = L.marker([59.9, 30.34476], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerK = L.marker([59.939, 30.76], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerL = L.marker([59.941, 30.9], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerZ = L.marker([59.966, 30.8], {
    icon: myMarker,
  }).addTo(mapTwo);
  const markerX = L.marker([59.977, 30.73735], {
    icon: myMarker,
  }).addTo(mapTwo);
}
/* eslint-enable no-unused-vars */
