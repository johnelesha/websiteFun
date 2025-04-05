const words = [
  "Hello", "Programming", "Code", "Javascript", "Town", "Country", "Testing", "Youtube", "Linkedin",
  "Twitter", "Github", "Leetcode", "Internet", "Python", "Scala", "Destructuring", "Paradigm", "Styling", "Cascade",
  "Documentation", "Coding", "Funny", "Working", "Dependencies", "Task", "Runner", "Roles", "Test", "Rust", "Playing"
];

const lvls = {
  "Easy": 10,
  "Normal": 8,
  "Hard": 5
};

function closeInstructions() {
  document.getElementById("instructions-popup").style.display = "none";
  document.getElementById("instructions-overlay").style.display = "none";
}

window.onload = function () {
  document.getElementById("instructions-popup").style.display = "block";
  document.getElementById("instructions-overlay").style.display = "block";
};

let defaultLevelName;
let defaultLevelSeconds;
let selectedLevel = false;

const startButton = document.querySelector(".start");
const lvlSelect = document.querySelector(".lvl");
const secondsSpan = document.querySelector(".seconds");
const timeLeftSpan = document.querySelector(".time span");
const theWord = document.querySelector(".the-word");
const input = document.querySelector(".input");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
const finishMessage = document.querySelector(".finish");
const upcomingWordsDiv = document.querySelector(".upcoming-words");
const popup = document.getElementById("popup");
const overlay = document.querySelector(".overlay");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");

lvlSelect.onchange = function () {
  selectedLevel = true;
  defaultLevelName = this.value;
  defaultLevelSeconds = lvls[defaultLevelName];
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
};

startButton.onclick = function () {
  if (!selectedLevel) {
    alert("Please select a level first!");
    return;
  }

  this.remove();
  input.focus();
  scoreTotal.innerHTML = words.length;
  startGame();
};

function startGame() {
  genWords();
}

function genWords() {
  if (words.length === 0) {
    showPopup("Congratulations!", "You completed all the words!");
    return;
  }

  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;

  updateUpcomingWords();
  startCountdown(defaultLevelSeconds);
}

function updateUpcomingWords() {
  upcomingWordsDiv.innerHTML = "";
  words.forEach(word => {
    let div = document.createElement("div");
    div.textContent = word;
    upcomingWordsDiv.appendChild(div);
  });
}

function startCountdown(seconds) {
  timeLeftSpan.innerHTML = seconds;

  let countdown = setInterval(() => {
    timeLeftSpan.innerHTML--;

    if (timeLeftSpan.innerHTML == 0) {
      clearInterval(countdown);

      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        genWords();
      } else {
        showPopup("Game Over", "You ran out of time!");
      }
    }
  }, 1000);
}

function showPopup(title, message) {
  popupTitle.innerHTML = title;
  popupMessage.innerHTML = message;
  popup.style.display = "block";
  overlay.style.display = "block";
}

function restartGame() {
  location.reload();
}