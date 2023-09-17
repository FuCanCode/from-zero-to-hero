import App from './app.js';
// import L from 'leaflet';

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const app = new App();

declare global {
  interface Window {
    app: any;
  }
}

window.app = app;
