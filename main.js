let currentPlayer = "red";
const piece = document.getElementsByClassName(".piece");
const container = document.querySelector("#board");
const message = document.getElementById('message');
let gameOver = 0, winR = 0, winY = 0, winner = 0

let nr1 = 35, nr2 = 36, nr3 = 37, nr4 = 38, nr5 = 39, nr6 = 40, nr7 = 41;
let col1 = [container.children[0].id, container.children[7].id, container.children[14].id, container.children[21].id,
container.children[28].id, container.children[35].id];
let col2 = [container.children[1].id, container.children[8].id, container.children[15].id, container.children[22].id,
container.children[29].id, container.children[36].id];
let col3 = [container.children[2].id, container.children[9].id, container.children[16].id, container.children[23].id,
container.children[30].id, container.children[37].id];
let col4 = [container.children[3].id, container.children[10].id, container.children[17].id, container.children[24].id,
container.children[31].id, container.children[38].id];
let col5 = [container.children[4].id, container.children[11].id, container.children[18].id, container.children[25].id,
container.children[32].id, container.children[39].id];
let col6 = [container.children[5].id, container.children[12].id, container.children[19].id, container.children[26].id,
container.children[33].id, container.children[40].id];
let col7 = [container.children[6].id, container.children[13].id, container.children[20].id, container.children[27].id,
container.children[34].id, container.children[41].id];

function setPiece() {
    let once = 0;
    checkWin();
    if (gameOver) {
        return;
    }
    container.addEventListener("click", (event) => {
        let e = event.target;
        for (let i = 0; i < 7 && once == 0; ++i) {
            if (e.id == col1[i] && nr1 > -1) {
                container.children[nr1].style.backgroundColor = currentPlayer;
                container.children[nr1].id = `${currentPlayer}`;
                changeColor();
                checkWin();
                nr1 -= 7;
            }
        }
        for (let i = 0; i < 7 && once == 0; ++i) {
            if (e.id == col2[i] && nr2 > 0) {
                container.children[nr2].style.backgroundColor = currentPlayer;
                container.children[nr2].id = `${currentPlayer}`;
                changeColor();
                checkWin();
                nr2 -= 7;
            }
        }
        for (let i = 0; i < 7 && once == 0; ++i) {
            if (e.id == col3[i] && nr3 > 1) {
                container.children[nr3].style.backgroundColor = currentPlayer;
                container.children[nr3].id = `${currentPlayer}`;
                changeColor();
                checkWin();
                nr3 -= 7;
            }
        }
        for (let i = 0; i < 7 && once == 0; ++i) {
            if (e.id == col4[i] && nr4 > 2) {
                container.children[nr4].style.backgroundColor = currentPlayer;
                container.children[nr4].id = `${currentPlayer}`;
                changeColor();
                checkWin();
                nr4 -= 7;
            }
        }
        for (let i = 0; i < 7 && once == 0; ++i) {
            if (e.id == col5[i] && nr5 > 3) {
                container.children[nr5].style.backgroundColor = currentPlayer;
                container.children[nr5].id = `${currentPlayer}`;
                changeColor();
                checkWin();
                nr5 -= 7;
            }
        }
        for (let i = 0; i < 7 && once == 0; ++i) {
            if (e.id == col6[i] && nr6 > 4) {
                container.children[nr6].style.backgroundColor = currentPlayer;
                container.children[nr6].id = `${currentPlayer}`;
                changeColor();
                checkWin();
                nr6 -= 7;
            }
        }
        for (let i = 0; i < 7 && once == 0; ++i) {
            if (e.id == col7[i] && nr7 > 5) {
                container.children[nr7].style.backgroundColor = currentPlayer;
                container.children[nr7].id = `${currentPlayer}`;
                changeColor();
                checkWin();
                nr7 -= 7;
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

function checkWin() {
    let r = "red", y = "yellow";
    for (let j = 35, c = -1; j < 42; ++j, ++c) {
        for (let i = j; i > c; i -= 7) {
            if (container.children[i].id == r) {
                ++winR;
            } else {
                winR = 0;
            }
            if (container.children[i].id == y) {
                ++winY;
            } else {
                winY = 0;
            }
            if (winR == 4 || winY == 4) {
                gameOver = 1;
                if (!winner) {
                    changeColor();
                    winner = 1;
                }
                message.textContent = `${currentPlayer} won!`
            }
        }
    }
    for (let j = 6, c = 0; j < 42; j += 7, c += 7) {
        for (let i = j; i > c; --i) {
            if (container.children[i].id == r) {
                ++winR;
            } else {
                winR = 0;
            }
            if (container.children[i].id == y) {
                ++winY;
            } else {
                winY = 0;
            }
            if (winR == 4 || winY == 4) {
                gameOver = 1;
                if (!winner) {
                    changeColor();
                    winner = 1;
                }
                message.textContent = `${currentPlayer} won!`
            }
        }
    }
    for (let j = 41; j > 26; --j) {
        for (let i = j; i > 0; i -= 8) {
            if (container.children[i].id == r) {
                ++winR;
            } else {
                winR = 0;
            }
            if (container.children[i].id == y) {
                ++winY;
            } else {
                winY = 0;
            }
            if (winR == 4 || winY == 4) {
                gameOver = 1;
                if (!winner) {
                    changeColor();
                    winner = 1;
                }
                message.textContent = `${currentPlayer} won!`
            }
        }
    }
    for (let j = 38; j > 20; --j) {
        for (let i = j; i > 2; i -= 6) {
            if (container.children[i].id == r) {
                ++winR;
            } else {
                winR = 0;
            }
            if (container.children[i].id == y) {
                ++winY;
            } else {
                winY = 0;
            }
            if (winR == 4 || winY == 4) {
                gameOver = 1;
                if (!winner) {
                    changeColor();
                    winner = 1;
                }
                message.textContent = `${currentPlayer} won!`
            }
        }
    }
}