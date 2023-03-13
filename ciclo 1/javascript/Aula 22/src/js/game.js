class Avatar {
    #positionX;
    #positionY;
    #coins;
    #hp;
    #power;
    #alive;

    constructor(_positionX, _positionY, _power = 1) {
        this.#coins = 0;
        this.#hp = 10;
        this.#power = _power;
        this.#alive = true;

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

    get hp() {
        return this.#hp;
    }

    get power() {
        return this.#power;
    }

    foward() {
        this.checkIfAlive();

        this.#positionX++;
        console.log(this.position);
    }

    back() {
        this.checkIfAlive();

        if (this.#positionX > 0) {
            this.#positionX--;
        } else {
            throw new Error("Não é possível voltar mais");
        }
        console.log(this.position);
    }

    right() {
        this.checkIfAlive();
        this.#positionY++;
        console.log(this.position);
    }

    left() {
        this.checkIfAlive();

        if (this.#positionY > 0) {
            this.#positionY--;
        } else {
            throw new Error("Não é possível voltar mais");
        }
        console.log(this.position);
    }

    colectCoin(_ammountOfCoins) {
        this.checkIfAlive();
        this.#coins += _ammountOfCoins;
        console.log(this.money);
    }

    attack(target) {
        this.checkIfAlive();
       
        if (target.hp == undefined) {
            throw new Error("Você não pode atacar o ar");
        }
       
        target.takeDamage(this.power);
        return this.power;
    }

    takeDamage(damage) {
        this.checkIfAlive();
        
        if (isNaN(parseInt(damage))) {
            throw new Error("Bate de verdade");
        }
        
        this.#hp -= damage;
        if (this.#hp <= 0) {
            this.#alive = false;
        }
    }

    checkIfAlive() {
        if (this.#alive) {
            return;
        } else {
            throw new Error("You are dead");
        }
    }
}

class Cowboy extends Avatar {
    #ammunition;
    constructor(_positionX, _positionY, _power = 2){
        super(_positionX, _positionY, _power)
        this.#ammunition = 10 
    }

    get ammunition() {
        return this.#ammunition
    }

    

    attack(target) {
        this.checkIfAlive();
       
        if (target.hp == undefined) {
            throw new Error("Você não pode atacar o ar");
        }

        if (this.#ammunition > 0) {
            this.#ammunition--
            target.takeDamage(this.power);
            return this.power;
        } else {
            throw new Error("Você está sem munição")
        }
    }

    addAmmunition(_ammount) {
        this.#ammunition+= _ammount
    }

}

class Mago extends Avatar {
    #spells

    constructor(_positionX, _positionY, _power = 3) {
        super(_positionX, _positionY, _power)
        this.#spells = 10
    }

    get mana() {
        return this.#spells
    }

    attack(target) {
        this.checkIfAlive();
       
        if (target.hp == undefined) {
            throw new Error("Você não pode atacar o ar");
        }

        if (this.#spells == 0) {
            throw new Error("Você está sem feitiços")
        }
        
        if (this.#spells > 0) {
            this.#spells--
            
            if (this.#spells == 0) {
                this.rechargeSpells()
            }
            
            target.takeDamage(this.power);
            return this.power;
        }
    }

    rechargeSpells() {
        console.log("recarregando feitiços")
        setTimeout(() => {
            this.#spells = 10
        },10000)
        
    }
}

const mario = new Avatar(0, 0);
const luigi = new Cowboy(0, 0);
const koopa = new Mago(0, 0);
// koopa.#console()

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
