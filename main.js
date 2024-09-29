let currentPlayer = "red";
const container = document.querySelector("#board");
const message = document.getElementById('message');
let gameOver = false, winR = 0, winY = 0, winner = false;

const max = 42, four = 4;

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
    while (num < 35) {
        num += 7;
    }
    while (cont[num].id == "red" || cont[num].id == "yellow") {
        num -= 7;
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
        for (let line = 0; line < 8 && once == 0; ++line) {
            for (let column = 0; column < 7 && once == 0; ++column) {
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

let reper = [7, 1, 6, 8];
let array = [21, 37, 39, 15];
let begin = [
    [14, 7, 0, 1, 2, 3],
    [20, 13, 6, 5, 4, 3]
];

function checkWin() {
    let r = "red", y = "yellow";
    for (let fourCheckings = 0; fourCheckings < four; ++fourCheckings) {
        for (let i = 0; i < max && fourCheckings < 2; i += reper[fourCheckings]) {
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
            if (winR == four || winY == four) {
                gameOver = true;
                if (!winner) {
                    changeColor();
                    winner = 1;
                }
                message.textContent = `${currentPlayer} won!`;
            }
        }
        for (let i = max - 1; i > -1 && fourCheckings > 1; i -= reper[fourCheckings]) {
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
            if (winR == four || winY == four) {
                gameOver = true;
                if (!winner) {
                    changeColor();
                    winner = true;
                }
                message.textContent = `${currentPlayer} won!`;
            }
        }
    }
}
