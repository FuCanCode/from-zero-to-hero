"use strict";
/* Your tasks:

1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class

2. Make the 'charge' property private

3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!

Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23% */
class Car {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelrate() {
        this.speed += 20;
    }
    brake() {
        this.speed -= 5;
        return this;
    }
    get speedUS() {
        return this.speed / 1.6;
    }
}
// 1.
class ECar extends Car {
    constructor(make, speed, charge) {
        super(make, speed);
        this.charge = charge;
    }
    accelrate() {
        this.speed += 20;
        this.charge--;
        return this;
    }
    chargeBattery(chargeTo) {
        this.charge = chargeTo;
        return this;
    }
}
const rivian = new ECar('Rivian', 120, 23);
console.log(rivian);
rivian
    .chargeBattery(40)
    .accelrate()
    .accelrate()
    .accelrate()
    .brake()
    .chargeBattery(45);
console.log(rivian, rivian.speedUS);
