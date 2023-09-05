export type ActivityType = 'running' | 'cycling';
export class Activity {
  id: number;
  date: Date;
  type: ActivityType;
  distance: number;
  duration: number;
  cadence?: number;
  elevGain?: number;
  coords: L.LatLng;

  constructor(
    type: ActivityType,
    coords: L.LatLng,
    dist: number,
    dur: number,
    cadOrElev: number
  ) {
    this.date = new Date();
    this.id = this.date.getTime();
    this.type = type;
    this.distance = dist;
    this.duration = dur;
    type === 'cycling'
      ? (this.elevGain = cadOrElev)
      : (this.cadence = cadOrElev);
    this.coords = coords;
  }

  get titleText() {
    return `${this.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${
      this.type[0].toUpperCase() + this.type.slice(1)
    } on ${Intl.DateTimeFormat(navigator.language, {
      month: 'long',
      day: 'numeric',
    }).format(this.date)}`;
  }
}
