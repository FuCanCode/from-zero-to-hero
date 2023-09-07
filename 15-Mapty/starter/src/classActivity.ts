export type ActivityType = 'running' | 'cycling';

export interface ActivityShape {
  id: number;
  date: Date;
  coords: L.LatLng;
  type: string;
  distance: number;
  duration: number;
  cadence?: number;
  pace?: number;
  elevationGain?: number;
  averageSpeed?: number;
  titleText: string;
}
export class Activity {
  id: number;
  date: Date;
  coords: L.LatLng;
  distance: number;
  duration: number;

  constructor(coords: L.LatLng, distance: number, duration: number) {
    this.date = new Date();
    this.id = this.date.getTime();
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  // get titleText() {
  //   return `${this.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${
  //     this.type[0].toUpperCase() + this.type.slice(1)
  //   } on ${Intl.DateTimeFormat(navigator.language, {
  //     month: 'long',
  //     day: 'numeric',
  //   }).format(this.date)}`;
  // }
}
