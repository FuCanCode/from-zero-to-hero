import { ActivityType, ActivityShape } from './classActivity.js';
import Running from './subClassRunning.js';
import Cycling from './subClassCycling.js';

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
const activities: (Running | Cycling)[] = [];
export let coords: L.LatLng, tmpMarker: L.Marker;

export default class App {
  map: L.Map;

  constructor() {
    this.map = L.map('map', { closePopupOnClick: false });
    this.getPosition();
    this.focusWorkout();
    this.toggleElevationField();
    this.displayForm();
    this.newWorkout();
  }

  protected init() {
    if (activities.length >= 1) {
      activities.forEach(a => {
        this.displayActivity(a);
        this.displayMarker(a);
      });
    }
  }

  protected getPosition() {
    if (navigator.geolocation) {
      const error = function (): void {
        alert('Cannot get location');
      };
      navigator.geolocation.getCurrentPosition(this.loadMap.bind(this), error);
    }
    return this.map;
  }

  protected loadMap(pos: GeolocationPosition) {
    const { longitude } = pos.coords;
    const { latitude } = pos.coords;
    console.log(`https://www.google.de/maps/@${latitude},${longitude}`);

    const initCoords = L.latLng(latitude, longitude);

    this.map.setView(initCoords, 13);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);
    return this.map;
  }

  protected displayForm() {
    this.map.on('click', (mapEvent: L.LeafletMouseEvent) => {
      inputCadence.value =
        inputDistance.value =
        inputDuration.value =
        inputElevation.value =
          '';
      form.classList.remove('hidden');
      inputDistance.focus();

      coords = L.latLng(mapEvent.latlng.lat, mapEvent.latlng.lng);

      if (tmpMarker) tmpMarker.remove();
      tmpMarker = this.showTempMarker(coords);
    });
  }

  protected hideForm() {
    form.classList.add('hidden');
  }

  protected toggleElevationField() {
    inputType.addEventListener('change', () => {
      if (inputType.value === 'running') {
        inputCadence
          .closest('.form__row')
          ?.classList.remove('form__row--hidden');
        inputElevation
          .closest('.form__row')
          ?.classList.add('form__row--hidden');
      } else {
        inputCadence.closest('.form__row')?.classList.add('form__row--hidden');
        inputElevation
          .closest('.form__row')
          ?.classList.remove('form__row--hidden');
      }
    });
  }

  protected newWorkout() {
    form.addEventListener('submit', ev => {
      ev.preventDefault();

      const type = inputType.value as ActivityType;
      const duration = Number(inputDuration.value);
      const distance = Number(inputDistance.value);
      const cadOrElev =
        type === 'running'
          ? Number(inputCadence.value)
          : Number(inputElevation.value);
      console.log(type, duration, distance, cadOrElev, coords);

      if (type && duration && distance && cadOrElev) {
        const newActivity =
          type === 'running'
            ? new Running(coords, distance, duration, cadOrElev)
            : new Cycling(coords, distance, duration, cadOrElev);
        activities.push(newActivity);

        this.displayActivity(newActivity);
        this.displayMarker(newActivity);
        this.hideForm();
      } else alert(`Please fill in all fields!`);
    });
  }

  protected displayMarker(a: Running | Cycling) {
    const markerOptions = {
      opacity: 0.85,
      riseOnHover: true,
      riseOffset: 250,
    };

    const popupOptions = {
      autoClose: false,
      maxWidth: 200,
      minWidth: 100,
      className: `${a.type.toLowerCase()}-popup`,
    };

    L.marker(a.coords, markerOptions)
      .addTo(this.map)
      .bindPopup(L.popup(popupOptions))
      .setPopupContent(a.titleText)
      .openPopup();
  }

  protected displayActivity(activity: ActivityShape) {
    if (activity === void 0) throw new Error("Couldn't get valid Activity");
    //prettier-ignore
    const average = activity.type === "Running" ? activity.pace : activity.averageSpeed
    const html = `<li class="workout workout--${activity.type.toLowerCase()}" data-id="${
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
      <span class="workout__value">${average?.toFixed(1)}</span>
      <span class="workout__unit">${activity.cadence ? 'min/km' : 'KM/H'}</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">${
        activity.type === 'running' ? '🦶🏼' : '⛰'
      }</span>
      <span class="workout__value">${
        activity.cadence || activity.elevationGain
      }</span>
      <span class="workout__unit">${
        activity.type === 'running' ? 'spm' : 'm'
      }</span>
    </div>
  </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  protected focusWorkout() {
    containerWorkouts.addEventListener('click', ev => {
      const target = ev.target as HTMLElement;

      // early return
      if (!(target.tagName === 'li' || target.closest('li'))) return;

      const id = Number(target.dataset.id || target.closest('li')?.dataset.id);
      const curActivity = activities.find(a => a.id === id);

      curActivity
        ? this.map.setView(curActivity.coords)
        : console.log('Cannot find Activity');
    });
  }

  protected showTempMarker(coords: L.LatLng) {
    return L.marker(coords).addTo(this.map);
  }
}
