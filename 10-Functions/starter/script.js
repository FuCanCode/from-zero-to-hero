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
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('You');

greet('Hello')('Me'); // First part is equal to the returned function which can be immediately be called

// As an arrow function
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2('Arrow')('hitted');
