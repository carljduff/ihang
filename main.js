const rootDiv = document.getElementById("root");
const keyboardDiv = document.getElementById("keyboard-container");
const wordDiv = document.getElementById("word-container");
const guessDiv = document.getElementById("guess-container");
const letters = [];
let wordSpaces = [];
let chosenWord = "";

for (let i = 65; i < 91; i++) {
  const button = document.createElement("button");
  button.dataset.id = i;
  button.innerText = String.fromCharCode(i);
  letters.push(button);
}

chooseWord();


function chooseWord() {
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

    let wordSpaceText = document.createElement("h1");
    
    wordSpaceText.innerText = wordSpaces.join(" ");

    rootDiv.appendChild(wordSpaceText);

    letters.forEach(element => {
        keyboardDiv.appendChild(element);
        element.addEventListener("click", (e) => handleLetters(wordSpaceText, e));

    });


}

function handleLetters(wordSpaceText, e) {
    let text = e.target.innerText.toLowerCase();
    e.target.disabled = true;

    if(chosenWord.includes(text) == false) {
        e.target.style.backgroundColor = "red";
    } else {

        let indexOfLetter = chosenWord.indexOf(text);
        e.target.style.backgroundColor = "green";
        // wordSpaces.splice(indexOfLetter, 1, text);
        

        for(let i = 0; i < chosenWord.length; i++) {
            if(chosenWord[i] == text) {
                wordSpaces.splice(i, 1, text);
            }
        }

        rootDiv.removeChild(wordSpaceText);
        wordSpaceText.innerText = wordSpaces.join(" ");
        rootDiv.appendChild(wordSpaceText);
    }
}

function createWordBlocks() {
  let wordBlock = " ____ ";
  for (let i = 0; i < chosenWord.length; i++) {
    wordSpaces.push(wordBlock);
  }

}

function updateBoard() {

}





