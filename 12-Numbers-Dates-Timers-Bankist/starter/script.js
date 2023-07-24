'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [
    200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300, 666, -333,
  ],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-05-27T17:01:17.194Z',
    '2023-07-09T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
    '2023-07-19T10:51:36.790Z',
    '2023-07-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const printDate = date => {
  const movDate = new Date(date);
  let msg = '';
  const timeSpanDays = Math.round(
    Math.abs((new Date() - movDate) / (1000 * 60 * 60 * 24))
  );
  if (timeSpanDays === 0) return 'today';
  if (timeSpanDays === 1) return 'yesterday';
  if (timeSpanDays <= 7) return `${timeSpanDays} days ago`;
  if (timeSpanDays > 7 && timeSpanDays <= 30)
    return `${Math.trunc(timeSpanDays / 7)} week${
      Math.trunc(timeSpanDays) < 14 ? '' : 's'
    } ago`;
  if (timeSpanDays > 30 && timeSpanDays <= 365)
    return `${Math.trunc(timeSpanDays / 30)} month ago`;
  if (timeSpanDays > 365) return `${Math.trunc(timeSpanDays / 365)} years ago`;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  const newIndex = movs.map(mov => acc.movements.indexOf(mov));
  const moveDatesSorted = newIndex.map(index => acc.movementsDates[index]);

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div> <div class="movements__date">${printDate(
      moveDatesSorted[i]
    )}</div>
        <div class="movements__value">${mov.toFixed(2)} €</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(2))} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

const now = new Date();
const day = String(now.getDate()).padStart(2, 0);
const month = String(now.getMonth() + 1).padStart(2, 0);
const year = now.getFullYear();
const time = now.toLocaleTimeString('de-DE', {
  hour: '2-digit',
  minute: '2-digit',
});
labelDate.textContent = `${day}/${month}/${year}, ${time}`;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    console.log(currentAccount.movementsDates);

    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

///// Converting and checking numbers

/* console.log(23 === 23.0); // All numbers are floating point numbers in js

// Base 10 - 0 to 9
// Binary base - 0 and 1
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// Conversion
console.log(Number('23'));
console.log(+'23'); // automatic type conversion with "+"

// Parsing
console.log(Number.parseInt('30px', 10)); // 30
console.log(Number.parseInt('e23', 10)); // NaN because letter comes first

console.log(Number.parseInt('2.5rem')); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5

// Checking if any value is NaN
console.log(Number.isNaN('22')); // false, type coercion
console.log(Number.isNaN(22)); // false
console.log(Number.isNaN(+'22X')); // true
console.log(Number.isNaN(23 / 0)); // false but actually infinity

// Infinity (best way of checking if a value is a number)
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(20 / 0)); // false

// Check integer (best method to check for integer)
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23.6)); // false
console.log(Number.isInteger('23')); // false */

///// Math and rounding

// Squareroot
/* console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // 2

// Max & min
console.log(Math.max(5, 18, '23', 11, 2)); // 23, does coercion
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN, ...but no parsing

console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Conastants
console.log(Math.PI); // 3.141592653589793
console.log(Math.PI * Number.parseFloat('10px') ** 2); // area of a circle

// Random
console.log(Math.trunc(Math.random() * 6) + 1); // THE typical dice until now

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(1, 6));
console.log(randomInt(33, 48));

// Rounding integers (all do coercion)
console.log(Math.trunc(23.3)); // 23, removes any decimal part

console.log(Math.round(23.7)); // 24, will round to the nearest integer
console.log(Math.round(23.3)); // 23

console.log(Math.ceil(23.7)); // 24, always rounds up
console.log(Math.ceil(23.3)); // 24

console.log(Math.floor(23.7)); // 23, always rounds down
console.log(Math.floor(23.3)); // 23

console.log(Math.trunc(-23.3)); // -23, just cutts of
console.log(Math.floor(-23.3)); // -24, really rounds down

// Rounding decimals
console.log((2.7).toFixed(0)); // "3", creates string!!!
console.log((2.7).toFixed(3)); // "2.700"
console.log((2.345).toFixed(2)); // "2.35"
console.log(+(2.345).toFixed(3)); // 2.345, converted back to number */

