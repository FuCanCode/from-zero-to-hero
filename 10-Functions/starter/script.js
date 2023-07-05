'use strict';

///// Default parameters
/* const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //numPassengers = numPassengers || 1; // before ES6
  //price = price || 199; // before ES6

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  bookings.push(booking);
  console.log(booking);
};

createBooking('LH123');
createBooking('TR345', 2, 800);
createBooking('MH370', 5);

createBooking('DS452', undefined, 1000); */ // CAN'T skip values, use undefined instead

///// Value vs. Reference

/* const flight = 'LH123'; // primitive
const stefan = {
  // reference type
  name: 'Stefan Foodslaughter',
  passport: 'CCHJKYV89',
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH199';
  passenger.name = 'Mr. ' + passenger.name;

  passenger.passport === 'CCHJKYV89'
    ? console.log('Check in')
    : console.log('Wrong passport');

  console.log(`${passenger.name} checked in for flight ${flightNum}`);
};

checkIn(flight, stefan);
console.log(flight); // original value did NOT change
console.log(stefan); // original value DID change

const newPassport = function (person) {
  person.passport = String(Math.trunc(Math.random() * 1000000000000000));
};

newPassport(stefan);
checkIn(flight, stefan);
console.log(stefan); */

///// Functions accepting callback functions
/* const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}-function`);
};

const string = 'my test string';
transformer(string, oneWord);
transformer(string, upperFirstWord);

const high5 = function () {
  console.log('🖐️');
};
document.body.addEventListener('click', high5);

['Stefan', 'Dennis', 'Fist'].forEach(high5); */

///// Functions returning functions
/* const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('You');

greet('Hello')('Me'); // First part is equal to the returned function which can be immediately be called

// As an arrow function
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2('Arrow')('hitted'); */

///// The call and apply methods
/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console
      .log
      // `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      ();
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(778, 'Waldemar');
lufthansa.book(666, 'Gevatter Tod');
// console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // make a copy of the object method to create a global function

// The call() method
book.call(lufthansa, 654, 'Olaf Schubert');
// console.log(lufthansa.bookings);

book.call(eurowings, 333, 'Mai Porn');
// console.log(eurowings.bookings);

// The apply() method
const flightData = [225, 'Jack Nicholson'];
book.apply(eurowings, flightData);
// console.log(eurowings.bookings);

// Best practice: call() method with spread operator
book.call(lufthansa, ...flightData);
// console.log(lufthansa.bookings);

///// The bind() method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
bookEW(404, 'Captain Lost');
// console.log(eurowings.bookings);

// creating "presets" for functions with the bind() method
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Tina Turner');
// console.log(eurowings.bookings);

// With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

console.log(lufthansa);
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // bind() needed, otherwise "this" pointing to the caller of the function (the Button)

// Partial application (preset parameters)
const addTax = (rate, value) => value + (value * rate) / 100;
console.log(addTax(10, 200));

const addVAT23 = addTax.bind(null, 23); // it's a convention to use "null" if we don't care about "this"
console.log(addVAT23(300));

// Challenge returning function
const taxUs = value => rate => console.log(value + (value * rate) / 100); // my solution
taxUs(100)(15);

const addTaxRate = function (rate) {
  return function (value) {
    return value + (value * rate) / 100;
  };
};
const addVAT = addTaxRate(45);
console.log(addVAT(100));
console.log(addVAT(88));
console.log(addTaxRate(19)(200)); */

///// Immadiately Invoked function expression (IIFE)
/* const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate); // Cannot be accessed because stored in function scope

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 24;
}
// console.log(isPrivate); // Cannot be accessed because stored in block scope
console.log(notPrivate); */

///// Closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers.`);
  };
};

secureBooking()();
secureBooking()();
secureBooking()(); // passengerCount is always set to zero when called

const booker = secureBooking();

booker();
booker();
booker(); //passengerCount keeps incrementing

console.dir(booker);
