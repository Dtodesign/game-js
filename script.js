const symX = 'x';
const symO = 'o';
let oTurn;

const board = document.getElementById('gameBoard');
const gameCells = document.querySelectorAll('[game-cell]');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winDrawModal = document.getElementById('winDrawModal');
const winDrawText = document.querySelector('[win-draw-text]');
const resetB = document.getElementById('reset');
const restartB = document.getElementById('btnRestart');
 
gameStart();

resetB.addEventListener('click',gameStart);
restartB.addEventListener('click', gameStart);


function handleClick(e) {
    //console.log('clicked')
    const cell = e.target;
    const currentSymbol = oTurn ? symO : symX;
    placeSymbol(cell, currentSymbol);
    if (winner(currentSymbol)) {
        // console.log('winner');
        gameFinished(false);
    }else if (tieGame()){
        gameFinished(true);
    }else {
        switchTurn();
    switchTurnHover();
    }
    // console.log(cell)
    
}

function gameFinished(tie) {
    if (tie) {
        winDrawText.innerHTML = 'Tie Game!';
    }else  {
        winDrawText.innerHTML = `<strong> Winner is ${oTurn ? "〇" : "✘"} !</strong>`;
    }
    winDrawModal.classList.add('displayModal');
}

function tieGame(){
    return [...gameCells].every(cell => {
        return cell.classList.contains(symO) || cell.classList.contains(symX);
    });
}

function gameStart() {
    oTurn = false;
    gameCells.forEach(cell => {
        cell.classList.remove(symX);
        cell.classList.remove(symO);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click', handleClick, {
            once: true
        })

    });
    switchTurnHover();
    winDrawModal.classList.remove('displayModal');
}


function placeSymbol(cell, currentSymbol) {
    cell.classList.add(currentSymbol);
    console.log(currentSymbol);
}

function switchTurn() {
    oTurn = !oTurn;
}

function winner(currentSymbol) {
    return winConditions.some(comb => {
        return comb.every(i => {
            return gameCells[i].classList.contains(currentSymbol);
        });
    });
}

function switchTurnHover() {
    board.classList.remove(symX);
    board.classList.remove(symO);
    if (oTurn) {
        board.classList.add(symO);
    } else {
        board.classList.add(symX);
    }
}