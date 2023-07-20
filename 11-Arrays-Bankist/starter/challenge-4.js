'use strict';

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

/* 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg) */
console.log('----- 1. -----');

dogs.forEach(dog => {
  dog.recFood = +(dog.weight ** 0.75 * 28).toFixed(2);
});
console.log(...dogs);

/* 2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) */
console.log('----- 2. -----');

const dogSarah = dogs.find(dog => dog.owners.some(owner => owner === 'Sarah')); // or .includes("Sarah")
let evalMsg = '';
if (dogSarah.curFood < dogSarah.recFood * 0.9) {
  evalMsg = 'too lttile';
} else if (dogSarah.curFood > dogSarah.recFood * 1.1) {
  evalMsg = 'too much';
} else msg = 'not too much and not too little';
console.log(`Sarah's dog eats ${evalMsg} food.`);

/*  3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle'). */
console.log('----- 3. -----');
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood * 1.1)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood * 0.9)
  .flatMap(dog => dog.owners);

/* 4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!" */
console.log('----- 4. -----');

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

/* 5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false) */
console.log('----- 5. -----');

console.log(
  `Any dog eating exactly the recommended portion? ${dogs.some(
    dog => dog.curFood === dog.recFood
  )}`
);

/* 6. Log to the console whether there is any dog eating an okay amount of food
(just true or false) */
console.log('----- 6. -----');

const checkEating = dog =>
  dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1;
console.log(
  `Any dog that eats an okay amount of food? ${dogs.some(checkEating)}`
);

/* 7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.) */
console.log('----- 7. -----');

const okayFood = dogs.filter(checkEating);
console.log(...okayFood);

/* 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉) */
console.log('----- 8. -----');

const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(...dogsCopy);
