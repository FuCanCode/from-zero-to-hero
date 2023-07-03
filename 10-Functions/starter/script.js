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

const flight = 'LH123'; // primitive
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
console.log(stefan);
