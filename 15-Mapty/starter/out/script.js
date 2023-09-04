"use strict";
//SECTION - HTML-Elements and Globals
//ANCHOR - DOM-Elements
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// prettier-ignore
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
// prettier-ignore
const inputType = document.querySelector('.form__input--type');
// prettier-ignore
const inputDistance = document.querySelector('.form__input--distance');
// prettier-ignore
const inputDuration = document.querySelector('.form__input--duration');
// prettier-ignore
const inputCadence = document.querySelector('.form__input--cadence');
// prettier-ignore
const inputElevation = document.querySelector('.form__input--elevation');
//ANCHOR - Global variable and types
const activities = [];
let coords, map;
//!SECTION
//SECTION - Classes and Functions
//ANCHOR - Class Activity
class Activity {
    constructor(type, dist, dur, cadOrElev) {
        this.date = new Date();
        this.id = this.date.getTime();
        this.type = type;
        this.distance = dist;
        this.duration = dur;
        type === 'cycling'
            ? (this.elevGain = cadOrElev)
            : (this.cadence = cadOrElev);
        this.coords = coords;
    }
    get titleText() {
        return `${this.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${this.type[0].toUpperCase() + this.type.slice(1)} on ${Intl.DateTimeFormat(navigator.language, {
            month: 'long',
            day: 'numeric',
        }).format(this.date)}`;
    }
}
//ANCHOR - init
const init = function () {
    if (navigator.geolocation) {
        const success = function (pos) {
            const { longitude } = pos.coords;
            const { latitude } = pos.coords;
            console.log(`https://www.google.de/maps/@${latitude},${longitude}`);
            const initCoords = L.latLng(latitude, longitude);
            const mapOptions = {
                closePopupOnClick: false,
            };
            map = L.map('map', mapOptions).setView(initCoords, 10);
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
            //ANCHOR - MapKlick
            map.on('click', function (mapEvent) {
                displayForm(true);
                console.log(mapEvent);
                coords = L.latLng(mapEvent.latlng.lat, mapEvent.latlng.lng);
                console.log(coords);
            });
        };
        const error = function () {
            alert('Cannot get location');
        };
        navigator.geolocation.getCurrentPosition(success, error);
    }
    form.reset();
    if (activities.length >= 1) {
        activities.forEach(a => {
            displayActivity(a);
            displayMarker(a);
        });
    }
};
init();
//ANCHOR - displayMarker
const displayMarker = function (a) {
    const markerOptions = {
        opacity: 0.85,
        riseOnHover: true,
        riseOffset: 250,
    };
    const popupOptions = {
        autoClose: false,
        maxWidth: 200,
        minWidth: 100,
        className: `${a.type}-popup`,
    };
    L.marker(a.coords, markerOptions)
        .addTo(map)
        .bindPopup(L.popup(popupOptions))
        .setPopupContent(a.titleText)
        .openPopup();
};
//ANCHOR - displayForm
const displayForm = function (visibility) {
    visibility ? form.classList.remove('hidden') : form.classList.add('hidden');
};
//ANCHOR - displayActivity
const displayActivity = function (activity) {
    //prettier-ignore
    const average = (activity.type === "running" ? activity.duration / activity.distance : activity.distance / (activity.duration / 60)).toFixed(1);
    const html = `<li class="workout workout--${activity.type}" data-id="${activity.id}">
  <h2 class="workout__title">${activity.titleText}</h2>
  <div class="workout__details">
    <span class="workout__icon">${activity.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
    <span class="workout__value">${activity.distance}</span>
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">${activity.duration}</span>
    <span class="workout__unit">min</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${average}</span>
    <span class="workout__unit">${activity.cadence ? 'min/km' : 'KM/H'}</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">${activity.type === 'running' ? '🦶🏼' : '⛰'}</span>
    <span class="workout__value">${activity.cadence || activity.elevGain}</span>
    <span class="workout__unit">${activity.type === 'running' ? 'spm' : 'm'}</span>
  </div>
</li>`;
    form.insertAdjacentHTML('afterend', html);
};
//!SECTION
//SECTION - Event Handler
//ANCHOR - FormSelect
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
//ANCHOR - Form handler
form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    console.log(ev.target);
    const type = inputType.value;
    const duration = Number(inputDuration.value);
    const distance = Number(inputDistance.value);
    const cadOrElev = type === 'running'
        ? Number(inputCadence.value)
        : Number(inputElevation.value);
    console.log(type, duration, distance, cadOrElev);
    if (type && duration && distance && cadOrElev) {
        const newActivity = new Activity(type, distance, duration, cadOrElev);
        activities.push(newActivity);
        displayActivity(newActivity);
        displayMarker(newActivity);
        displayForm(false);
        form.reset();
    }
    else
        alert(`Please fill in all fields!`);
});
//ANCHOR - focusWorkout
containerWorkouts.addEventListener('click', function (ev) {
    var _a;
    const target = ev.target;
    // early return
    if (!(target.tagName === 'li' || target.closest('li')))
        return;
    const id = Number(target.dataset.id || ((_a = target.closest('li')) === null || _a === void 0 ? void 0 : _a.dataset.id));
    const curActivity = activities.find(a => a.id === id);
    curActivity
        ? map.setView(curActivity.coords, 10)
        : console.log('Cannot find Activity');
});
