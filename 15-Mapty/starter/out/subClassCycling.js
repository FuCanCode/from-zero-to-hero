import { Activity } from './classActivity.js';
export default class Cycling extends Activity {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.type = 'Cycling';
        this.elevationGain = elevationGain;
        this.averageSpeed = distance / (duration / 60);
        this.heading = `🚴‍♀️ ${this.type} ${this.printTitleDate()}`;
        console.log(this);
    }
}
