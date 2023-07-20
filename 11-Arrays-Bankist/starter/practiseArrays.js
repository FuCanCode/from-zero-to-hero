'use strict';

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

///// 1. Task: Get the sum of all deposits
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, dep) => acc + dep, 0);

console.log(
  `Sum of all deposits: %c${bankDepositSum} EuroDollar`,
  'color: green'
);

///// 2. Count deposits with at least 1000
const depGT1000 = accounts
  .flatMap(acc => acc.movements)
  //   .filter(dep => dep >= 1000)
  .reduce(function (count, mov) {
    if (mov >= 1000) return ++count;
    else return count;
  }, 0);

console.log(
  `Number of deposits greater than 1000: %c${depGT1000}`,
  'color: green'
);

///// 3. create new Object that contains sum of deposits and withdrawals
const sumsObj = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sumsObj);

///// 4. Convert to title case (first letter capitalized with exceptions like "a", "the"...)
const exmpl = 'the stupid cat jumps over a dumb dog';
const exmpl2 = 'another BIG sentence WiTh A bad WOrding';
const exceptions = ['in', 'the', 'a', 'on', 'and', 'is', 'with'];

const convertTitlecase = function (sentence) {
  // divide sentence
  const arr = sentence.split(' ');
  // capitalize first letter with a condition
  return arr.reduce((sentence, word) => {
    return exceptions.includes(word)
      ? (sentence += ' ' + word)
      : (sentence += ' ' + word[0].toUpperCase() + word.slice(1));
  }, '');
};

console.log(convertTitlecase(exmpl));

const convertTitlecase2 = function (sentence = 'placeholder') {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  return capitalize(
    sentence
      .toLowerCase()
      .split(' ')
      .map(word =>
        exceptions.includes(word) ? word.toLowerCase() : capitalize(word)
      )
      .join(' ')
  );
};

console.log(convertTitlecase2(exmpl));
console.log(convertTitlecase2(exmpl2));
