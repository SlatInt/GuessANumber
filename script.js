"use strict";

//Fetching elements with classes
const againBtn = document.querySelector(".again");
const checkBtn = document.querySelector(".check");
const randomNrPlaceholder = document.querySelector(".number");
const scoreFld = document.querySelector(".score");
const guessInput = document.querySelector(".guess");
const highscoreFld = document.querySelector(".highscore");
const statusMessage = document.querySelector(".message");

//Other variables
let mysteryNumber = Number;
const ranges = [1, 20];

//Generate random number between ranges
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
});

//On clicking Check
checkBtn.addEventListener("click", () => {
  const guessValue = Number(guessInput.value);
  guessInput.style.border = "4px solid #eee";
  if (guessValue == mysteryNumber) {
    statusMessage.textContent = `Bullseye!`;
    randomNrPlaceholder.textContent = mysteryNumber;
    scoreFld.textContent = Number(scoreFld.textContent) + 2;
    Number(scoreFld.textContent) > Number(highscoreFld.textContent)
      ? (highscoreFld.textContent = Number(scoreFld.textContent))
      : (highscoreFld.textContent = Number(highscoreFld.textContent));
      checkBtn.classList.toggle("turnedoff");
      againBtn.classList.toggle("turnedoff");
  } else if (guessValue == "") {
    statusMessage.textContent = `Choose a number first!`;
    guessInput.style.border = "4px solid #cc2020";
  } else {
    guessValue < mysteryNumber
      ? (statusMessage.textContent = `Nope, try higher.`)
      : (statusMessage.textContent = `Nope, try lower.`);
    Number(scoreFld.textContent) > 0
      ? (scoreFld.textContent = Number(scoreFld.textContent) - 1)
      : (scoreFld.textContent = Number(scoreFld.textContent));
  }
});
