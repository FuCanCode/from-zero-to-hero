export type ActivityType = 'Running' | 'Cycling';
export interface ActivityShape {
  id: number;
  date: Date;
  coords: L.LatLng;
  type: ActivityType;
  distance: number;
  duration: number;
  cadence?: number;
  pace?: number;
  elevationGain?: number;
  averageSpeed?: number;
  heading: string;
}
export class Activity {
  id: number;
  type?: string;
  date: Date;
  coords: L.LatLng;
  distance: number;
  duration: number;
  clicks: number;

  constructor(coords: L.LatLng, distance: number, duration: number) {
    this.date = new Date();
    this.id = this.date.getTime();
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
    this.clicks = 0;
  }

  printTitleDate() {
    return ` on ${Intl.DateTimeFormat(navigator.language, {
      month: 'long',
      day: 'numeric',
    }).format(this.date)}`;
  }

  click() {
    this.clicks++;
    console.log(this.clicks);
  }
}

// '🏃‍♂️' : '🚴‍♀️'
