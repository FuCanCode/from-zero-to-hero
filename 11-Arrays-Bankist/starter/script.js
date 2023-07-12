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

const displayMovements = function (movments) {
  containerMovements.innerHTML = '';
  movments.forEach(function (mov, i) {
    const type = mov >= 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} €</div>
      </div>`;
    //containerMovements.innerHTML += html; // My solution (works :))
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${balance} €`;
};
// calcPrintBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const sumIn = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const sumOut = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = movements
    .filter(mov => mov > 0)
    .map(dep => dep * 0.012)
    .filter(interest => interest >= 1)
    .reduce((acc, interest, i, arr) => acc + interest, 0);

  labelSumIn.textContent = `${sumIn} €`;
  labelSumOut.textContent = `${sumOut} €`;
  labelSumInterest.textContent = `${interest} €`;
};
// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernames(accounts);

// Event handler
let currentAcc;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    console.log('Login successful!');
    containerApp.style.opacity = '100';
    labelWelcome.textContent = `Hello ${currentAcc.owner.split(' ')[0]}! 📈`;
    displayMovements(currentAcc.movements);
    calcPrintBalance(currentAcc.movements);
    calcDisplaySummary(currentAcc.movements);
  } else alert('Wrong user or pin!');
  console.log(
    inputLoginUsername.value,
    Number(inputLoginPin.value),
    currentAcc
  );
});

// console.log(containerMovements.innerHTML);
// console.log(containerMovements.textContent);

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

///// The map() method

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
// returns new array
const dollar = movements.map(euro => euro * eurToUsd);
console.log(dollar);

// compared to for of loop
const dollar2 = [];
for (const mov of movements) {
  dollar2.push(mov * eurToUsd);
}
console.log(dollar2);

// Practice
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}.`
);
console.log(movementsDescriptions); */

///// The filter() method

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(e => {
  return e > 0;
});
console.log(deposits);

// compared to for-of
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// practice
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); */

/// The reduce() method
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const balance = movements.reduce((acc, cur, i, arr) => {
  console.log(`Iteration: ${i} Accumulator: ${acc} Current value: ${cur}`);
  return acc + cur;
}, 0); // accumulator = snowball eating values
console.log(balance);

// compared to for-of
let sum = 0;
for (const mov of movements) {
  sum += mov;
}
console.log(sum);

// Maximum value
const maxValue = movements.reduce((max, curr) => (curr < max ? max : curr), 0);
console.log(maxValue); */

///// Chaining methods
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// get deposits, convert to USD, add them all up
const sumDeposits = movements
  .filter(dep => dep > 0)
  .map((dep, i, arr) => {
    // console.log(arr); // to check the result of the previous method!
    return Math.round(dep * 1.1);
  })
  .reduce((acc, dep) => acc + dep, 0);

console.log(sumDeposits); */

///// The find() method
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdraw = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdraw);

const jess = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(jess);

// for-of comparison & practise
let jonas = {};

for (const acc of accounts) {
  console.log(acc.owner);
  if (acc.owner === 'Jonas Schmedtmann') {
    jonas = acc;
    break;
  }
}
console.log(jonas); */
