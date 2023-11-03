"use strict";

//Buttons
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

//Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");

//States
let activePlayer = 0;
let currentScore = 0;
let score0 = 0;
let score1 = 0;
let finished = false;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  score0 = 0;
  score1 = 0;
  score0El.textContent = score0;
  score1El.textContent = score1;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.remove("name");
  player1El.classList.remove("name;");
  diceEl.classList.add("hidden");
  finished = false;
};

init();

//Event listeners
btnRoll.addEventListener("click", function () {
  if (!finished) {
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `./images/dice-${randomDiceNumber}.png`;
    if (randomDiceNumber !== 1) {
      diceEl.classList.remove("hidden");
      currentScore += randomDiceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
    }
  }
});

btnHold.addEventListener("click", function () {
  if (!finished) {
    if (activePlayer === 0) {
      score0 += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent = score0;
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = 1;
    } else {
      score1 += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent = score1;
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = 0;
    }
    if (score0 >= 40 || score1 >= 40) {
      const winner = score0 > score1 ? 0 : 1;
      document.querySelector(`.player--${winner}`).classList.add("name");
      document
        .querySelector(`.player--${winner}`)
        .classList.add("player--winner");
      finished = true;
    }
  }
});

btnNew.addEventListener("click", init);
