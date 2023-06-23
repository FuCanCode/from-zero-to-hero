'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 4}`]: {
    // Only to show that u can put anything in the [] which stand for computed expressions
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // Fnction with defaults that takes an object as ONE argument. !!!IMPORTANT!!!
  orderDelivery: function ({
    //syntax before ES6
    time = '20:00',
    address = 'Sternstr Dresden',
    starterIndex = 1,
    mainIndex = 0,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} at ${time} to ${address}`
    );
  },
  // ES6 syntax
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}. Enjoy!`);
  },
  // ES6 syntax
  orderPizza(mainIngredient, ...otherIngredients) {
    let pizzaInfinity = mainIngredient;
    for (let index = 0; index < otherIngredients.length; index++) {
      pizzaInfinity += ` and ${otherIngredients[index]}`;
    }
    console.log(`${pizzaInfinity}. Enjoy!`);
  },
};
///// Logical Assignment Operators
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'Alfredos',
  owner: 'Bernd',
};

///// for-of loop
/* const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// the "of" keyword tells js to loop over every single element
for (const item of menu) console.log(item);
// access index
for (const item of menu.entries()) {
  // creates for each element a new array with an index and a value
  console.log(`Number ${item[0] + 1} is ${item[1]}`);
}
console.log([...menu.entries()]);
for (const [index, dish] of menu.entries()) // better way: destructuring in the condition
  console.log(`${index + 1}: ${dish}`); */
////// Assignment operators
// OR assigment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish assigment operator
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// AND asignment operator
// rest1.owner = rest1.owner && 'Anonymous';
// rest2.owner = rest2.owner && 'Anonymous';

// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';
// console.log(rest1, rest2);

///// The Nullish Coalescing Operator (??)
/* restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Works with nullish values: null and undefined (NOT 0 or "")
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect); */

////// Short circuiting (|| and &&)
/* console.log('---OR---');
// result is not always a boolean, use and return any data type
// || returns the first truthy value
console.log(3 || 'Stefan');
console.log('' || 'Stefan');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 7;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---AND---');
// First "falsy" value will be returned
console.log(0 && 'Stefan');
// If all values truthy the last value will be returned
console.log(7 && true && 'Stefan');
console.log('hello' && 23 && null && 'stefan');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('Cheese', 'Bacon');
}
restaurant.orderPizza && restaurant.orderPizza('Cheese', 'Bacon'); */

/////// Rest pattern
// 1. Destructuring
// SPREAD because on RIGHT side of =
/* const arr = [1, 2, ...[3, 4]];

// REST because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
// Skipped elements, like pasta here, are not seen by the rest operator
const [fav1, , fav2, ...dontlike] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

// Rest in Objects
const { sat, ...restObj } = restaurant.openingHours;
console.log(restObj);

// 2. Functions
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return console.log(`Summe: ${sum}`);
};
add(2, 3);
add(5, 8, 6, 7);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('Käse!', 'Salami', 'ToSo', 'Teig?');
restaurant.orderPizza('Nur Käse ohne Pizza!'); */

////////  The Spread operator
/* const arr = [7, 8, 9];
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

// Use spread operator in functions
// const ings = ['tomato sauce', 'sausage', 'cheese'];
const ings = [
  prompt('Choose your first pasta ingredient!'),
  prompt('Choose your second pasta ingredient!'),
  prompt('Choose your third pasta ingredient!'),
];
restaurant.orderPasta(...ings);

// ... in Objects
const filiale = { ...restaurant, drinks: ['Cola', 'Fanta', 'Sprite'] };
console.log(filiale);
const restaurantCopy = { ...restaurant };
console.log(restaurantCopy);
restaurantCopy.name = 'Massimos';
console.log(restaurant.name, restaurantCopy.name); */

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
