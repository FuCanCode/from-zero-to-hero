export class Activity {
    constructor(coords, distance, duration) {
        this.date = new Date();
        this.id = this.date.getTime();
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
    printTitleText(workoutType) {
        return `${workoutType === 'Running' ? '🏃‍♂️' : '🚴‍♀️'} ${workoutType} on ${Intl.DateTimeFormat(navigator.language, {
            month: 'long',
            day: 'numeric',
        }).format(this.date)}`;
    }
}
