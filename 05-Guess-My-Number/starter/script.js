"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
// document.querySelector(".number").textContent = secretNumber;
let message = "";
let score = 20;
let highscore = 0;
const lose = function () {
  message = "🙉 You Lose!";
  document.querySelector("body").style.backgroundColor = "red";
  score = 0;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    message = "⛔ No number";
  } else if (guess === secretNumber) {
    message = "🥳 Correct number!";
    document.querySelector("body").style.backgroundColor = "rgb(33, 185, 53)";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".number").style.width = "30rem";
    if (score > highscore) highscore = score;
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;
      message = guess > secretNumber ? "📈 Too High!" : "📉 Too Low!";
    } else {
      lose();
    }
  }
  document.querySelector(".message").textContent = message;
  document.querySelector(".score").textContent = score;
  document.querySelector(".highscore").textContent = highscore;
});

document.querySelector(".again").addEventListener("click", function () {
  document.querySelector("body").style.backgroundColor = "#222";
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = null;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".message").textContent = "Start guessing...";
});

/* const secretNumber = Math.floor(Math.random() * 20) + 1;
console.log(secretNumber);
let guessResult = "";
const checkGuess = function () {
  let guess = Number(document.querySelector(".guess").value);
  console.log(guess);
  if (guess > secretNumber) {
    guessResult = "Too high";
  } else if (guess < secretNumber) {
    guessResult = "Too low";
  } else {
    guessResult = "Correct";
  }
  console.log(guessResult);
  document.querySelector(".message").textContent = guessResult;
}; */
