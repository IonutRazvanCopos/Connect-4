let currentPlayer = "red";
const container = document.querySelector("#board");
const message = document.getElementById('message');
let gameOver = false, winR = 0, winY = 0, winner = false;

const max = 42, four = 4, seven = 7, lastLine = 35;

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

let cont = container.children;
let col = [
    [cont[0].id, cont[7].id, cont[14].id, cont[21].id,
    cont[28].id, cont[35].id],
    [cont[1].id, cont[8].id, cont[15].id, cont[22].id,
    cont[29].id, cont[36].id],
    [cont[2].id, cont[9].id, cont[16].id, cont[23].id,
    cont[30].id, cont[37].id],
    [cont[3].id, cont[10].id, cont[17].id, cont[24].id,
    cont[31].id, cont[38].id],
    [cont[4].id, cont[11].id, cont[18].id, cont[25].id,
    cont[32].id, cont[39].id],
    [cont[5].id, cont[12].id, cont[19].id, cont[26].id,
    cont[33].id, cont[40].id],
    [cont[6].id, cont[13].id, cont[20].id, cont[27].id,
    cont[34].id, cont[41].id]
];

function checkNr(num) {
    while (num < lastLine) {
        num += seven;
    }
    while (cont[num].id == "red" || cont[num].id == "yellow") {
        num -= seven;
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
        for (let line = 0; line <= seven && once == 0; ++line) {
            for (let column = 0; column < seven && once == 0; ++column) {
                if (e.id == col[line][column]) {
                    cont[num].style.backgroundColor = currentPlayer;
                    cont[num].id = `${currentPlayer}`;
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
let begin = [
    [0, 1, 2, 3, 4, 5, 6],
    [0, 7, 14, 21, 28, 35],
    [14, 7, 0, 1, 2, 3],
    [3, 4, 5, 6, 13, 20]
];
let stop = [
    [35, 36, 37, 38, 39, 40, 41],
    [6, 13, 20, 27, 34, 41],
    [38, 39, 40, 41, 34, 27],
    [21, 28, 35, 36, 37, 38]
];

function haveWinner(a, b) {
    if (a == four || b == four) {
        gameOver = true;
        if (!winner) {
            changeColor();
            winner = 1;
        }
        message.textContent = `${currentPlayer} won!`;
    }
}

function checkWin() {
    let r = "red", y = "yellow";
    let columns = 7;
    for (let target = 0; target < four; ++target) {
        if (target > 0) {
            columns = 6;
        }
        for (let col = 0; col < columns; ++col) {
            for (let i = begin[target][col]; i <= stop[target][col]; i += fourCheckings[target]) {
                if (cont[i].id == r) {
                    ++winR;
                } else {
                    winR = 0;
                }
                if (cont[i].id == y) {
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
