'use strict';

// About scoping
/* function calcAge(birthYear) {
  const age = 2023 - birthYear;
  function printAge() {
    let output = `${firstName} is ${age}, born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = 'Ronny'; // To show that scope chain looks for the variable locally before go up to global scope
      const millenial = `Oh, you are an millenial, ${firstName}!`;
      var isMillenial = true;
      console.log(millenial);

      function add(a, b) {
        return a + b;
      }
      output = 'NEW OUTPUT!';
    }
    // console.log(millenial); // To show that the block-scoped CONST is NOT available
    console.log(isMillenial); // To show that the block-scoped VAR IS available
    // console.log(add(5, 3)); // To show that the block-scoped FUNCTION is NOT available
    console.log(output);
  }
  printAge();
  return age;
}

const firstName = 'Stefan';
calcAge(1986); */

// Hoisting and TDZ
// Variables
/* console.log(me);
console.log(job);
console.log(year);

var me = 'Stefan';
let job = 'honk';
const year = 1986; */

// Functons
/* console.log(addDecl(3, 6));
console.log(addExpr(5, 4));
console.log(addArrow(8, 9));

function addDecl(a, b) {
  return a + b;
}

var addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b; */

// Example
/* if (!numProducts) deleteShoppingCart();

var numProducts = 10;
function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // proof that var exist in the window object without being used
console.log(x === window.y); // proof that let doesn't exist in the window object without being used
console.log(x === window.z); // proof that const doesn't exist in the window object without being used
 */

// The this keyword

// console.log(this);

/* const calcAge = function (birthYear) {
  console.log(2023 - birthYear);
  console.log(this); // Undefined in strict mode, otherwise the window object
};
calcAge(1986); */

/* const calcAgeArrow = birthYear => {
  console.log(2023 - birthYear);
  console.log(this); // no own this, uses parent context
};
calcAgeArrow(1986); */

/* const stefan = {
  year: 1986,
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year);
  },
  job: 'Nichtsnutz',
};
stefan.calcAge();

const emma = {
  year: 1988,
};
emma.calcAge = stefan.calcAge; // You can copy methods because functions are just values
emma.calcAge();

const f = stefan.calcAge;
f(); // Undefined because there is no object this keyword can reference to */

// Regular functions vs. Arrow functions
/* const stefan = {
  firstName: 'Stefan',
  year: 1986,
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year); */

/* const isMillenial = function () {
      if (this.year >= 1981 && this.year <= 1991)
        console.log(`${this.firstName} is a millenial`);
    }; */

// Solution 1
/* const self = this; // this object assigned to variable to can be assessed in the next context
    const isMillenial = function () {
      if (self.year >= 1981 && self.year <= 1991)
        console.log(`${self.firstName} is a millenial`);
    };
    isMillenial(); */ // Regular function calls have this keyword always undefined

// Solution 2
/*  const isMillenial = () => {
      if (this.year >= 1981 && this.year <= 1991)
        console.log(`${this.firstName} is a millenial`);
    };
    isMillenial();
  },
  job: 'Nichtsnutz',
  greet: () => console.log(`Hey ${this.firstName}`), // Will use global object for this
};
stefan.greet();
stefan.calcAge();

// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
console.log(addExpr(5, 4));

var addArrow = (a, b) => {
  // Arrow function does not have arguments keyword
  console.log(arguments);
  return a + b;
};
addArrow(7, 8); */

// Primitives and Objects
/* let age = 37;
let oldAge = age;
age = 38;
console.log(age, oldAge);

const me = {
  name: 'Stefan',
  age: 37,
};

const you = me;
you.age = 40;
you.name = 'Dennis';
console.log('You: ', you);
console.log('Me: ', me); */

// Primitive types
let lastName = 'Mai';
let oldLastName = lastName;
lastName = 'Futterschneider';
console.log(lastName, oldLastName);

// reference types
const molle = {
  firstName: 'Marlen',
  lastName: 'Schaller',
  age: 34,
};
const marriedMolle = molle;
marriedMolle.lastName = 'Bigoni';
console.log('before marriage: ', molle);
console.log('after marriage: ', marriedMolle);

// Copying objects
const molle2 = {
  firstName: 'Marlen',
  lastName: 'Schaller',
  age: 34,
  family: ['Berns', 'Petra', 'Klaus'],
};

const molle2Copy = Object.assign({}, molle2);
molle2Copy.lastName = 'Bigoni';
molle2Copy.family.push('Patzer'); // New value will be also created in the original, because the array is a nested object within an object and therefore has its own HEAP-ID
console.log(molle2, molle2Copy);
