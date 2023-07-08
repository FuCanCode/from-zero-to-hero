'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
 */
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE (No mutation)
console.log(arr.slice(1, 3));
console.log(arr.slice(-2));
console.log(arr.slice(1, -1));
console.log(arr.slice()); // Shallow Copy
console.log([...arr]); // Shallow Copy

// SPLICE (MUTATES!!!)
arr.splice(-1); //works like slice but also mutates original Array
console.log(arr);
arr.splice(1, 2); // from position "1", delete "2" entries (b&c)
console.log(arr);
arr.splice(1, 0, 'b', 'c'); // from postion "1", delete "0", add "b" and "c"
console.log(arr);

// REVERSE (MUTATES!!!)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
// arr.splice(arr.length, 0, ...arr2.reverse()); // Only my test
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - ')); */

///// The new at method
/* const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// get last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('Foodslaughter'.at(-3)); */

///// forEach
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// old way
for (const [i, move] of movements.entries()) {
  let word = '';
  move >= 0 ? (word = 'deposited') : (word = 'withdrew');
  // console.log(`You ${word} ${Math.abs(move)}$.`);
}

// new possibility
movements.forEach(function (move, nr, array) {
  // param1 in the callbckfn === current element of the array
  // param2 in the callbckfn === current index of the array
  // param3 in the callbckfn === entire array
  let word = '';
  move >= 0 ? (word = 'deposited') : (word = 'withdrew');
  console.log(`${nr + 1}: You ${word} ${Math.abs(move)}$.`);
  // console.log(array.at(nr));
}); */

///// forEach on maps & sets

// Map
/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
console.log(currencies.keys());

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// key is exactly the same as the value
currenciesUnique.forEach((value, key, set) => console.log(`${key}: ${value}`)); */
