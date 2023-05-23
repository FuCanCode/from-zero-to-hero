/* let js = "amazing";
console.log(54 - 231 + 656 - 8);

console.log("Stefan");
console.log(36);

let firstName = "Stefan";
console.log(firstName);

let randomNumber1 = 6555985.2332185556;
let randomNumber2 = 3;

console.log(typeof randomNumber1);
console.log(typeof randomNumber2);

const currentYear = 2023;
const ageMe = currentYear - 1986;
const ageAny = currentYear - 1954;
console.log(ageMe, ageAny);

console.log(ageMe * 2, ageMe / 3, 2 ** 8);
// 2 ** 8 bedeudet 2 hoch 8

let x = 12 + 8;
x += 5; // x = x + 5
console.log(x);

// Showing operator precedence. Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
let y, z;
y = z = 5 + 8 + 9;
console.log(y, z);

let averageAge = ageMe + ageAny / 2;
console.log(averageAge);
averageAge = (ageMe + ageAny) / 2; // Klammern haben die höchste precedence
console.log(averageAge);*/

/* const firstName = "Stefan";
const job = "nice Guy";
const birthyear = 1986;
const year = 2023;

const stefan = "I'm " + firstName + ", a " + (year - birthyear) + " years old " + job;
console.log(stefan);

const stefanNew = `I'm ${firstName}, a ${year - birthyear} years old ${job}.`
console.log(stefanNew);

console.log(`Normaler Text funktioniert auch in Backticks`);

console.log(`Text
über
drei Zeilen geht nur mit Backticks`); */

// const age = 15;

// if (age >= 18) {
//     console.log("You can start driving license 🚗");
// } else {
//     const yearsLeft = 18 - age;
//     console.log(`You are too young. Wait another ${yearsLeft} years.`);
// }

// const birthYear = 2005;
// let century;
// if (birthYear <= 2000) {
//     century = 20;
// } else {
//     century = 21;
// }
// console.log(century);


/* const inputYear = "1991";
console.log(Number(inputYear) + 18);
console.log(typeof inputYear);

const money = 0;
if (money) {
    console.log("Don't spend it all ;)");
} else {
    console.log("You should get a job");
} */


/* const favorite = prompt("What's your favorite number?");
if (favorite == 11) console.log(`Coole Nummer! (lose)`); // geht
if (favorite === 11) console.log(`Coole Nummer! (strikt)`) //geht nicht, weil prompt() string zurück gibt
// also Eingabe gleich umwandeln const favorite = Number(prompt("What's your favorite number?")) */


/* const hasDriverLicense = true;
const hasGoodVision = true;

console.log(hasDriverLicense && hasGoodVision);
console.log(hasDriverLicense || hasGoodVision);
console.log(!hasDriverLicense); */

// if (hasDriverLicense && hasGoodVision) {
//     console.log("Able to drive");
// } else {
//     console.log("Please don't drive!");
// }

/* const isTired = false;

if (hasDriverLicense && hasGoodVision && !isTired) {
    console.log("Able to drive");
} else {
    console.log("Please don't drive!");
} */

/* const day = "sunday";

switch (day) {
    case "monday": // day === "monday"
        console.log("Plan course structure");
        console.log("Go to coding meetup");
        break;
    case "tuesday":
        console.log("Prepare theory videos");
        break;
    case "wednesday":
    case "thursday":
        console.log("Write code examples"); // Ausgabe für beide Werte drüber
        break;
    case "friday":
        console.log("Record videos");
        break;
    case "saturday":
    case "sunday":
        console.log("Enjoy the weekend :D");
        break;
    default:
        console.log("Not a valid day"); // quasi else Statement
}

if (day === "monday") {
    console.log("Plan course structure");
    console.log("Go to coding meetup");
} else if (day === "tuesday") {
    console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
    console.log("Write code examples");
} else if (day === "friday") {
    console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
    console.log("Enjoy the weekend :D");
} else {
    console.log("Not a valid day!");
} */


const age = 15;
const drink = age >= 18 ? "wine 🍷" : "water 💧";
console.log(drink);

console.log(`I like to drink ${age >= 18 ? "wine 🍷" : "water 💧"}`);
