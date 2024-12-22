const sqrEls = document.querySelectorAll('.sqr')
const msgEl = document.querySelector('#message')
const rstBtnEl = document.querySelector('#reset')
let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';
let winner = false;
let tie = false;

const winCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 'X') {
            sqrEls[i].textContent = 'X'
        } else if (board[i] === 'O') {
            sqrEls[i].textContent = 'O'
        }
    }
}
function placePiece(index) {
    board[index] = turn
}
function checkForWinner() {
    for (let i = 0; i < 8; i++) {
        let setWin = winCombs[i];
        let a = board[setWin[0]];
        let b = board[setWin[1]];
        let c = board[setWin[2]]
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (
            a === b && b === c
        ) {
            winner = true;
        }
    }
}


function handleClick(event) {
    const square = event.target;
    const squareIndex = parseInt(
        square.getAttribute('id')
    );

    if (board[squareIndex] !== '' || winner !== false) {
        return;
    }

    placePiece(squareIndex)
    updateBoard()
    checkForWinner()
    checkTie()
    switchPlyrTurn()
    updateMsg()
}


function checkTie() {
    if (winner === true) {
        return
    }
    if (!board.includes('')) {
        tie = true
    } else {
        tie = false
    }
}

function updateMsg() {
    if (winner == false && tie == false) {
        msgEl.innerText = `Its ${turn}s turn!`
    } else if (winner == false && tie == true) {
        msgEl.innerText = "Its a draw!"
    } else {
        msgEl.innerText = 'Congrats! YOU WIN!!!'
    }
}
function switchPlyrTurn() {
    if (winner === true) {
        return
    }
    if (winner === false) {
        turn = turn === 'X' ? 'O' : 'X'
    }
}

function render() {
    updateBoard();
    updateMsg();
}

function init() {
    winner = false;
    turn = 'X'
    board = ['', '', '', '', '', '', '', '', '']
    sqrEls.forEach(sqr => sqr.innerHTML = '')
    render()
}

window.onload = init;

rstBtnEl.addEventListener('click', init)

sqrEls.forEach((sqr) => {
    addEventListener('click', handleClick)
});



















































// let plyrOne =
//     spaces.forEach((space) => {
//         space.addEventListener('click', () => {
//         let x = document.createElement('img');
//         x.src = "X.png";
//         space.appendChild(x)
//     })
// })

// let plyrTwo =
//     spaces.forEach((space) => {
//         space.addEventListener('click', () => {
//         let o = document.createElement('img');
//         o.src = "O.png";
//         space.appendChild(o)
//         })
//     })
