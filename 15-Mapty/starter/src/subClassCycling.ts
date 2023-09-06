import { Activity } from './classActivity';

export class Cycling extends Activity {
  readonly id: number;
  date: Date;
  type: string = 'Cycling';
  averageSpeed: number;

  constructor(
    coords: L.LatLng,
    distance: number,
    duration: number,
    private elevationGain: number
  ) {
    super(coords, distance, duration);
    this.date = new Date();
    this.id = this.date.getTime();
    this.elevationGain = elevationGain;
    this.averageSpeed = this.distance / this.duration;
  }

  get titleText() {
    return `🚴‍♀️ ${this.type} on ${Intl.DateTimeFormat(navigator.language, {
      month: 'long',
      day: 'numeric',
    }).format(this.date)}`;
  }
}
