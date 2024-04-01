/*----- constants -----*/
const COLOR_LOOKUP = {
    null: 'white',
    'right': '#50C878',
    'wrong' : '#C0C0C0',
    'maybe' : '#FFFAA0'
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
let secretWord;
let guessedLetters;
let maxAttempts;
let remainingAttempts;

/*----- cached elements  -----*/


/*----- event listeners -----*/

//* add event listener for play again button and call render()
/*----- functions -----*/
init();

// Initialize all state variables, then call render()
function init(){
 render();
 };

function render(){

};
