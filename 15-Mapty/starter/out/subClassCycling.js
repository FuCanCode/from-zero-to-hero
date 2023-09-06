import { Activity } from './classActivity';
export class Cycling extends Activity {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.type = 'Cycling';
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
