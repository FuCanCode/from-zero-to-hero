export type ActivityType = 'Running' | 'Cycling';
export interface ActivityShape {
  id: string;
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
  __proto__?: any;
}
export class Activity {
  id: string = crypto.randomUUID();
  date: Date;
  coords: L.LatLng;
  distance: number;
  duration: number;
  clicks: number;

  constructor(coords: L.LatLng, distance: number, duration: number) {
    this.date = new Date();
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
