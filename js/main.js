/*----- constants -----*/
//* wordList.js

/*----- state variables -----*/
let targetWord; 
let maxWords = 6; 
let inputCount = 5;

// * cached variables while game is ongoing:
let letter; 
let guessedWord = [];

//* players curr guess position:
let row = 0;
let col = 0; 

//* boolean to know if game is ongoing/ over
let gameOver = false;



/*----- cached elements  -----*/
const container = document.querySelector('.container');
const answer = document.getElementById('answer');
const winScreen = document.getElementById('win-screen');
const resetBtn = document.getElementById('reset-btn')
const title = document.getElementById('win-title')

/*----- event listeners -----*/
document.addEventListener('keydown', handleKeyPress)

/*----- event handlers -----*/
function handleKeyPress(evt) {
    if (gameOver) return;

    if (evt.key.match(/^[a-zA-Z]$/)) {
        pressedKey(evt.key);
        return;
    } 
    else if (evt.key === 'Backspace') {
        deleteKey();
    } 
    else if (evt.key === 'Enter') {
        if (col < inputCount) {
            return;
        }    
        if (col === inputCount) {
            submitGuess();
        }
    }

    if (row == maxWords) {
        gameOver = true;
        // populate answer at the bottom
        answer.textContent = targetWord;
        resetWindow();
    }
}
/*----- Handler Functions -----*/
function deleteKey() {
    if (col > 0) {
        col--;
        fillBox(row, col, '')
    }
}

function pressedKey(letter) {
    if (col < inputCount) {
        fillBox(row, col, letter);
        col++;
    }
}

function submitGuess() {
    createWordArray();

    guessedWord = guessedWord.join('');
    if (!WORD_LIST.includes(guessedWord)) {
        return;
    }
    if (WORD_LIST.includes(guessedWord)) {
    }
    
    checkWord();
    row++;
    col = 0;
}

function createWordArray() {
    guessedWord = [];
    for (let i = 0; i < inputCount; i++) {
        const boxId = `#box${row}-${i}`;
        const currBox = document.querySelector(boxId);
        let letter = currBox.textContent;

        guessedWord.push(letter);
    }
    return guessedWord;
}


/*----- functions -----*/
init();

function init() {
    winScreen.style.visibility = 'hidden';
    container.innerHTML = '';
    gameOver = false;
    row = 0;
    col = 0;

    selectWord();
    render();
};


function render() {
    createGrid(container);

};

function selectWord() {
    const wordIdx = Math.floor(Math.random() * WORD_LIST.length);
    targetWord = WORD_LIST[wordIdx];
}


function createBox(container, row, col, letter) {
    letter = '';
    const box = document.createElement('div');

    box.className = 'box';
    box.id = `box${row}-${col}`
    box.textContent = letter;
    container.appendChild(box);
}

function createGrid(container) {
    for (let r = 0; r < maxWords; r++){
        for (let c = 0; c < inputCount; c++) {
            createBox(container, r, c);
        }
    }
}

function fillBox(row, col, letter) {
    const boxId = `#box${row}-${col}`;
    const box = document.querySelector(boxId);
    if (box) {
        box.textContent = letter;
    }
}

function checkWord() {
    for (let i = 0; i < inputCount; i++) {
        const boxId = `#box${row}-${i}`;
        const currBox = document.querySelector(boxId);
        let letter = guessedWord[i]

        if (targetWord[i] === letter) {
            currBox.classList.add('right');
        }
        else if (targetWord.includes(letter)) {
            currBox.classList.add('maybe');
        }
        else {
            currBox.classList.add('wrong');
        }
    }

    if (guessedWord === targetWord) {
        gameOver = true;
        resetWindow();
    }
}

function resetWindow() {
    winScreen.style.visibility = 'visible';
    targetWord = targetWord.toUpperCase();
    if (row === maxWords) {
        title.textContent = `Sorry😿The word was ${targetWord} `
    } else {
        title.textContent = "🥳🎉You're Correct!🎉🥳";
    }
    resetBtn.textContent = 'Play Again';
    resetBtn.addEventListener('click', init);
}

