'use strict';

///// Index and slice
/*const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[2]);
console.log('B737'[2]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log('B737'.lastIndexOf('7'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 10)); // stops extracting BEFORE 10
console.log(airline.slice(0, airline.indexOf(' '))); // First word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Last word

console.log(airline.slice(-3)); // will start extracting from last three indexes
console.log(airline.slice(1, -1));

function getSeatArea(seat) {
  const area =
    'BE'.indexOf(seat.slice(-1)) !== -1 ? 'middle' : 'window or aisle';
  console.log(`You've got a ${area} seat.`);
}
getSeatArea('11A'); */

///// Cases
/* console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'sTeFAn';
const passengerLower = passenger.toLowerCase();
const passengerFixed =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerFixed);

const fixName = function (unfixed) {
  return (
    unfixed.toLowerCase()[0].toUpperCase() + unfixed.toLowerCase().slice(1)
  );
};
console.log(fixName('sIGurD'));

// Comparing emails
const email = 'fufu@code.it';
const loginEmail = ' FuFu@Code.iT \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail === email);

const normalizedEmail = loginEmail.trim().toLowerCase(); // Chaining methods
console.log(normalizedEmail);

// Replace
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'Dear passengers please go to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); // Replace all by using RegExp with "g"
// console.log(announcement.replaceAll('door', 'gate')); // NEW method

// Bool
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('neo'));
console.log(plane2.startsWith('Boeing'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo'))
  console.log('Part of the NEW Airbus family');

// Practice exercise
const checkBaggage = function (items) {
  items = items.toLowerCase();
  items.includes('bomb') || items.includes('knife')
    ? console.log('Freeze and go to the ground!')
    : console.log('Enjoy your flight!');
};
checkBaggage('I have a bomb, food, socks and shit');
checkBaggage('I have  a pillow and some snacks.');
checkBaggage('I have a some sex toys and a knife.'); */

// Slit and join
console.log('a+very+nice+string'.split('+')); // will create an array
console.log('Stefan Foodslaughter'.split(' '));

const [firstName, lastName] = 'Stefan Foodslaughter'.split(' ');
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

// Practice
const cpaitalize = function (fullName) {
  const array = fullName.split(' ');
  const newArray = [];
  for (let e of array) {
    e = e[0].toUpperCase() + e.slice(1);
    newArray.push(e); // Could be integrated in the lline above
  }
  return newArray.join(' ');
};

const passenger = 'jessica ann smith davies';
const passengerCap = cpaitalize(passenger);
console.log(passengerCap);
