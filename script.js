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
const modalRules = document.querySelector(".modal");
const modalOverlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".close-modal");
const modalOpen = document.querySelector(".show-modal");

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
  console.log(mysteryNumber);
  return mysteryNumber;
};

//Value/style changing functions (F)
//Show or hide element (working for modal or btn)
const toggleHidden = function (elemName) {
  elemName.classList.toggle("hidden");
};

//F changing input border colors
const bordersRecolor = function (elemName, newColor) {
  elemName.style.border = `4px solid ${newColor}`;
};

//F changing input border colors
const backgroundRecolor = function (elemName, newColor) {
  elemName.style.backgroundColor = `${newColor}`;
};

//F changing input border colors
const fontRecolor = function (elemName, newColor) {
  elemName.style.color = `${newColor}`;
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
  bordersRecolor(guessInput, "#eee");
  backgroundRecolor(numberBox, "#eee");
  fontRecolor(numberBox, "#222");
  toggleHidden(checkBtn);
  toggleHidden(againBtn);
});

//On clicking Check
checkBtn.addEventListener("click", () => {
  bordersRecolor(guessInput, "#eee");
  const guessValue = guessInput.value;
  // the number is correctly guessed
  if (guessValue == mysteryNumber) {
    modMessage(`Bullseye!`);
    bordersRecolor(guessInput, "#60b347");
    fontRecolor(numberBox, "#eee");
    modNumberBox(`${mysteryNumber}`);
    modScore(pointsUp);
    highscoreUpdate();
    backgroundRecolor(numberBox, "#60b347");
    toggleHidden(checkBtn);
    toggleHidden(againBtn);
  }
  //no number is given in the input field
  else if (guessValue == "") {
    modMessage(`Choose a number first!`);
    bordersRecolor(guessInput, "#cc2020");
  }
  //missed the number; either too high or too low
  else {
    backgroundRecolor(numberBox, "#cc2020");
    fontRecolor(numberBox, "#eee");
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

//Show or hide modal with rules of the game
modalOpen.addEventListener("click", function () {
  toggleHidden(modalRules);
  toggleHidden(modalOverlay);
});
modalClose.addEventListener("click", function () {
  toggleHidden(modalRules);
  toggleHidden(modalOverlay);
});
modalOverlay.addEventListener("click", function () {
  toggleHidden(modalRules);
  toggleHidden(modalOverlay);
});

//Document wide events
//Hide modal on esc clicked
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (
      !modalRules.classList.contains("hidden") &&
      !modalOverlay.classList.contains("hidden")
    ) {
      toggleHidden(modalRules);
      toggleHidden(modalOverlay);
    }
  }
});

//If enter is down, run check click event
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    if (
      guessInput === document.activeElement &&
      !checkBtn.classList.contains("hidden")
    ) {
      checkBtn.click();
    } else if (
      guessInput === document.activeElement &&
      checkBtn.classList.contains("hidden")
    ) {
      againBtn.click();
    }
  }
});
