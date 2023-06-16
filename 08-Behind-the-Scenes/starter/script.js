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
if (!numProducts) deleteShoppingCart();

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
