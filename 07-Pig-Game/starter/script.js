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
let currentScore, activePlayer, scores, playing;

// Global function
// Game initialisation
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  diceEl.classList.add("hidden");
  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  score0El.textContent = "0";
  score1El.textContent = "0";
  current0El.textContent = 0;
  current1El.textContent = 0;
};

// Change player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Starting condition
init();

// Dice Logic
btnRoll.addEventListener("click", function () {
  if (playing) {
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
      switchPlayer();
      console.log(`Player ${activePlayer + 1}'s turn now!`);
    }
  }
});

// Hold Button Action
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log("Score active: " + scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // Finish the Game
    if (scores[activePlayer] >= 10) {
      // alert(`Player ${activePlayer + 1} wins!`);
      document.querySelector(".player--active").classList.add("player--winner");
      playing = false;
      btnHold.classList.add("hidden");
      btnRoll.classList.add("hidden");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

// New GAme Button Action
// btnNew.addEventListener("click", location.reload(true));
btnNew.addEventListener("click", init);
