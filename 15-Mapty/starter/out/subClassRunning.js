import { Activity } from './classActivity.js';
export default class Running extends Activity {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.type = 'Running';
        this.cadence = cadence;
        this.pace = duration / distance;
        this.heading = `🏃‍♂️ ${this.type} ${this.printTitleDate()}`;
    }
}
