import { Activity } from './classActivity';
export class Running extends Activity {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.type = 'Running';
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
