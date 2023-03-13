class Avatar {
    #positionX;
    #positionY;
    #coins;

    constructor(_positionX, _positionY) {
        this.#coins = 0;

        const positionX = parseInt(_positionX);
        const positionY = parseInt(_positionY);

        if (
            isNaN(positionX) ||
            isNaN(positionY) ||
            positionX < 0 ||
            positionY < 0
        ) {
            throw new Error("Insira um valor válido para posição");
        }

        this.#positionX = positionX;
        this.#positionY = positionY;
    }

    get position() {
        return { positionX: this.#positionX, positionY: this.#positionY };
    }

    get money() {
        return this.#coins;
    }

    foward() {
        this.#positionX++;
        console.log(this.position);
    }

    back() {
        if (this.#positionX > 0) {
            this.#positionX--;
        } else {
            throw new Error("Não é possível voltar mais");
        }
        console.log(this.position);
    }

    right() {
        this.#positionY++;
        console.log(this.position);
    }

    left() {
        if (this.#positionY > 0) {
            this.#positionY--;
        } else {
            throw new Error("Não é possível voltar mais");
        }
        console.log(this.position);
    }

    colectCoin(_ammountOfCoins) {
        this.#coins += _ammountOfCoins;
        console.log(this.money);
    }
}

const mario = new Avatar(0, 0);

document.body.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            mario.left();
            break;
        case "ArrowRight":
            mario.right();
            break;
        case "ArrowUp":
            mario.foward();
            break;
        case "ArrowDown":
            mario.back();
    }
});
