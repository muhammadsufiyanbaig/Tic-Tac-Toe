let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function makeMove(index) {
    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        drawBoard();
        if (!checkWinner() && !board.includes('')) {
            setMessage("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function computerMove() {
    let availableMoves = board.reduce((acc, cell, index) => (cell === '' ? acc.concat(index) : acc), []);
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    makeMove(availableMoves[randomIndex]);
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setMessage(`${board[a]} wins!`);
            return true;
        }
    }
    return false;
}

function setMessage(message) {
    document.getElementById('message').innerText = message;
}

function drawBoard() {
    for (let i = 0; i < board.length; i++) {
        document.querySelector(`.cell:nth-child(${i + 1})`).innerText = board[i];
    }
}
