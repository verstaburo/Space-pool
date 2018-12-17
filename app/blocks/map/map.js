/* eslint-disable no-unused-vars */
// http://leafletjs.com
// Для кластеров использовать: https://github.com/Leaflet/Leaflet.markercluster
import L from 'leaflet';

const $ = window.$;

export function maps() {
  if (!$('#map').length) {
    return;
  }

  const map = L.map('map').setView([59.934, 30.335], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 12,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
  }).addTo(map);

  const marker = L.marker([59.934, 30.335]).addTo(map);

  marker.bindPopup('Кастомный HTML-попап');
}

export function mapsTwo() {
  if (!$('#mapTwo').length) {
    return;
  }
  const mapTwo = L.map('mapTwo').setView([59.934, 30.335], 13);
  const myMarker = L.icon({
    iconUrl: 'assets/images/map/marker-two.png',
    shadowUrl: 'marker-two.png',
    iconSize: [38, 95],
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 12,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
  }).addTo(mapTwo);

  const marker = L.marker([59.934, 30.315], { icon: myMarker }).addTo(mapTwo);
  const markerTwo = L.marker([59.9345, 30.3156], { icon: myMarker }).addTo(mapTwo);
  const markerQ = L.marker([59.924, 30.335], { icon: myMarker }).addTo(mapTwo);
  const markerW = L.marker([59.924, 30.305], { icon: myMarker }).addTo(mapTwo);
  const markerE = L.marker([59.924, 30.335], { icon: myMarker }).addTo(mapTwo);
  const markerR = L.marker([59.914, 30.335], { icon: myMarker }).addTo(mapTwo);
  const markerT = L.marker([59.934, 30.335], { icon: myMarker }).addTo(mapTwo);

  marker.bindPopup('Кастомный попап');
}
/* eslint-enable no-unused-vars */