///// The remainder operator
/* console.log(5 % 2); // 1
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3); // 2

console.log(6 % 2); // 0, so it's an even number

// Check even
const isEven = n => n % 2 === 0;
console.log(isEven(98), isEven(77));

// Use for color movements
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 3 === 0) row.style.backgroundColor = 'purple';
  });
}); */

///// Numeric seperators
/* const diameter = 287_460_000_000; // for better view
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15; // possible but no sense
// const PI = 3._1415; // not allowed
// const PI = 3_.1415; // not allowed
// const PI = 3.1415_; // not allowed

console.log(Number('230000')); // 230000
console.log(Number(230_000)); // 230000
console.log(Number('230_000')); // NaN!!!
console.log(Number.parseInt('230_000')); // 230 */

///// BigInt
/* console.log(2 ** 53 - 1); // biggest number js can safely represent (64 bit - additional info)
console.log(Number.MAX_SAFE_INTEGER); // also stored in the Number object
console.log(2 ** 53 + 1); // is not correct, should be one more

console.log(5465498745613214987421313232148n); // "n" at the end produces bigInt
console.log(BigInt(5465498745613214987421313232148)); // as a method, but differs from above and shoul not be used for big Numbers
console.log(BigInt('5465498745613214987421313232148')); // as a string it works!

// Operations
console.log(10000n + 10000n);

const big = 654654689743231654465n;
const regular = 23;
// console.log(big * regular); // throws type error because not allowed to mix them
console.log(big * BigInt(regular));

console.log(regular == BigInt(regular)); // true, because coercion to regular number
console.log(regular === BigInt(regular)); // false
console.log(20n > 15); // true
console.log(typeof big, typeof regular); // bigint number
console.log(20n == '20'); // true

console.log(big + ' is really BIG!!!'); // 654654689743231654465 is really BIG!!!

// Math doesn't work
// console.log(Math.sqrt(big)); // type error

// Divisions
console.log(11n / 3n); // 3n, decimal part is cutted off */

/////////////////////////////
/////// Creating Dates (no Tinder)
// ChatGPT: https://chat.openai.com/share/9adf5b0c-1e9c-4d8c-8237-7af84e2e3094

/* const now = new Date();
console.log(now); // Sat Jul 22 2023 11:42:14 GMT+0200 (Mitteleuropäische Sommerzeit)

console.log(new Date('Decemeber 24, 2022')); // Sat Dec 24 2022 00:00:00 GMT+0100 (Mitteleuropäische Normalzeit)
console.log(new Date(account1.movementsDates[2])); // Tue Jan 28 2020 10:15:04 GMT+0100 (Mitteleuropäische Normalzeit)

console.log(new Date(2037, 10, 19, 15, 35, 5)); // Thu Nov 19 2037...BUT: returns November because January is 0!
console.log(new Date(2037, 10, 31)); // autocorrect to Dez 1

// Initial Unix time
console.log(new Date(0)); // Thu Jan 01 1970 01:00:00 GMT+0100
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days later, the TIMESTAMP in milliseconds (259_200_000)
 */
// Working with dates
/* const future = new Date(2037, 10, 19, 15, 35);
console.log(future);
console.log(future.getFullYear()); // 2023
console.log(future.getMonth()); // 10, for November
console.log(future.getDate()); // 19, the day
console.log(future.getDay()); // 4, 4th day of the week (0 = Sunday)
console.log(future.getHours()); // 15, hour
console.log(future.getMinutes()); // 35, minutes
console.log(future.getSeconds()); // 0, seconds
console.log(future.toISOString()); // 2037-11-19T14:35:00.000Z, international standard

console.log(future.getTime()); // 2_142_254_100_000, TIMESTAMP since initial unix time
// Use timestamp to create new date
console.log(new Date(2142254100000)); // Thu Nov 19 2037 15:35:00 GMT+010
console.log(Date.now()); // 1690022488205, the timestamp of right now in ms

// set methods (all work the same)
future.setFullYear(2035);
console.log(future); // Mon Nov 19 2035 15:35:00...
 */

///// Operations with dates
/* const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 17));
console.log(days1); // 3, days

const days2 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days2); // 10, days */
