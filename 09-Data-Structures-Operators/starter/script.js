'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // Fnction with defaults that takes an object as ONE argument. !!!IMPORTANT!!!
  orderDelivery: function ({
    time = '20:00',
    address = 'Sternstr Dresden',
    starterIndex = 1,
    mainIndex = 0,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} at ${time} to ${address}`
    );
  },
};
////////  The Spread operator
const arr = [7, 8, 9];
const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArray);

// Use spread operator ...
const goodNewArray = [1, 2, ...arr, 10];
console.log(goodNewArray);
console.log(...goodNewArray);

const newMenu = ['Borschtsch', ...restaurant.mainMenu];
console.log(...newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Merge Array
const mergedArray = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(...mergedArray);

const string = 'Irgendwas';
const letters = [...string, 'x', 'y'];
console.log(letters);

//////// Destructuring Objects
// Passing a whole object as ONE argument for a function. !!!IMPORTANT!!!
/* restaurant.orderDelivery({
  time: '22:30',
  address: 'hier. sofort',
  starterIndex: 2,
  mainIndex: 2,
});
restaurant.orderDelivery({
  mainIndex: 0,
});
// Object destructuring
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Give variables new names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

// With default values
const { menu = [], starterMenu: starters = 'Suppe' } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); // needs () because otherwise js would see it as an assigment to a code block wich is not possible
console.log(a, b);

// Nested Objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
 */
///////// ARRAYS
// "Classic" way of destructuring
/* const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log('Classic: ', a, b, c);
// ES6
const [x, y, z] = arr; // looks like array but is just the syntax for 3 new variables
console.log('ES6: ', x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
//Switching variables
[main, secondary] = [secondary, main];

// Receive 2 return values from a function and store immediately in two two different variables
const [myStarter, myMain] = restaurant.order(2, 0);

// Nested array
const nested = [2, 4, [5, 6]];
const [nest1, , [nest3, nest4]] = nested;
console.log(nest1, nest3, nest4);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); */
