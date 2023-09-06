import { Activity, ActivityType } from './classActivity';
import { Running } from './subClassRunning';
import { Cycling } from './subClassCycling';
import L from 'leaflet';
//SECTION - HTML-Elements and Globals
//ANCHOR - DOM-Elements
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// prettier-ignore
const form = document.querySelector('.form')! as HTMLFormElement;
const containerWorkouts = document.querySelector('.workouts')!;
// prettier-ignore
const inputType = document.querySelector('.form__input--type')! as HTMLSelectElement;
// prettier-ignore
const inputDistance = document.querySelector('.form__input--distance')! as HTMLInputElement;
// prettier-ignore
const inputDuration = document.querySelector('.form__input--duration')! as HTMLInputElement;
// prettier-ignore
const inputCadence = document.querySelector('.form__input--cadence')! as HTMLInputElement;
// prettier-ignore
const inputElevation = document.querySelector('.form__input--elevation')! as HTMLInputElement;

//ANCHOR - Global variable and types
const activities: Activity[] = [];
let coords: L.LatLng, map: L.Map;

//!SECTION

//SECTION - Classes and Functions
//ANCHOR - Class Activity

//ANCHOR - init
const init = function () {
  if (navigator.geolocation) {
    const success = function (pos: GeolocationPosition) {
      const { longitude } = pos.coords;
      const { latitude } = pos.coords;
      console.log(`https://www.google.de/maps/@${latitude},${longitude}`);

      const initCoords = L.latLng(latitude, longitude);

      const mapOptions = {
        closePopupOnClick: false,
      };

      map = L.map('map', mapOptions).setView(initCoords, 10);

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      //ANCHOR - MapKlick
      map.on('click', function (mapEvent: any) {
        displayForm(true);
        inputDistance.focus();
        console.log(mapEvent);
        coords = L.latLng(mapEvent.latlng.lat, mapEvent.latlng.lng);
        console.log(coords);
      });
    };

    const error = function (): void {
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
const displayMarker = function (a: Activity) {
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
const displayForm = function (visibility: boolean) {
  visibility ? form.classList.remove('hidden') : form.classList.add('hidden');
};

//ANCHOR - displayActivity
const displayActivity = function (activity: Activity) {
  //prettier-ignore
  const average = (activity.type === "running" ? activity.duration / activity.distance : activity.distance / (activity.duration / 60)).toFixed(1)
  const html = `<li class="workout workout--${activity.type}" data-id="${
    activity.id
  }">
  <h2 class="workout__title">${activity.titleText}</h2>
  <div class="workout__details">
    <span class="workout__icon">${
      activity.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
    }</span>
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
    <span class="workout__icon">${
      activity.type === 'running' ? '🦶🏼' : '⛰'
    }</span>
    <span class="workout__value">${activity.cadence || activity.elevGain}</span>
    <span class="workout__unit">${
      activity.type === 'running' ? 'spm' : 'm'
    }</span>
  </div>
</li>`;

  form.insertAdjacentHTML('afterend', html);
};
//!SECTION

//SECTION - Event Handler

//ANCHOR - FormSelect
inputType.addEventListener('change', function (event: Event) {
  const activity = (event.target as HTMLOptionElement).value as ActivityType;
  if (activity === 'running') {
    inputCadence.parentElement?.classList.remove('form__row--hidden');
    inputElevation.parentElement?.classList.add('form__row--hidden');
  }

  if (activity === 'cycling') {
    inputElevation.parentElement?.classList.remove('form__row--hidden');
    inputCadence.parentElement?.classList.add('form__row--hidden');
  }
  //Shorter solution from Jonas
  // inputCadence.closest('.form__row')?.classList.toggle('.form__row--hidden');
  // inputElevation.closest('.form__row')?.classList.toggle('.form__row--hidden');
});

//ANCHOR - 232. Geolocation API

//ANCHOR - Form handler
form.addEventListener('submit', function (ev) {
  ev.preventDefault();
  console.log(ev.target);
  const type = inputType.value as ActivityType;
  const duration = Number(inputDuration.value);
  const distance = Number(inputDistance.value);
  const cadOrElev =
    type === 'running'
      ? Number(inputCadence.value)
      : Number(inputElevation.value);
  console.log(type, duration, distance, cadOrElev);

  if (type && duration && distance && cadOrElev) {
    const newActivity = new Activity(
      type,
      coords,
      distance,
      duration,
      cadOrElev
    );
    activities.push(newActivity);

    displayActivity(newActivity);
    displayMarker(newActivity);

    displayForm(false);
    form.reset();
  } else alert(`Please fill in all fields!`);
});

//ANCHOR - focusWorkout
containerWorkouts.addEventListener('click', function (ev) {
  const target = ev.target as HTMLElement;

  // early return
  if (!(target.tagName === 'li' || target.closest('li'))) return;

  const id = Number(target.dataset.id || target.closest('li')?.dataset.id);
  const curActivity = activities.find(a => a.id === id);

  curActivity
    ? map.setView(curActivity.coords, 10)
    : console.log('Cannot find Activity');
});
