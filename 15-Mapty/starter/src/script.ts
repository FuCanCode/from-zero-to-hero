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
let coords: L.LatLng, map: L.Map;
type ActivityType = 'running' | 'cycling';

//ANCHOR - Class Activity
class Activity {
  date: Date;
  type: ActivityType;
  distance: number;
  duration: number;
  cadence?: number;
  elevGain?: number;

  constructor(
    type: ActivityType,
    dist: number,
    dur: number,
    cadOrElev: number
  ) {
    this.date = new Date();
    this.type = type;
    this.distance = dist;
    this.duration = dur;
    type === 'cycling'
      ? (this.elevGain = cadOrElev)
      : (this.cadence = cadOrElev);
  }
}

//ANCHOR - Activity Storage
const activities: Activity[] = [];
activities.push(new Activity('cycling', 50, 30, 500));
console.log(activities);

//ANCHOR - 234. Displaying a map marker
const displayMarker = function () {
  const markerOptions = {
    title: 'This is a marker title.',
    opacity: 0.85,
    riseOnHover: true,
    riseOffset: 250,
  };

  const popupOptions = {
    autoClose: false,
    maxWidth: 200,
    minWidth: 100,
    className: `${inputType.value}-popup`,
  };

  L.marker(coords, markerOptions)
    .addTo(map)
    .bindPopup(L.popup(popupOptions))
    .setPopupContent(
      `You've really clicked on ${coords.lat.toFixed(5)} ${coords.lng.toFixed(
        5
      )}.`
    )
    .openPopup();
};

//ANCHOR - Form

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
});

const displayForm = function (visibility: boolean) {
  visibility ? form.classList.remove('hidden') : form.classList.add('hidden');
};

//ANCHOR - 232. Geolocation API
if (navigator.geolocation) {
  const success = function (pos: GeolocationPosition) {
    const { longitude } = pos.coords;
    const { latitude } = pos.coords;
    console.log(`https://www.google.de/maps/@${latitude},${longitude}`);

    //ANCHOR - 233. Map using Leaflet library
    // const L: any = window.L;
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
    activities.push(new Activity(type, distance, duration, cadOrElev));
    console.log(activities);
    displayForm(false);
    form.reset();
  } else alert(`Please fill in all fields!`);
});
