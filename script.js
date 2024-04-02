const cellElements = document.querySelectorAll('[data-ceil]');
const board = document.querySelector('.board');
const winningMessage = document.querySelector('.winning-message');
const dataWinningText = document.querySelector('[data-winning-message-text]');
const restartButton = document.querySelector('#restartButton');
let circleTurn;
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const WINNER_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function startGame() {
    circleTurn = false;
    cellElements.forEach(element => {
        element.classList.remove('circle');
        element.classList.remove('x');
        element.removeEventListener('click', handleClick);
        element.addEventListener('click', handleClick, {once: true});
    })
    setBoardHoverClass();
    winningMessage.classList.remove('show');
}

restartButton.addEventListener('click', startGame);

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // PlaceMark
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn();
        setBoardHoverClass();
    }
    
    
}

function isDraw() {
    return [...cellElements].every(element => {
        return element.classList.contains('x') || element.classList.contains('circle');
    })
}
function endGame(draw) {
    if (draw) {
        dataWinningText.textContent = `Draw!`;
    } else {
        dataWinningText.textContent = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessage.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(circleTurn ? X_CLASS : CIRCLE_CLASS);
    board.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS);
}

function checkWin(currentClass) {
    return WINNER_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

startGame();