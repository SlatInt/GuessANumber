"use strict";

//Variables selecting elements
const againBtn = document.querySelector(".again");
const checkBtn = document.querySelector(".check");
const numberBox = document.querySelector(".number");
const scoreFld = document.querySelector(".score");
const guessInput = document.querySelector(".guess");
const highscoreFld = document.querySelector(".highscore");
const statusMessage = document.querySelector(".message");
const numbersRangePar = document.querySelector(".between");

//Other variables
let mysteryNumber = Number;
const startingScore = 10;
const ranges = [1, 20];
const pointsUp = 4;
const pointsDown = -1;

//Setting starting number of points to 10
scoreFld.textContent = startingScore;

//Show set number ranges at the "between" paragraph
numbersRangePar.textContent = `Between ${ranges[0]} and ${ranges[1]}.`;

//Function to generate random number between ranges and return it
const genRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  mysteryNumber = Math.floor(Math.random() * (max - min + 1) + min);
  // console.log(mysteryNumber);
  return mysteryNumber;
};

//Value/style changing functions (F)
//F to toggle target button visibility
const toggleBtn = function (btnName) {
  btnName.classList.toggle("turnedoff");
};

//F changing input border colors
const colorBorders = function (newColor) {
  guessInput.style.border = `4px solid ${newColor}`;
};

//F change text content of "mystery number box"
const modNumberBox = function (boxTxt) {
  numberBox.textContent = boxTxt;
};

//F changing text content of .message
const modMessage = function (message) {
  statusMessage.textContent = message;
};

//Fs modifying the score
const modScore = function (points) {
  scoreFld.textContent = Number(scoreFld.textContent) + points;
};
//F checking: update the highscore if score has higher value
const highscoreUpdate = function () {
  if (Number(scoreFld.textContent) > Number(highscoreFld.textContent)) {
    highscoreFld.textContent = Number(scoreFld.textContent);
  }
};

//Generate random number (mysteryNumber) on loading the page
genRandomNumber(ranges[0], ranges[1]);

//On clicking Again
againBtn.addEventListener("click", () => {
  genRandomNumber(ranges[0], ranges[1]),
    modMessage(`Start guessing...!`),
    (guessInput.value = null),
    modNumberBox(`?`);
  toggleBtn(checkBtn);
  toggleBtn(againBtn);
  colorBorders("#eee");
});

//On clicking Check
checkBtn.addEventListener("click", () => {
  colorBorders("#eee");
  const guessValue = guessInput.value;
  // the number is correctly guessed
  if (guessValue == mysteryNumber) {
    modMessage(`Bullseye!`);
    colorBorders("#60b347");
    modNumberBox(`${mysteryNumber}`);
    modScore(pointsUp);
    highscoreUpdate();
    toggleBtn(checkBtn);
    toggleBtn(againBtn);
  }
  //no number is given in the input field
  else if (guessValue == "") {
    modMessage(`Choose a number first!`);
    colorBorders("#cc2020");
  }
  //missed the number; either too high or too low
  else {
    if (guessValue < mysteryNumber) {
      modMessage(`Nope, try higher.`);
    } else {
      modMessage(`Nope, try lower.`);
    }
    Number(scoreFld.textContent) > 0
      ? modScore(pointsDown)
      : (modMessage(`Oops, you're out of points! Take 10.`),
        modScore(startingScore));
  }
});
