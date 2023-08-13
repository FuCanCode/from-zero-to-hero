'use strict';

//ANCHOR - 208. Constructor functions and the <new> operator
/* const Person = function (firstName, birthYear) {
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
console.log(mai, mai instanceof Person); */

//ANCHOR - 209. Prototypes
/* console.log(Array.prototype);

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
console.log(mai.hasOwnProperty('firstName')); // true */

//ANCHOR - 211. Prototypal Inheritance on Built-In Objects
// console.log(mai.__proto__); // === Constructor.prtotype
// console.log(mai.__proto__.__proto__); // == Object.prototype
// console.log(mai.__proto__.__proto__.__proto__); // == null, end of chain

// console.dir(Person.prototype.constructor);

/* const arr = [2, 5, 11, 98, 7, 11];
console.log(arr.__proto__); // === Array.prototype

Array.prototype.gt10 = function gt10() {
  return this.filter(e => e > 10);
};
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.gt10());
console.log(arr.unique());
console.log(arr.gt10().unique());

const h1 = document.querySelector('h1');
console.dir(h1); // Chain up: HTMLHeadingElement << HTMLElement << Element << Node << EventTarget << Object

console.dir(x => x + 1);
 */

//ANCHOR - 213. ES6 Classes
// class expression
const PersonClExp = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  greet() {
    return console.log(`Hi ${this.firstName}`);
  }

  get age() {
    return this.calcAge();
  }

  get firstName() {
    return this._fullName.split(' ')[0];
  }

  // Set a property that already exists
  // will override fullName with _fullName
  set fullName(name) {
    // underscore to avoid conflict with constructor property
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1999);
console.log(jessica);
console.log(jessica.calcAge());
console.log(jessica.age);
// jessica.fullName = 'Bärbel'; // Throws alert msg from setter
console.log(jessica);
console.log(jessica.__proto__ === PersonCl.prototype); // true

jessica.greet();

// PersonCl.prototype.greet = function () {
//   console.log('Hi ' + this.firstName);
// };

// 1. Classes are not hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

//ANCHOR - 214. Setters anbd getters

const account = {
  owner: 'Futti',
  movements: [200, 150, 960, 20],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);

account.latest = 200;
console.log(account.movements);
// other setter and getters in the Person class above
