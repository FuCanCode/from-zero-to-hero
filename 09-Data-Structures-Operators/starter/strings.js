'use strict';

const airline = 'TAP Air Portugal';
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
getSeatArea('11A');
