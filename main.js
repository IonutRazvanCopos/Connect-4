let currentPlayer = "red";
const container = document.querySelector("#board");
const message = document.getElementById('message');
let gameOver = false, winR = 0, winY = 0, winner = false;

const max = 42, connections = 4, reper = 7, lastLine = 35;

function generateTable() {
    for (let i = 0; i < max; ++i) {
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.id = i;
        piece.addEventListener('click', setPiece);
        container.appendChild(piece);
    }
}

generateTable();

let piece = container.children;
let table = [
    [piece[0].id, piece[7].id, piece[14].id, piece[21].id,
    piece[28].id, piece[35].id],
    [piece[1].id, piece[8].id, piece[15].id, piece[22].id,
    piece[29].id, piece[36].id],
    [piece[2].id, piece[9].id, piece[16].id, piece[23].id,
    piece[30].id, piece[37].id],
    [piece[3].id, piece[10].id, piece[17].id, piece[24].id,
    piece[31].id, piece[38].id],
    [piece[4].id, piece[11].id, piece[18].id, piece[25].id,
    piece[32].id, piece[39].id],
    [piece[5].id, piece[12].id, piece[19].id, piece[26].id,
    piece[33].id, piece[40].id],
    [piece[6].id, piece[13].id, piece[20].id, piece[27].id,
    piece[34].id, piece[41].id]
];

function checkNr(num) {
    while (num < lastLine) {
        num += reper;
    }
    while (piece[num].id == "red" || piece[num].id == "yellow") {
        num -= reper;
    }
    return num;
}

function setPiece() {
    let once = 0;
    if (gameOver) {
        return;
    }
    container.addEventListener("click", (event) => {
        let e = event.target;
        let num = parseInt(`${e.id}`);
        if (num < max) {
            num = checkNr(num);
        } else {
            once = 1;
        }
        for (let line = 0; line <= reper && once == 0; ++line) {
            for (let column = 0; column < reper && once == 0; ++column) {
                if (e.id == table[line][column]) {
                    piece[num].style.backgroundColor = currentPlayer;
                    piece[num].id = `${currentPlayer}`;
                    changeColor();
                    checkWin();
                    once = 1;
                }
            }
        }
        once = 1;
    });
}

function changeColor() {
    if (currentPlayer == "red") {
        currentPlayer = "yellow";
    } else {
        currentPlayer = "red";
    }
}

let fourCheckings = [7, 1, 8, 6];
let beginCalculation = [
    [0, 1, 2, 3, 4, 5, 6],
    [0, 7, 14, 21, 28, 35],
    [14, 7, 0, 1, 2, 3],
    [3, 4, 5, 6, 13, 20]
];
let stopCalculating = [
    [35, 36, 37, 38, 39, 40, 41],
    [6, 13, 20, 27, 34, 41],
    [38, 39, 40, 41, 34, 27],
    [21, 28, 35, 36, 37, 38]
];

function haveWinner(a, b) {
    if (a == connections || b == connections) {
        gameOver = true;
        if (!winner) {
            changeColor();
            winner = 1;
        }
        message.style.background = `${currentPlayer}`;
        message.textContent = `${currentPlayer} won!`;
    }
}

function checkWin() {
    let r = "red", y = "yellow";
    let columns = 7;
    for (let target = 0; target < connections; ++target) {
        if (target > 0) {
            columns = 6;
        }
        for (let table = 0; table < columns; ++table) {
            for (let i = beginCalculation[target][table]; i <= stopCalculating[target][table]; i += fourCheckings[target]) {
                if (piece[i].id == r) {
                    ++winR;
                } else {
                    winR = 0;
                }
                if (piece[i].id == y) {
                    ++winY;
                } else {
                    winY = 0;
                }
                haveWinner(winR, winY);
            }
        winR = 0, winY = 0;
        }
    }
}
