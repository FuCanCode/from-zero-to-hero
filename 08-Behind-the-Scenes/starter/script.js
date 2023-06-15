'use strict';

function calcAge(birthYear) {
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
calcAge(1986);
