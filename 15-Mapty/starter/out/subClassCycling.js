import { Activity } from './classActivity.js';
export default class Cycling extends Activity {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.type = 'Cycling';
        this.date = new Date();
        this.id = this.date.getTime();
        this.elevationGain = elevationGain;
        this.averageSpeed = distance / duration;
    }
    get titleText() {
        return `🚴‍♀️ ${this.type} on ${Intl.DateTimeFormat(navigator.language, {
            month: 'long',
            day: 'numeric',
        }).format(this.date)}`;
    }
}
