'use strict';

//ANCHOR - 208. Constructor functions and the <new> operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create methods in constructor function!
  // Will cause performance issues when dealing with many instances of the object
  this.calcAge = function () {
    return new Date().getFullYear() - this.birthYear;
  };
  this.age = this.calcAge();
};

const futt = new Person('Futterhacker', 1986);
console.log(futt);

// 1. New {} (Obj) is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. constructor function automatically return {}

const mai = new Person('Mai', 1996);
console.log(mai, mai instanceof Person);
console.log(mai.calcAge());
