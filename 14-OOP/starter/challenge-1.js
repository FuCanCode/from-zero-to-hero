'use strict';

/* Coding Challenge #1 
Your tasks: 

1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
'speed' property. The 'speed' property is the current speed of the car in 
km/h 

2. Implement an 'accelerate' method that will increase the car's speed by 10, 
and log the new speed to the console 

3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
the new speed to the console 

4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
'brake' multiple times on each of them 

Test data: 
§ Data car 1: 'BMW' going at 120 km/h 
§ Data car 2: 'Mercedes' going at 95 km/h */

// 1.
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2.
Car.prototype.accelrate = function () {
  this.speed += 10;
  console.log(
    `Smashing the gas pedal fires that ${this.make} to ${this.speed} km/h!`
  );
  return this;
};

// 3.
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`Slow down that ${this.make} to ${this.speed} km/h.`);
  return this;
};

// 4.
const beamer = new Car('BMW', 120);
const mezzie = new Car('Mercedes', 95);

beamer.accelrate().accelrate().brake().accelrate().accelrate();

mezzie.brake().brake().brake().accelrate().accelrate();

console.log(beamer, mezzie);

// Bonus stolen from another User
const MyLib = function () {};
MyLib.prototype.randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const lib = new MyLib();

Car.prototype.drive = function (min, max) {
  const actions = lib.randInt(min, max);

  for (let i = 0; i <= actions; i++) {
    lib.randInt(0, 1) ? this.accelrate() : this.brake();
  }
};
mezzie.drive(5, 9);
