"use strict";

//  Grab all changing elements
let scoreOne = document.getElementById("score--0");
let scoreTwo = document.getElementById("score--1");

let currentOne = document.getElementById("current--0");
let currentTwo = document.getElementById("current--1");

let imgDice = document.querySelector(".dice");
console.log(imgDice.attributes);

const btnDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

const newGame = function () {
  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  imgDice.classList.add("hidden");
};

// newGame();

btnNew.addEventListener("click", newGame);

//  Dice logic
const diceRoll = function () {
  const diceValue = Math.trunc(Math.random() * 6) + 1;
  console.log(diceValue);
  imgDice.src = `dice-${diceValue}.png`;
  console.log(scoreOne.value);
  return diceValue;
};

btnDice.addEventListener("click", diceRoll);
