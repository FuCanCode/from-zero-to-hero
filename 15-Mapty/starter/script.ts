// import * as L from 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//ANCHOR - 232. Geolocation API
if (navigator.geolocation) {
  const success = function (pos: GeolocationPosition) {
    const { longitude } = pos.coords;
    const { latitude } = pos.coords;
    console.log(`https://www.google.de/maps/@${latitude},${longitude}`);

    // Leaflet
    const L: any = window.L;
    const coords = [latitude, longitude];
    const map = L.map('map').setView(coords, 15);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  };

  const error = function (): void {
    alert('Cannot get location');
  };
  navigator.geolocation.getCurrentPosition(success, error);
}

//ANCHOR - 233. Map using Leaflet library
