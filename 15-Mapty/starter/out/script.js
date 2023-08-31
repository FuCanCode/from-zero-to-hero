"use strict";
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
inputType.addEventListener('change', function (event) {
    var _a, _b, _c, _d;
    const activity = event.target.value;
    if (activity === 'running') {
        (_a = inputCadence.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('form__row--hidden');
        (_b = inputElevation.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add('form__row--hidden');
    }
    if (activity === 'cycling') {
        (_c = inputElevation.parentElement) === null || _c === void 0 ? void 0 : _c.classList.remove('form__row--hidden');
        (_d = inputCadence.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add('form__row--hidden');
    }
});
//ANCHOR - 232. Geolocation API
if (navigator.geolocation) {
    const success = function (pos) {
        const { longitude } = pos.coords;
        const { latitude } = pos.coords;
        console.log(`https://www.google.de/maps/@${latitude},${longitude}`);
        //ANCHOR - 233. Map using Leaflet library
        // const L: any = window.L;
        const initCoords = L.latLng(latitude, longitude);
        const mapOptions = {
            closePopupOnClick: false,
        };
        const map = L.map('map', mapOptions).setView(initCoords, 10);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        let coords;
        //ANCHOR - MapKlick
        map.on('click', function (mapEvent) {
            console.log(mapEvent);
            coords = L.latLng(mapEvent.latlng.lat, mapEvent.latlng.lng);
            console.log(coords);
            const markerOptions = {
                title: 'This is a marker title.',
                opacity: 0.85,
                riseOnHover: true,
                riseOffset: 250,
            };
            const popupOptions = {
                /* content: `You clicked on ${coords[0].toFixed(5)} ${coords[1].toFixed(
                  5
                )}.`, */ //now in the setPopupContent function
                autoClose: false,
                maxWidth: 200,
                minWidth: 100,
                className: `${inputType.value}-popup`,
            };
            L.marker(coords, markerOptions)
                .addTo(map)
                .bindPopup(L.popup(popupOptions))
                .setPopupContent(`You've really clicked on ${coords.lat} ${coords.lng}.`)
                .openPopup();
        });
    };
    const error = function () {
        alert('Cannot get location');
    };
    navigator.geolocation.getCurrentPosition(success, error);
}
//ANCHOR - 234. Displaying a map marker
/* const app = function () {
  alert('Site loaded!');
  console.log(map);
  function onMapClick(e) {
    const coords = [e.latlng.lat, e.latlng.lng];
    console.log(coords);
    L.marker(coords).addTo(map);
    console.log(e);
  }

  map.on('click', onMapClick);
};

setTimeout(app, 1500); */
