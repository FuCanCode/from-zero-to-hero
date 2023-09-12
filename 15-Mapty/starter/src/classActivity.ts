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
  printTitleText(a: ActivityType): string;
}
export class Activity {
  id: number;
  type?: string;
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

  printTitleText(workoutType: ActivityType) {
    return `${
      workoutType === 'Running' ? '🏃‍♂️' : '🚴‍♀️'
    } ${workoutType} on ${Intl.DateTimeFormat(navigator.language, {
      month: 'long',
      day: 'numeric',
    }).format(this.date)}`;
  }
}
