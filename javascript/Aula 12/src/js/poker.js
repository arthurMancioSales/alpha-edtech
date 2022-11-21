const cards = [];
const userHand = [];
const cardWrapper = document.querySelector(".cardsWrapper");
const result = document.querySelector("#result");
const title = document.querySelector("#gameTitle")

const sequence = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"];

for (let i = 0; i < 4; i++) {
    switch (i) {
        case 0:
            for (let i = 0; i < 13; i++) {
                createCard("C", i);
            }
            break;
        case 1:
            for (let i = 0; i < 13; i++) {
                createCard("D", i);
            }
            break;
        case 2:
            for (let i = 0; i < 13; i++) {
                createCard("H", i);
            }
            break;
        case 3:
            for (let i = 0; i < 13; i++) {
                createCard("S", i);
            }
            cards.sort(() => Math.random() - 0.5);
            break;
    }
}

function createCard(suit, index) {
    const card = {};
    card.suit = suit;

    switch (index) {
        case 0:
            card.value = "A";
            break;
        case 9:
            card.value = "T";
            break;
        case 10:
            card.value = "J";
            break;
        case 11:
            card.value = "Q";
            break;
        case 12:
            card.value = "K";
            break;
        default:
            card.value = index + 1;
    }
    card.name = `${card.value}${card.suit}`;

    cards.push(card);
}

function startGame() {
    if (userHand.length < 5) {
        title.innerText = `Bora jogar poker - ${cards.length} cartas restantes`
        userHand.push(cards[0]);

        document.querySelector(".button").setAttribute("value", "pegar carta");
        
        if (userHand.length == 5) {
            cardWrapper.removeChild(cardWrapper.children[0]);
            document.querySelector(".button").setAttribute("value", "ver resultado");
        }

        const newCard = document.createElement("img");

        newCard.setAttribute("src",`./src/images/poker-cards/${cards[0].name}.svg`);
        
        cardWrapper.appendChild(newCard);

        cards.splice(0, 1);
        title.innerText = `Bora jogar poker - ${cards.length} cartas restantes`
    } else if (userHand.length == 5 && result.innerText != "") {
        try {
            
            if(cards.length < 5) {
                throw "Não há mais cartas suficientes"
            }

            result.innerText = ""
            userHand.splice(0, 5);
    
            for(let i = 0; i < 5; i++) {
                cardWrapper.removeChild(cardWrapper.children[0]);
            }
            const newCard = document.createElement("img");
            newCard.setAttribute("src",`./src/images/poker-cards/Back.svg`);
            cardWrapper.appendChild(newCard);
    
            document.querySelector(".button").setAttribute("value", "recomeçar");
        } catch (error) {
            result.innerText = error
        }
        
    } else {
        checkPoints();
    }
}

function checkPoints() {
    const userSequence = [];
    userHand.forEach((value) => {
        userSequence.push(sequence.indexOf(value.value));
    });
    userSequence.sort((a, b) => a - b);

    if (checkRoyal(userSequence, userHand)) {
        result.innerText = "Straight Flush";
    } else if (checkRepeatValue(userSequence, 4)) {
        result.innerText = "Quadra";
    } else if (checkRepeatValue(userSequence, 3, 2)) {
        result.innerText = "Full House:";
    } else if (checkSequence(userSequence)) {
        result.innerText = "Sequência";
    } else if (checkRepeatValue(userSequence, 3)) {
        result.innerText = "Trinca";
    } else if (checkRepeatValue(userSequence, 2, 2)) {
        result.innerText = "Dois pares";
    } else if (checkRepeatValue(userSequence, 2)) {
        result.innerText = "Par";
    } else {
        result.innerText = "Nada";
    }

    document.querySelector(".button").setAttribute("value", "recomeçar");
}

function checkRoyal(sequenceArr, objArr) {
    if (checkSuit(objArr) && checkSequence(sequenceArr)) {
        return true;
    }
}

function checkSuit(arr) {
    if (arr.every((value) => {return value.suit == "C";})) {
        return true;
    } else if (arr.every((value) => {return value.suit == "D";})) {
        return true;
    } else if (
        arr.every((value) => {return value.suit == "H";})) {
        return true;
    } else if (
        arr.every((value) => {return value.suit == "S";})) {
        return true;
    } else {
        return false
    }
}

function checkSequence(arr, i = 0) {
    if (i + 1 == arr.length) {
        return true;
    }

    if (arr[i] + 1 == arr[i + 1]) {
        return checkSequence(arr, i + 1);
    } else {
        return false;
    }
}

function checkRepeatValue(arr, x, y = 0) {
    switch (x) {
        case 2:
            const casePar1 = arr.slice(0, 2).every((value) => {
                return value == arr[0];
            });
            const casePar2 = arr.slice(1, 3).every((value) => {
                return value == arr[1];
            });
            const casePar3 = arr.slice(2, 4).every((value) => {
                return value == arr[2];
            });
            const casePar4 = arr.slice(3, 5).every((value) => {
                return value == arr[3];
            });

            if (casePar1) {
                if (y == 0) {
                    return true;
                } else {
                    if (
                        arr.slice(2, 4).every((value) => {
                            return value == arr[2];
                        }) ||
                        arr.slice(-2).every((value) => {
                            return value == arr.slice(-1)[0];
                        })
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else if (casePar2) {
                if (y == 0) {
                    return true;
                } else {
                    if (
                        arr.slice(-2).every((value) => {
                            return value == arr.slice(-1)[0];
                        })
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else if (casePar3) {
                if (y == 0) {
                    return true;
                } else {
                    if (
                        arr.slice(0, 2).every((value) => {
                            return value == arr[0];
                        })
                    ) {

                        return true;
                    } else {
                        return false;
                    }
                }
            } else if (casePar4) {
                if (y == 0) {
                    return true;
                } else {
                    if (
                        arr.slice(0, 1).every((value) => {
                            return value == arr[1];
                        }) ||
                        arr.slice(1, 3).every((value) => {
                            return value == arr[1];
                        })
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }

        case 3:
            const caseTriple1 = arr.slice(1, -1).every((value) => {
                return value == arr[2];
            });
            const caseTriple2 = arr.slice(0, -2).every((value) => {
                return value == arr[2];
            });
            const caseTriple3 = arr.slice(2).every((value) => {
                return value == arr[2];
            });

            if (caseTriple1) {
                if (y != 0) {
                    return false;
                } else {
                    return true;
                }
            } else if (caseTriple2) {
                if (y == 0) {
                    return true;
                } else {
                    if (
                        arr.slice(3).every((value) => {
                            return value == arr[5];
                        })
                    ) {

                        return true;
                    } else {
                        return false;
                    }
                }
            } else if (caseTriple3) {
                if (y == 0) {
                    return true;
                } else {
                    if (
                        arr.slice(0, 2).every((value) => {
                            return value == arr[0];
                        })
                    ) {

                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }

        case 4:
            if (arr.slice(0, -1).every((value) => {return value == arr[0];}) || arr.slice(1).every((value) => {return value == arr[0];})
            ) {
                return true;
            } else {
                return false;
            }
    }
}
