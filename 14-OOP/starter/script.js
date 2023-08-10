'use strict';

//ANCHOR - 208. Constructor functions and the <new> operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create methods in constructor function!
  // Will cause performance issues when dealing with many instances of the object
  // this.calcAge = function () {
  // return new Date().getFullYear() - this.birthYear;
  // };
  // this.age = this.prototype.calcAge();
};

const futt = new Person('Futterhacker', 1986);
console.log(futt);

// 1. New {} (Obj) is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. constructor function automatically return {}

const mai = new Person('Mai', 1996);
console.log(mai, mai instanceof Person);

//ANCHOR - 209. Prototypes
console.log(Array.prototype);

Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this.birthYear;
};
console.log(mai.calcAge());

console.log(mai.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(mai)); // true
console.log(Array.prototype.isPrototypeOf([1, 2, 3])); // true
console.log(String.prototype.isPrototypeOf('No!')); // false, because it's primitive
const str = new String("I'm a sexy beast!");
console.log(String.prototype.isPrototypeOf(str)); // true, because now an object

Person.prototype.species = 'Homo Sapiens';
console.log(mai.species); // Homo Sapiens, but actually not "own" property
console.log(mai.hasOwnProperty('species')); // false
console.log(mai.hasOwnProperty('firstName')); // true
