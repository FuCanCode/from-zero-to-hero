import { Activity, ActivityShape, ActivityType } from './classActivity.js';

export default class Cycling extends Activity implements ActivityShape {
  type: ActivityType = 'Cycling';
  elevationGain: number;
  averageSpeed: number;
  heading: string;

  constructor(
    coords: L.LatLng,
    distance: number,
    duration: number,
    elevationGain: number
  ) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.averageSpeed = distance / (duration / 60);
    this.heading = `🚴‍♀️ ${this.type} ${this.printTitleDate()}`;
    console.log(this);
  }
}
