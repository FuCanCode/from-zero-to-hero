// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form')!;
const containerWorkouts = document.querySelector('.workouts')!;
const inputType: HTMLSelectElement =
  document.querySelector('.form__input--type')!;
const inputDistance = document.querySelector('.form__input--distance')!;
const inputDuration = document.querySelector('.form__input--duration')!;
const inputCadence = document.querySelector('.form__input--cadence')!;
const inputElevation = document.querySelector('.form__input--elevation')!;

//ANCHOR - Form
type Activity = 'running' | 'cycling';
inputType.addEventListener('change', function (event: Event) {
  const activity = (event.target as HTMLOptionElement).value as Activity;
  if (activity === 'running') {
    inputCadence.parentElement?.classList.remove('form__row--hidden');
    inputElevation.parentElement?.classList.add('form__row--hidden');
  }

  if (activity === 'cycling') {
    inputElevation.parentElement?.classList.remove('form__row--hidden');
    inputCadence.parentElement?.classList.add('form__row--hidden');
  }
});

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

    const map = L.map('map', mapOptions).setView(initCoords, 10);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    let coords: L.LatLng;

    //ANCHOR - MapKlick
    map.on('click', function (mapEvent: any) {
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
        .setPopupContent(
          `You've really clicked on ${coords.lat} ${coords.lng}.`
        )
        .openPopup();
    });
  };

  const error = function (): void {
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
