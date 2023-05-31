// Remember, we're gonna use strict mode in all scripts now!
"use strict";
const temps = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// Task nach temperatur min und max suchen, dabei "error" aussortieren

// Subtask 1: Strings heraus filtern und in neues array schreiben

const filterTemps = function (array) {
  const newTempArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const isNumber = typeof element === "number";
    if (isNumber) {
      newTempArray.push(element);
    }
  }
  return newTempArray;
};
const tempsFiltered = filterTemps(temps);
console.log(tempsFiltered);

const getAmpl = function (array) {
  const min = Math.min(...array);
  const max = Math.max(...array);
  const ampl = max - min;
  console.log(`Min: ${min} Max: ${max} Amplitude: ${ampl}`);
  return ampl;
};
console.log(getAmpl(tempsFiltered));
