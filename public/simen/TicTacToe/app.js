const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const displayWinner = document.getElementById("displayWinner");
const restart = document.getElementById("restart");
const currentPlayerEl = document.getElementById("currentPlayer");

restart.addEventListener("click", setup);

let board;
let players = ['X', 'O']
let currentPlayer;
let w = canvas.width / 3;
let h = canvas.height / 3;

function setup() {
    displayWinner.innerHTML = ('');
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    if (Math.random() < 0.5) {
        currentPlayer = players[0];
    } else {
        currentPlayer = players[1];
    }
    currentPlayerEl.innerHTML = 'Current Player: ' + currentPlayer;
    draw();
    document.addEventListener("click", playMove);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(w, canvas.height);
    ctx.moveTo(2 * w, 0);
    ctx.lineTo(2 * w, canvas.height);
    ctx.moveTo(0, h);
    ctx.lineTo(canvas.width, h);
    ctx.moveTo(0, 2 * h);
    ctx.lineTo(canvas.width, 2 * h);
    ctx.stroke();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * j;
            let y = h * i;
            let spot = board[i][j];
            if (spot == players[1]) {
                ctx.beginPath();
                ctx.arc(x + w / 2, y + h / 2, w / 2 - 10, 0, Math.PI * 2);
                ctx.stroke();
            } else if (spot == players[0]) {
                ctx.beginPath();
                ctx.moveTo(x + 10, y + 10)
                ctx.lineTo(x + w - 10, y + h - 10)
                ctx.moveTo(x + 10, y + h - 10);
                ctx.lineTo(x + w - 10, y + 10)
                ctx.stroke();
            }
        }
    }
}

function playMove(e) {
    let x = Math.floor(getMousePos(canvas, e).x / w);
    let y = Math.floor(getMousePos(canvas, e).y / h);

    if (y > 2 || x > 2) return;

    if (board[y][x] == '') {
        board[y][x] = currentPlayer;
    }
    checkWin();
    if (currentPlayer == players[0]) {
        currentPlayer = players[1];
    } else if (currentPlayer == players[1]) {
        currentPlayer = players[0];
    }
    currentPlayerEl.innerHTML = 'Current Player: ' + currentPlayer;
    draw();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function checkWin() {
    console.log("Checking for win...")
    if (board.every(row => row.every(col => col != ''))) {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = ('Draw');
    }
    if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] != '') {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = (currentPlayer);
    } else if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0] != '') {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = (currentPlayer);
    } else if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0] != '') {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = (currentPlayer);
    } else if (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0] != '') {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = (currentPlayer);
    } else if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] != '') {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = (currentPlayer);
    } else if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] != '') {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = (currentPlayer);
    } else if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = (currentPlayer);
    } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '') {
        document.removeEventListener("click", playMove);
        displayWinner.innerHTML = (currentPlayer);
    }
}
setup();