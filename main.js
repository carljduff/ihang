const rootDiv = document.getElementById("root");
const keyboardDiv = document.getElementById("keyboard-container");
const wordDiv = document.getElementById("word-container");
const guessDiv = document.getElementById("guess-container");
let gameOverText = document.createElement("h1");
let letters = [];
let wordSpaces = [];
let chosenWord = "";
let guessCount = 0;
let gameOver = false;

for (let i = 65; i < 91; i++) {
  const button = document.createElement("button");
  button.dataset.id = i;
  button.innerText = String.fromCharCode(i);
  letters.push(button);
}

function chooseWord() {
  wordSpaces = []
  const chooseWordDiv = document.createElement("div");
  const inputLabel = document.createElement("h3");
  inputLabel.innerText = "Choose Word";
  chooseWordDiv.appendChild(inputLabel);
  const wordInput = document.createElement("input");
  chooseWordDiv.appendChild(wordInput);

  const chooseWordButton = document.createElement("button");
  chooseWordButton.innerText = "Submit";
  chooseWordDiv.appendChild(chooseWordButton);
  chooseWordButton.addEventListener("click", () =>
    handleChooseWordButton(wordInput, chooseWordDiv)
  );

  rootDiv.appendChild(chooseWordDiv);
}

function handleChooseWordButton(wordInput, chooseWordDiv) {
  chosenWord = wordInput.value;
  wordInput.value = "";
  rootDiv.removeChild(chooseWordDiv);
  mainGame();
}

function mainGame() {
  createWordBlocks();
    rootDiv.appendChild(keyboardDiv);
  keyboardDiv.innerHTML = "";
  let wordSpaceText = document.createElement("h1");

  wordSpaceText.innerText = wordSpaces.join(" ");

  rootDiv.appendChild(wordSpaceText);

  
  letters.forEach((button) => {
    button.disabled = false;
    button.style.backgroundColor = "";
    button.onclick = (e) => handleLetters(wordSpaceText, e);
    keyboardDiv.appendChild(button);
  });
}

function handleGuesses(wordSpaceText) {
  guessCount++;

  if (guessCount >= 7) {
    gameOver = true;

    gameOverText.innerText = "GAME OVER ---- The word you were guessing is: ";
    rootDiv.appendChild(gameOverText);
    updateBoard(wordSpaceText);
  }
}
function handleLetters(wordSpaceText, e) {
  handleGuesses(wordSpaceText);
  let text = e.target.innerText.toLowerCase();
  e.target.disabled = true;

  if (chosenWord.includes(text) == false) {
    e.target.style.backgroundColor = "red";
  } else {
    e.target.style.backgroundColor = "green";

    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] == text) {
        wordSpaces[i] = text;
      }
    }

    updateBoard(wordSpaceText);
  }
}

function createWordBlocks() {
  let wordBlock = " ____ ";
  for (let i = 0; i < chosenWord.length; i++) {
    wordSpaces.push(wordBlock);
  }
}

function updateBoard(wordSpaceText) {
  if (gameOver == true) {
    rootDiv.removeChild(wordSpaceText);
    wordSpaceText.innerText = chosenWord;
    rootDiv.appendChild(wordSpaceText);
    rootDiv.removeChild(keyboardDiv);
    let playAgainButton = document.createElement("button");
    playAgainButton.innerText = "Play Again?";
    playAgainButton.addEventListener("click", () =>
      playAgain(wordSpaceText, playAgainButton)
    );
    rootDiv.appendChild(playAgainButton);
  } else {
    rootDiv.removeChild(wordSpaceText);
    wordSpaceText.innerText = wordSpaces.join(" ");
    rootDiv.appendChild(wordSpaceText);
  }
}

function playAgain(wordSpaceText, playAgainButton) {
  rootDiv.removeChild(wordSpaceText);
  rootDiv.removeChild(playAgainButton);
  rootDiv.removeChild(gameOverText);

  gameOver = false;
  guessCount = 0;
  chosenWord = "";
  keyboardDiv.innerHTML = "";
  wordSpaces = [];

  letters.forEach((element) => {
    element.disabled = false;
    element.style.backgroundColor = "";
  });

  chooseWord();
}

// function spreadLetters(wordSpaceText) {
//     keyboardDiv.innerHTML = "";

//     letters.forEach((element) => {
//     keyboardDiv.appendChild(element);
//     element.addEventListener("click", (e) => handleLetters(wordSpaceText, e));
//   });
// }

chooseWord();
