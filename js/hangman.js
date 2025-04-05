const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};
const startButton = document.getElementById("start-game");
const categorySelect = document.getElementById("category-select");
const startScreen = document.querySelector(".start-screen");
const gameContainer = document.querySelector(".container");
const categorySpan = document.querySelector(".game-info .category span");

let selectedCategory = "";
let randomValueValue = "";
let wrongAttempts = 0;
startButton.addEventListener("click", () => {
  selectedCategory = categorySelect.value;
  categorySpan.textContent = selectedCategory;

  const wordsArray = words[selectedCategory];
  randomValueValue = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  startScreen.style.display = "none";
  gameContainer.style.display = "block";

  initializeGame(randomValueValue);
});

function initializeGame(word) {

  wrongAttempts = 0;
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const lettersArray = Array.from(letters);
  const lettersContainer = document.querySelector(".letters");
  lettersContainer.innerHTML = "";

  lettersArray.forEach((letter) => {
    const span = document.createElement("span");
    span.className = "letter-box";
    span.textContent = letter;
    lettersContainer.appendChild(span);
  });


  const lettersGuessContainer = document.querySelector(".letters-guess");
  lettersGuessContainer.innerHTML = "";
  const lettersAndSpace = Array.from(word);

  lettersAndSpace.forEach((letter) => {
    const span = document.createElement("span");
    if (letter === " ") {
      span.className = "with-space";
    }
    lettersGuessContainer.appendChild(span);
  });


  setupLetterClicks(word);
}


function setupLetterClicks(word) {
  const guessSpans = document.querySelectorAll(".letters-guess span");
  const lettersContainer = document.querySelector(".letters");
  const theDraw = document.querySelector(".hangman-draw");

  document.addEventListener("click", letterClickHandler);

  function letterClickHandler(e) {
    if (e.target.className === "letter-box") {
      e.target.classList.add("clicked");
      const theClickedLetter = e.target.textContent.toLowerCase();
      const theChosenWord = Array.from(word.toLowerCase());

      let theStatus = false;

      theChosenWord.forEach((wordLetter, WordIndex) => {
        if (theClickedLetter === wordLetter) {
          theStatus = true;
          guessSpans.forEach((span, spanIndex) => {
            if (WordIndex === spanIndex) {
              span.textContent = theClickedLetter;
            }
          });
        }
      });

      if (!theStatus) {
        wrongAttempts++;
        document.getElementById("fail").play();
        theDraw.classList.add(`wrong-${wrongAttempts}`);

        if (wrongAttempts === 8) {
          endGame(word, false);
          lettersContainer.classList.add("finished");
        }
      } else {
        document.getElementById("success").play();
      }


      const allFilled = Array.from(guessSpans).every(span => span.textContent !== '');
      if (allFilled) {
        endGame(word, true);
      }
    }
  }
}

function endGame(word, isWin) {
  const popup = document.querySelector(".popup");
  const emoji = popup.querySelector(".emoji");


  if (isWin) {
    emoji.textContent = "😂";
    emoji.classList.remove("emoji-sad");
    emoji.classList.add("emoji-happy");
    popup.querySelector(".message").textContent = "Congrats!";
    popup.querySelector(".word").innerHTML = `You found the word: <strong>${word}</strong>`;
  } else {
    emoji.textContent = "😢";
    emoji.classList.remove("emoji-happy");
    emoji.classList.add("emoji-sad");
    popup.querySelector(".message").textContent = "Game Over";
    popup.querySelector(".word").innerHTML = `The correct word was: <strong>${word}</strong>`;
  }

  popup.style.display = "block";
  const lettersContainer = document.querySelector(".letters");
  lettersContainer.classList.add("finished");

  document.removeEventListener("click", letterClickHandler);

}
function resetGame() {

  const popup = document.querySelector(".popup");
  popup.style.display = "none";
}