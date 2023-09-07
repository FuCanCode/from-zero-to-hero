import { Activity, ActivityShape } from './classActivity.js';

export default class Cycling extends Activity implements ActivityShape {
  readonly id: number;
  date: Date;
  type: string = 'Cycling';
  elevationGain: number;
  averageSpeed: number;

  constructor(
    coords: L.LatLng,
    distance: number,
    duration: number,
    elevationGain: number
  ) {
    super(coords, distance, duration);
    this.date = new Date();
    this.id = this.date.getTime();
    this.elevationGain = elevationGain;
    this.averageSpeed = distance / duration;
  }

  get titleText() {
    return `🚴‍♀️ ${this.type} on ${Intl.DateTimeFormat(navigator.language, {
      month: 'long',
      day: 'numeric',
    }).format(this.date)}`;
  }
}
