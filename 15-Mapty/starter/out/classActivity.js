export class Activity {
    constructor(coords, distance, duration) {
        this.id = crypto.randomUUID();
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
