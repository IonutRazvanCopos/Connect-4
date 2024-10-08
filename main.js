let currentPlayer = "red";
const container = document.querySelector("#board");
const message = document.getElementById('message');
let gameOver = false, winR = 0, winY = 0, winner = false;
const max = 42, connections = 4, mark = 7, lastLine = 35;

function generateTable() {
    for (let column = 0, idNum = 0; column < mark; ++column) {
        let columnPiece = document.createElement("div");
        for (let line = 0; line < mark - 1; ++line, ++idNum) {
            let linePiece = document.createElement("div");
            columnPiece.appendChild(linePiece);
            linePiece.id = idNum;
            linePiece.classList.add("piece");
        }
        columnPiece.classList.add("column");
        columnPiece.addEventListener('click', setPiece);
        container.appendChild(columnPiece);
    }
}

generateTable();

let piece = document.getElementsByClassName("piece");
let table = new Array(max);

for (let line = 0, num = 0; line < mark - 1; ++line) {
    table[line] = new Array(max);
    for (let column = 0; column < mark; ++column, ++num) {
        table[line][column] = num;
    }
}

let maxNum = [5, 11, 17, 23, 29, 35, 41];

function checkNr(num) {
    while (maxNum.every(maxNum => num != maxNum)) {
        ++num;
    }
    while (piece[num].id == "red" || piece[num].id == "yellow") {
        --num;
    }
    return num;
}

function setPiece() {
    let once = 0;
    if (gameOver) {
        return;
    }
    container.addEventListener("click", (event) => {
        let pieceNum = event.target;
        let num = parseInt(`${pieceNum.id}`);
        if (maxNum.every(maxNum => num != maxNum)) {
            num = checkNr(num);
        } else {
            once = 1;
        }
        for (let line = 0; line <= mark && once == 0; ++line) {
            for (let column = 0; column < mark && once == 0; ++column) {
                if (pieceNum.id == table[line][column]) {
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

let fourCheckings = [1, 6, 7, 5];
let beginCalculation = [
    [0, 6, 12, 18, 24, 30, 36],
    [0, 1, 2, 3, 4, 5],
    [2, 1, 0, 6, 12, 18],
    [3, 4, 5, 11, 17, 23]
];
let stopCalculating = [
    [5, 11, 17, 23, 29, 35, 41],
    [36, 37, 38, 39, 40, 41],
    [23, 29, 35, 41, 40, 39],
    [18, 24, 30, 36, 37, 38]
];

function haveWinner(red, yellow) {
    if (red == connections || yellow == connections) {
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
    let red = "red", yellow = "yellow";
    let columns = 7;
    for (let target = 0; target < connections; ++target) {
        let add = fourCheckings[target];
        if (target > 0) {
            columns = 6;
        }
        for (let table = 0; table < columns; ++table) {
            let begin = beginCalculation[target][table], stop = stopCalculating[target][table];
            for (let pointer = begin; pointer <= stop; pointer += add) {
                if (piece[pointer].id == red) {
                    ++winR, winY = 0;
                } else if (piece[pointer].id == yellow) {
                    ++winY, winR = 0;
                } else {
                    winR = 0, winY = 0;
                }
                haveWinner(winR, winY);
            }
            winR = 0, winY = 0;
        }
    }
}
