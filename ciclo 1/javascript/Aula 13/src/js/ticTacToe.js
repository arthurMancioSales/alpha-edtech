const result = document.querySelector("#result");
const squares = document.querySelectorAll(".elemento");
const button = document.querySelector(".button");
let playerTurn = "X";
let turnCounter = 0;
const game = [];

function startGame() {
    turnCounter = 0;
    playerTurn = "X";

    button.value = "jogar";

    game.splice(0, 3);
    game.push([0, 0, 0], [0, 0, 0], [0, 0, 0]);
    result.innerText = "Vez do jogador X";

    squares.forEach((value) => {
        value.innerHTML = "";
        value.style.cursor = "pointer";
        value.style.border = "";
        value.addEventListener("mouseover", setBackground);
        value.addEventListener("mouseout", clearBackground);
        value.addEventListener("click", choseSquare);
    });
}

function setBackground() {
    this.style.color = "rgba(255, 255, 255, 0.5)";
    switch (playerTurn) {
        case "X":
            this.innerHTML = "X";
            break;
        case "O":
            this.innerHTML = "O";
    }
}

function clearBackground() {
    this.innerHTML = "";
}

function choseSquare() {
    switch (playerTurn) {
        case "X":
            this.innerHTML = "X";
            playerTurn = "O";
            break;
        case "O":
            this.innerHTML = "O";
            playerTurn = "X";
    }

    this.style.color = "rgba(255, 255, 255, 1)";
    this.style.cursor = "default";
    this.removeEventListener("mouseover", setBackground);
    this.removeEventListener("mouseout", clearBackground);
    this.removeEventListener("click", choseSquare);

    game[this.dataset.position[0]][this.dataset.position[1]] = this.innerHTML;
    result.innerText = `Vez do jogador ${playerTurn}`;
    turnCounter++;
    checkWinner();
}

function checkWinner() {
    game.forEach((value, i) => {
        if (value.every((v) => v == value[0]) && value[0] != 0) {
            finishGame(value[0]);
            switch (i) {
                case 0:
                    squares[0].style.border = "3px solid lime";
                    squares[1].style.border = "3px solid lime";
                    squares[2].style.border = "3px solid lime";
                    break;
                case 1:
                    squares[3].style.border = "3px solid lime";
                    squares[4].style.border = "3px solid lime";
                    squares[5].style.border = "3px solid lime";
                    break;
                case 2:
                    squares[6].style.border = "3px solid lime";
                    squares[7].style.border = "3px solid lime";
                    squares[8].style.border = "3px solid lime";
                    break;
            }
            return;
        }
    });
    if (
        game[0][0] == game[1][0] &&
        game[1][0] == game[2][0] &&
        game[0][0] != 0
    ) {
        squares[0].style.border = "3px solid lime";
        squares[3].style.border = "3px solid lime";
        squares[6].style.border = "3px solid lime";
        finishGame(game[0][0]);
        return;
    } else if (
        game[0][1] == game[1][1] &&
        game[1][1] == game[2][1] &&
        game[0][1] != 0
    ) {
        squares[1].style.border = "3px solid lime";
        squares[4].style.border = "3px solid lime";
        squares[7].style.border = "3px solid lime";
        finishGame(game[0][1]);
        return;
    } else if (
        game[0][2] == game[1][2] &&
        game[1][2] == game[2][2] &&
        game[0][2] != 0
    ) {
        squares[2].style.border = "3px solid lime";
        squares[5].style.border = "3px solid lime";
        squares[8].style.border = "3px solid lime";
        finishGame(game[0][2]);
        return;
    } else if (
        game[0][2] == game[1][1] &&
        game[1][1] == game[2][0] &&
        game[0][2] != 0
    ) {
        squares[2].style.border = "3px solid lime";
        squares[4].style.border = "3px solid lime";
        squares[6].style.border = "3px solid lime";
        finishGame(game[0][2]);
        return;
    } else if (
        game[0][0] == game[1][1] &&
        game[1][1] == game[2][2] &&
        game[0][0] != 0
    ) {
        squares[0].style.border = "3px solid lime";
        squares[4].style.border = "3px solid lime";
        squares[8].style.border = "3px solid lime";
        finishGame(game[0][0]);
        return;
    } else if (turnCounter == 9) {
        button.value = "recomeçar";
        result.innerText = `Deu velha`;
        return;
    }
}

function finishGame(winner) {
    result.innerText = `O jogador ${winner} ganhou`;
    squares.forEach((value) => {
        value.style.cursor = "default";
        value.removeEventListener("mouseover", setBackground);
        value.removeEventListener("mouseout", clearBackground);
        value.removeEventListener("click", choseSquare);
    });
    button.value = "recomeçar";
}
