import { Activity, ActivityShape, ActivityType } from './classActivity.js';

export default class Running extends Activity implements ActivityShape {
  readonly id: number;
  date: Date;
  type: ActivityType = 'Running';
  cadence: number;
  pace: number;
  heading: string;

  constructor(
    coords: L.LatLng,
    distance: number,
    duration: number,
    cadence: number
  ) {
    super(coords, distance, duration);
    this.date = new Date();
    this.id = this.date.getTime();
    this.cadence = cadence;
    this.pace = duration / distance;
    this.heading = `🏃‍♂️ ${this.type} ${this.printTitleDate()}`;
  }
}
