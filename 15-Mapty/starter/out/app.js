import Running from './subClassRunning.js';
import Cycling from './subClassCycling.js';
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
let coords, tmpMarker;
export default class App {
    constructor() {
        this.activities = [];
        this.mapZoom = 13;
        this.map = L.map('map', { closePopupOnClick: false });
        this.getPosition();
        this.focusWorkout();
        this.toggleElevationField();
        this.displayForm();
        this.newWorkout();
    }
    init() {
        if (this.activities.length >= 1) {
            this.activities.forEach(a => {
                this.displayActivity(a);
                this.displayMarker(a);
            });
        }
    }
    getPosition() {
        if (navigator.geolocation) {
            const error = function () {
                alert('Cannot get location');
            };
            navigator.geolocation.getCurrentPosition(this.loadMap.bind(this), error);
        }
        return this.map;
    }
    loadMap(pos) {
        const { longitude } = pos.coords;
        const { latitude } = pos.coords;
        console.log(`https://www.google.de/maps/@${latitude},${longitude}`);
        const initCoords = L.latLng(latitude, longitude);
        this.map.setView(initCoords, this.mapZoom);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        this.getLocalStroage();
        this.loadStoredActivities();
        return this.map;
    }
    displayForm() {
        this.map.on('click', (mapEvent) => {
            inputCadence.value =
                inputDistance.value =
                    inputDuration.value =
                        inputElevation.value =
                            '';
            form.classList.remove('hidden');
            inputDistance.focus();
            coords = L.latLng(mapEvent.latlng.lat, mapEvent.latlng.lng);
            if (tmpMarker)
                tmpMarker.remove();
            tmpMarker = this.showTempMarker(coords);
        });
    }
    hideForm() {
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1);
    }
    toggleElevationField() {
        inputType.addEventListener('change', () => {
            if (inputType.value === 'running') {
                inputCadence
                    .closest('.form__row')
                    ?.classList.remove('form__row--hidden');
                inputElevation
                    .closest('.form__row')
                    ?.classList.add('form__row--hidden');
            }
            else {
                inputCadence.closest('.form__row')?.classList.add('form__row--hidden');
                inputElevation
                    .closest('.form__row')
                    ?.classList.remove('form__row--hidden');
            }
        });
    }
    newWorkout() {
        form.addEventListener('submit', ev => {
            ev.preventDefault();
            const type = inputType.value;
            const duration = Number(inputDuration.value);
            const distance = Number(inputDistance.value);
            const cadOrElev = type === 'running'
                ? Number(inputCadence.value)
                : Number(inputElevation.value);
            if (type && duration >= 0 && distance >= 0 && cadOrElev) {
                const newActivity = type === 'running'
                    ? new Running(coords, distance, duration, cadOrElev)
                    : new Cycling(coords, distance, duration, cadOrElev);
                this.activities.push(newActivity);
                this.displayActivity(newActivity);
                this.displayMarker(newActivity);
                this.hideForm();
                this.setLocalStorage();
            }
            else
                alert(`Please fill in all fields correctly!`);
        });
    }
    displayMarker(a) {
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
            .setPopupContent(a.heading)
            .openPopup();
    }
    displayActivity(activity) {
        if (activity === void 0)
            throw new Error("Couldn't get valid Activity");
        //prettier-ignore
        const average = activity.type === "Running" ? activity.pace : activity.averageSpeed;
        const html = `<li class="workout workout--${activity.type.toLowerCase()}" data-id="${activity.id}">
    <h2 class="workout__title">${activity.heading}
    <button style="background: none; border:none; margin-left: 10px;">🗑️</button></h2>
    
    <div class="workout__details">
      <span class="workout__icon">${activity.type === 'Running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
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
      <span class="workout__icon">${activity.type === 'Running' ? '🦶🏼' : '⛰'}</span>
      <span class="workout__value">${activity.cadence || activity.elevationGain}</span>
      <span class="workout__unit">${activity.type === 'Running' ? 'spm' : 'm'}</span>
    </div>
  </li>`;
        form.insertAdjacentHTML('afterend', html);
    }
    focusWorkout() {
        containerWorkouts.addEventListener('click', ev => {
            const target = ev.target;
            // early return
            if (!target.closest('.workout'))
                return;
            const id = target.dataset.id ||
                target.closest('.workout').dataset.id;
            const curActivity = this.activities.find(a => a.id === id);
            curActivity
                ? this.map.setView(curActivity.coords, this.mapZoom, {
                    animate: true,
                    duration: 1,
                })
                : console.log('Cannot find Activity');
            // curActivity?.click();
        });
    }
    showTempMarker(coords) {
        return L.marker(coords).addTo(this.map);
    }
    setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.activities));
    }
    getLocalStroage() {
        const storageRAW = localStorage.getItem('workouts');
        if (!storageRAW) {
            return console.log('No storage data found!');
        }
        else {
            const storageParsed = JSON.parse(storageRAW);
            storageParsed.forEach(e => {
                if (!e.type)
                    return;
                e.__proto__ = Object.create(e.type === 'Running' ? Running.prototype : Cycling.prototype);
            });
            this.activities = storageParsed;
        }
    }
    loadStoredActivities() {
        if (!(this.activities.length > 0))
            return;
        this.activities.forEach(a => {
            this.displayActivity(a);
            this.displayMarker(a);
        });
    }
    deleteLocalStorage() {
        localStorage.removeItem('workouts');
        location.reload();
    }
}
