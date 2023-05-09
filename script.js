"use strict";

//Variables selecting elements
const againBtn = document.querySelector(".again");
const checkBtn = document.querySelector(".check");
const randomNrPlaceholder = document.querySelector(".number");
const scoreFld = document.querySelector(".score");
const guessInput = document.querySelector(".guess");
const highscoreFld = document.querySelector(".highscore");
const statusMessage = document.querySelector(".message");
const numbersRangePar = document.querySelector('.between');

//Other variables
let mysteryNumber = Number;
const startingScore = '10';
const ranges = [1, 20];

//Setting starting number of points to 10
scoreFld.textContent = startingScore;

//Show set number ranges at the "between" paragraph
numbersRangePar.textContent = `Between ${ranges[0]} and ${ranges[1]}.`;

//Function to generate random number between ranges and return it
const genRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  mysteryNumber = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(mysteryNumber);
  return mysteryNumber;
};

//Generate random number (mysteryNumber) on loading the page
genRandomNumber(ranges[0], ranges[1]);

//On clicking Again
againBtn.addEventListener("click", () => {
  genRandomNumber(ranges[0], ranges[1]),
    (statusMessage.textContent = `Start guessing...!`),
    (guessInput.value = null),
    (randomNrPlaceholder.textContent = `?`);
  checkBtn.classList.toggle("turnedoff");
  againBtn.classList.toggle("turnedoff");
  guessInput.style.border = "4px solid #eee";
});

//On clicking Check
checkBtn.addEventListener("click", () => {
  const guessValue = Number(guessInput.value);
  // the number is correctly guessed
  if (guessValue == mysteryNumber) {
    statusMessage.textContent = `Bullseye!`;
    guessInput.style.border = "4px solid #60b347";
    randomNrPlaceholder.textContent = mysteryNumber;
    scoreFld.textContent = Number(scoreFld.textContent) + 4;
    Number(scoreFld.textContent) > Number(highscoreFld.textContent)
      ? (highscoreFld.textContent = Number(scoreFld.textContent))
      : (highscoreFld.textContent = Number(highscoreFld.textContent));
      checkBtn.classList.toggle("turnedoff");
      againBtn.classList.toggle("turnedoff");
  } 
  //no number is given in the input field
  else if (guessValue == "") {
    statusMessage.textContent = `Choose a number first!`;
    guessInput.style.border = "4px solid #cc2020";
  } 
  //missed the number; either too high or too low
  else {
    guessValue < mysteryNumber
      ? (statusMessage.textContent = `Nope, try higher.`)
      : (statusMessage.textContent = `Nope, try lower.`);
    Number(scoreFld.textContent) > 0
      ? (scoreFld.textContent = Number(scoreFld.textContent) - 1)
      : (scoreFld.textContent = Number(scoreFld.textContent));
  }
});
