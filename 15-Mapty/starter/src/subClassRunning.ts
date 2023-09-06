import { Activity } from './classActivity';

export class Running extends Activity {
  readonly id: number;
  date: Date;
  type: string = 'Running';
  pace: number;

  constructor(
    coords: L.LatLng,
    distance: number,
    duration: number,
    private cadence: number
  ) {
    super(coords, distance, duration);
    this.date = new Date();
    this.id = this.date.getTime();
    this.cadence = cadence;
    this.pace = this.duration / this.distance;
  }

  get titleText() {
    return `🏃‍♂️ ${this.type} on ${Intl.DateTimeFormat(navigator.language, {
      month: 'long',
      day: 'numeric',
    }).format(this.date)}`;
  }
}
