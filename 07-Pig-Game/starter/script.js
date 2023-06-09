"use strict";

//  Grab all changing elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Global Variables
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// Dice Logic
btnRoll.addEventListener("click", function () {
  // Generating random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  // Display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;
  console.log(`Player ${activePlayer + 1} rolled a ${dice}!`);
  // Check for dice 1
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
    console.log(`Player ${activePlayer + 1}'s turn now!`);
  }
});

// Hold Button Action
btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  console.log("Score active: " + scores[activePlayer]);
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  if (scores[activePlayer] >= 100) alert(`Player ${activePlayer + 1} wins!`);
  activePlayer = activePlayer === 0 ? 1 : 0;
});
