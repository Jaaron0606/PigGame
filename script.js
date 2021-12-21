'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player0Score = document.querySelector('#score--0');
const player1Score = document.querySelector('#score--1');
const dieElement = document.querySelector('.dice');
const btnrollDie = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0CurrentScore = document.querySelector('#current--0');
const player1CurrentScore = document.querySelector('#current--1');
var diceroll;
let playing = true;

// Setting starting values
const startingValue = function () {
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  player1CurrentScore.textContent = 0;
  player0CurrentScore.textContent = 0;
};
startingValue();

dieElement.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Adding event listener to for Die roll
btnrollDie.addEventListener('click', function () {
  if (playing) {
    // Get a random dice roll
    diceroll = Math.trunc(Math.random() * 6) + 1;

    //Show dice
    dieElement.classList.remove('hidden');
    dieElement.src = `dice-${diceroll}.png`;

    // Check if the number 1 is rolled
    if (diceroll !== 1) {
      currentScore += diceroll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Holding on dice roll
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // cleck if score is at 100 and assign winner
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dieElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//Adding New game logic

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  dieElement.classList.add('hidden');
  startingValue();
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
});
