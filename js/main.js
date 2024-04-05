/*----- constants -----*/
//* wordList.js

/*----- state variables -----*/
let targetWord; // holds random word from array
let maxWords = 6; // row/height/ number of words that can be guessed: 6 
let inputCount = 5 // col/width/ length of word/ number of letters that can be guessed: 5

// * cached variables while game is ongoing:
let letter; // cached letters that were inputted
let guessedWord = [];

//* players curr guess position:
let row = 0; // height / word attempt number
let col = 0; // width / length of word but INDICIES

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
//* add event listener for play again button and call render()

/*----- event handlers -----*/
function handleKeyPress(evt) {
    if (gameOver) return;
    // check if it's a letter
    if (evt.key.match(/^[a-zA-Z]$/)) {
        pressedKey(evt.key);
        return;
    }
    // handle delete
    else if (evt.key === 'Backspace') {
        //call function to delete input
        deleteKey();
    }
    // handle enter
    else if (evt.key === 'Enter') {
        // call function to submit guess
        // if the columns are filled then call submitGuess
        if (col < inputCount) {
            console.log('Word is not long enough')
            return;
        }    
        if (col === inputCount) {
            submitGuess();
        }
    }
    // end the game
    // if all rows have been submitted then play again
    if (row == maxWords) {
        gameOver = true;
        // populate answer at the bottom
        answer.textContent = targetWord;
        resetWindow();
    }
}
/*----- Handler Functions -----*/
function deleteKey() {
    // check if there are letters in curr col
    if (col > 0) {
        // decremenent col idx to move backwards
        col--;
        // clear the content of that col
        fillBox(row, col, '')
    }
}

function pressedKey(letter){
    // check if the # of typed letters is less than 5
    if (col < inputCount) {
        fillBox(row, col, letter);
        // increment col index
        col++;
    }
}

function submitGuess() {
    createWordArray();
    console.log('word array: ', guessedWord)

    guessedWord = guessedWord.join('');
    console.log(`checking if guessed word is in WORD_LIST`);
    if (!WORD_LIST.includes(guessedWord)) {
        console.log('guessed word does not exist in WORD_LIST');
        return;
    }
    if (WORD_LIST.includes(guessedWord)) {
        console.log('VALID WORD')
    }
    
    checkWord();
    // console.log('submitGuess(): ',guessedWord)
    // increment to the next row & start at col[0]
    row++;
    col = 0;
}

function createWordArray(){
     // create the word using this for loop
    // iterate over each letter in current word: row,col
    guessedWord = [];
    for (let i = 0; i < inputCount; i++) {
        // get the content of the current box
        // grab the box id of row/col (curr index)
        const boxId = `#box${row}-${i}`;
        const currBox = document.querySelector(boxId);

        let letter = currBox.textContent;
        guessedWord.push(letter);
        // creating a string from the array
    }
    return guessedWord;
}


/*----- functions -----*/
init();

// Initialize all state variables, then call render()
function init(){
    console.log('Initializing game...')
    winScreen.style.visibility = 'hidden';
    container.innerHTML = '';
    gameOver = false;
    row = 0;
    col = 0;

    selectWord();
    render();
};


function render(){
    // create grid in the container 
    createGrid(container);
    // createBox(container);

};

// choose random word from array 
function selectWord(){
    // select a random index of the WORD_LIST
    const wordIdx = Math.floor(Math.random() * WORD_LIST.length);
    targetWord = WORD_LIST[wordIdx];
    console.log('Target Word:',targetWord);
}


// function to create boxes after initialized
function createBox(container, row, col, letter) {
    // console.log(`Creating box at row ${row}, column ${col}`)
    // assign letter param to a string
    letter = '';
    // create a new div ele called 'box'
    const box = document.createElement('div');
    // assign classname
    box.className = 'box';
    //assign id with location of box
    box.id = `box${row}-${col}`
    box.textContent = letter;
    container.appendChild(box);
    // console.log(box);
    // return box;
}

function createGrid(container) {
    for(let r = 0; r < maxWords; r++){
        for(let c = 0; c < inputCount; c++) {
            // console.log(`Creating grid cell at row ${r}, column ${c}`);
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

// checks word against target word
function checkWord() {
    console.log('checkWord----------------------');
    // if the word matches the target word, end the game
    console.log('guessed word: ', guessedWord);
   
    for (let i = 0; i < inputCount; i++) {
        const boxId = `#box${row}-${i}`;
        const currBox = document.querySelector(boxId);
        let letter = guessedWord[i]

        // correct letter & position
        if (targetWord[i] === letter) {
            currBox.classList.add('right');
        }
        // correct letter & wrong position
        else if (targetWord.includes(letter)) {
            currBox.classList.add('maybe');
        }
        // incorrect letter
        else {
            currBox.classList.add('wrong');
        }
    }

    if (guessedWord === targetWord) {
        gameOver = true;
        resetWindow();
        console.log('correct');
    }
}

function resetWindow() {
    winScreen.style.visibility = 'visible';
    targetWord = targetWord.toUpperCase();
    if(row === maxWords) {
        title.textContent = `Sorry😿The word was ${targetWord} `
    } else {
        title.textContent = "🥳🎉You're Correct!🎉🥳";
    }
    resetBtn.textContent = 'Play Again';
    resetBtn.addEventListener('click', init);
}

