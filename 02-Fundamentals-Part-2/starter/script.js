"use strict"; // aktiviert den strict mode

/* let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true; //Bug eingebaut zur Demonstration
if (hasDriversLicense) console.log("I can drive");

const interface = "Audio"; // "interface" ist einreserviertes Wort
const private = 566; */


/* function logger() {
    console.log("My name is Stefan");
}

logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`
    return juice;
}

const appleJuice = fruitProcessor(5, 0); // Ohne Speichern in Variable gibt Konsole nur "5 0" aus
console.log(appleJuice);
// console.log(fruitProcessor(5, 0)); // Alternativ Funktion gleich in die Ausgabe, ohne Speichern

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);
 */


/* function calcAge1(birthYear) {
    return 2037 - birthYear;
}

const age1 = calcAge1(1986);

const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

const age2 = calcAge2(1986);

console.log(age1, age2); */


/* const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1986);
console.log(age3);

const yearsUntilRetirement = birthYear => {
    const age = 2023 - birthYear;
    const retirement = 65 - age;
    return retirement;
}
const getRetirement = yearsUntilRetirement(1986);
console.log(`Noch ${getRetirement} Jahre bis zu Rente! 🧓`); */


/* const calcAge = function (birthYear) {
    return 2023 - birthYear;
}

const yearsUntilRetirement = function (birthYear) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;
    if (retirement > 0) {
        return retirement;
    } else {

    }
    return retirement;
} */


/* const friends = ["Wurst", "Dennis", "Atze"];
// const years = new Array(1991, 1984, 2008, 2020);

console.log(friends);

// Das letzte Element anzeigen
console.log(friends[friends.length - 1]);

const firstName = "Stefan";
const stefan = [firstName, "Futterschneider", 2037 - 1986, "nice guy", friends];
console.log(stefan);

// Exercise
const calcAge = function (birthYear) {
    return 2023 - birthYear;
}
const years = [1990, 1967, 2002, 2010, 2018];
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages); */


/* const friends = ["Wurst", "Dennis", "Atze"];
friends.push("Andi");
console.log(friends);

friends.unshift("Fist");

console.log(friends.pop(), friends);

console.log(friends.indexOf("Dennis"));
console.log(friends);

console.log(friends.includes("Dennis")); */


/* const stefan = {
    firstName: "Stefan",
    lastName: "Futterschneider",
    age: 2023 - 1986,
    job: "nice guy",
    friends: ["Wurst", "Dennis", "Atze"]
};

console.log(stefan);

console.log(stefan.lastName);
console.log(stefan["lastName"]);

const nameKey = "Name";
console.log(stefan["first" + nameKey]);
console.log(stefan["last" + nameKey]);

const getCurious = prompt("What do you want to know about me?");
if (getCurious) {
    console.log(stefan[getCurious]);
} else {
    console.log("Stupid input");
}

stefan.location = "Deutschland";
stefan["email"] = "fustef@mail.de"
console.log(stefan);

console.log(`${stefan.firstName} has ${stefan.friends.length} friends, and his best friend is ${stefan.friends[0]}.`); */


/* const stefan = {
    firstName: "Stefan",
    lastName: "Futterschneider",
    birthYear: 1986,
    job: "nice guy",
    friends: ["Wurst", "Dennis", "Atze"],
    hasDriversLicense: true,
    calcAge: function () {
        this.age = 2023 - this.birthYear;
        return this.age;
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()} old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} drivers license.`;
    }
};

console.log(stefan.calcAge());
// console.log(stefan["calcAge"](1986));
console.log(stefan.age);
console.log(stefan.getSummary());
 */


// for loop keeps running while condition is TRUE
/* for (let i = 1; i <= 10; i++) {
    console.log(`Lifting weights repetition ${i} 🏋️‍♀️`);
} */


/* const stefanArray = [
    "Stefan",
    "Futterschneider",
    2023 - 1986,
    "nice guy",
    ["Wurst", "Dennis", "Atze"],
    true
];
const types = [];

for (let i = 0; i < stefanArray.length; i++) {
    console.log(stefanArray[i], typeof stefanArray[i]);
    // types[i] = typeof stefanArray[i];
    types.push(typeof stefanArray[i]);
}
console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];
for (let i = 0; i < years.length; i++) {
    ages.push(2023 - years[i]);
}
console.log(ages);


for (let i = 0; i < stefanArray.length; i++) {
    if (typeof stefanArray[i] !== "string") continue;
    else {
        console.log(stefanArray[i], typeof stefanArray[i]);
    }
};

for (let i = 0; i < stefanArray.length; i++) {
    if (typeof stefanArray[i] === "number") break;
    else {
        console.log(stefanArray[i], typeof stefanArray[i]);
    }
}; */


/* const stefanArray = [
    "Stefan",
    "Futterschneider",
    2023 - 1986,
    "nice guy",
    ["Wurst", "Dennis", "Atze"],
    true
];

for (let i = stefanArray.length - 1; i >= 0; i--) {
    console.log(stefanArray[i]);
}

const exerc = ["Liegestütze", "Military Press", "Enge Liegestütze", "Seestern"];
for (let i = 0; i < exerc.length; i++) {
    for (let rep = 1; rep <= 5; rep++) {
        console.log(`${exerc[i]} number ${rep}.`);
    }
}


let rep = 1;
while (rep <= 10) {
    console.log(`Exercise repetition ${rep}.`);
    rep++;
} */

let dice;
let counter = 0;
while (dice !== 6) {
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(`${dice} gewürfelt.`);
    counter++;
    if (dice === 6) console.log(`Versuche: ${counter}.`);
}
