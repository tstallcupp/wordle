/*----- constants -----*/
const COLOR_LOOKUP = {
    null: 'white',
    'right': '#50C878',
    'wrong' : '#C0C0C0',
    'maybe' : '#FFFAA0'
}

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
