/*----- constants -----*/
const COLOR_LOOKUP = {
    null: 'white',
    'right': '#50C878',
    'maybe' : '#FFFAA0',
    'wrong' : '#C0C0C0'
}

const WORD_LIST = ["table", "chair", "apple", "happy", "grape",
"lemon", "ocean", "piano", "zebra", "tiger",
"cloud", "fairy", "melon", "smile", "earth",
"pizza", "train", "beach", "horse", "river",
"mouse", "chair", "angel", "snake", "water",
"sugar", "tulip", "frost", "bread", "crown",
"dizzy", "shout", "laugh", "dance", "smell",
"dream", "frost", "crane", "grain", "waste"]

/*----- state variables -----*/
let board;
let secretWord; // holds random word from array
let maxWords = 6; // row/height/ number of words that can be guessed: 6 
let inputCount = 5 // col/width/ length of word/ number of letters that can be guessed: 5

// * cached variables while game is ongoing:
let guessedLetters; // cached letters that were inputted
let finalWord; // last word user inputted after max attempts

//* players curr guess position:
let row = 0; // height / word attempt number
let col = 0; // width / length of word but INDICIES
// let remainingCount; 

//* boolean to know if game is ongoing/ over
let gameOver = false;



/*----- cached elements  -----*/
const container = document.querySelector(".container");
// let winScreen = document.querySelector(".win-screen");
// let submitBtn = document.querySelector(".submit")

/*----- event listeners -----*/
document.addEventListener('keydown', handleKeyPress)
//* add event listener for play again button and call render()

/*----- event handlers -----*/
function handleKeyPress(evt) {
    // console.log(evt.key)
    // handle enter
    if (evt.key === 'Enter') {
        // call function to submit guess
        submitGuess();
        return;
    }
    // handle delete
    if (evt.key === 'Backspace') {
        //call function to delete input
        deleteKey();
    }
    // check if it's a letter
    if (evt.key.match(/^[a-zA-Z]$/)) {
        pressedKey(evt.key);
    }
}
//! COMPLETE FUNCTIONS FOR EVENT LISTENER
/*----- functions -----*/
init();

// Initialize all state variables, then call render()
function init(){
    console.log('Initializing game...')
    render();
};


function render(){
    // create grid in the container 
    createGrid(container);
    // createBox(container);
     
};

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

function pressedKey(letter){
    // check if the # of typed letters is less than 5
    if (col < inputCount) {
        fillBox(row, col, letter);
        // increment col index
        col++;
    }
    if (col === inputCount) {
        submitGuess();
    }
}



function deleteKey() {
    // check if there are letters in curr col
    if (col > 0) {
        // decremenent col idx to move backwards
        col--;
        // clear the content of that col
        fillBox(row, col, '')
    }
}
