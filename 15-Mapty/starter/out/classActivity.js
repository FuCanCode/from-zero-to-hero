export class Activity {
    constructor(coords, distance, duration) {
        this.date = new Date();
        this.id = this.date.getTime();
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}
