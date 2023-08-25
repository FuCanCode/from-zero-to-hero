// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// const success = function (pos) {
//   console.log(pos.coords);

interface Coords {
  x: number;
  y: number;
}

if (navigator.geolocation) {
  const success = function (pos: GeolocationPosition) {
    const { longitude } = pos.coords;
    const { latitude } = pos.coords;
    console.log(`https://www.google.de/maps/@${latitude},${longitude}`);
  };

  const error = function () {
    alert('Cannot get location');
  };
  navigator.geolocation.getCurrentPosition(success, error);
}
