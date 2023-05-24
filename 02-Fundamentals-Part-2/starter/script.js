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


const calcAge2 = function (birthYear) {
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
console.log(`Noch ${getRetirement} Jahre bis zu Rente! 🧓`);