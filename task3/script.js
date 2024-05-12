let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let mode = 'human'; // Default mode is human vs. human

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const messageElement = document.getElementById('message');

function changeMode() {
    mode = document.getElementById('mode').value;
    resetGame();
}

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return !gameBoard.includes('');
}

function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;

    if (checkWin()) {
        messageElement.innerText = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (checkDraw()) {
        messageElement.innerText = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (mode === 'computer' && gameActive) {
            playComputerMove();
        }
    }
}

function playComputerMove() {
    // Implement computer move logic here
    // For simplicity, let's make a random move for now
    let emptyCells = gameBoard.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let computerMoveIndex = emptyCells[randomIndex];
    gameBoard[computerMoveIndex] = currentPlayer;
    document.getElementsByClassName('cell')[computerMoveIndex].innerText = currentPlayer;

    if (checkWin()) {
        messageElement.innerText = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (checkDraw()) {
        messageElement.innerText = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    messageElement.innerText = '';
    Array.from(document.getElementsByClassName('cell')).forEach(cell => cell.innerText = '');

    if (mode === 'computer' && currentPlayer === 'O') {
        playComputerMove();
    }
}
