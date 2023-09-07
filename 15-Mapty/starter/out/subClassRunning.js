import { Activity } from './classActivity.js';
export default class Running extends Activity {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.type = 'Running';
        this.date = new Date();
        this.id = this.date.getTime();
        this.cadence = cadence;
        this.pace = duration / distance;
    }
    get titleText() {
        return `🏃‍♂️ ${this.type} on ${Intl.DateTimeFormat(navigator.language, {
            month: 'long',
            day: 'numeric',
        }).format(this.date)}`;
    }
}
