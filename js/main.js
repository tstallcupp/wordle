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
let row; // height / word attempt number
let col; // width / length of word but INDICIES
// let remainingCount; 

//* boolean to know if game is ongoing/ over
let gameOver = false;



/*----- cached elements  -----*/
const container = document.querySelector(".container");
let winScreen = document.querySelector(".win-screen");
let submitBtn = document.querySelector(".submit")

/*----- event listeners -----*/

//* add event listener for play again button and call render()
/*----- functions -----*/
init();

// Initialize all state variables, then call render()
function init(){
    console.log('Initializing game...')
    // create grid in the container 
    createGrid(container);
    // createBox(container);
    render();
 };

 
 function render(){
     
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
    console.log(box);
    // return box;
}

function createGrid(container) {
    for(let r = 0; r < maxWords; r++){
        for(let c = 0; c < inputCount; c++) {
            console.log(`Creating grid cell at row ${r}, column ${c}`);
            createBox(container, r, c);
        }
    }
}