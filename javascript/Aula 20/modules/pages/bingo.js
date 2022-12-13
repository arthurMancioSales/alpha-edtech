import CreateDiv from "../components/div.js";
import CreateText from "../components/text.js";
import CreateButton from "../components/button.js";
import CreateImg from "../components/img.js";


document.querySelector("#startButton").addEventListener("click", startGame);
let gameInterval = "";
let drawer;

function startGame() {
    document.querySelector("#result").innerText = ``;
    const numberOfPlayers = document.querySelector("#numberOfPlayers").value;
    
    const totalPlayers = [];
    
    drawer = new Drawer(75, 1);
    buildDrawer(drawer);

    for (let i = 0; i < numberOfPlayers; i++) {
        const player = new Card();
        totalPlayers.push(player);
    }
    
    buildCards(totalPlayers);
    
    const drawnNumbersDiv = document.querySelector("#drawerNumbersDiv");

    gameInterval = setInterval(() => {
        if (drawnNumbersDiv.children.length == 74) {
            clearInterval(gameInterval);
        }
        const chosenNumber = drawer.drawNumber();
        const chosenNumberText = CreateText("text", "", chosenNumber);
        const chosenNumberDiv = CreateDiv("row", "", false);
        chosenNumberDiv.appendChild(chosenNumberText);
        chosenNumberDiv.style.border = "solid 3px white";
        chosenNumberDiv.style.borderRadius = "50px";
        chosenNumberDiv.style.width = "30px";
        chosenNumberDiv.style.height = "30px";
        chosenNumberDiv.style.padding = "0.5rem";
        
        drawnNumbersDiv.appendChild(chosenNumberDiv);
    }, 5000)

}

function Card(_cardSize = 10) {
    let playerCard = [];
    const cardSize = _cardSize;
    
    function setupPlayer() {

        let drawNumbers = Array.from(Array(75).keys(), n => n+1) ;

        drawNumbers.sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < cardSize; i++) {
            const playerNumber = {
                cardNumber: drawNumbers[i],
                draw: false
            }
            playerCard.push(playerNumber);
        }
        
    }

    setupPlayer();

    function markNumber() {
        if (drawer.verifyNumber(parseInt(this.textContent))) {
            this.style.border = "solid lime 3px";
            this.dataset.drawn = true;
        }
        if (verifyWinner(this)) {
            console.log("teste");
            return;
        }
        
    }

    function verifyWinner(card) {
        const numbersDiv = Array.from(card.parentNode.children);
       
        if (numbersDiv.every((element) => element.dataset.drawn == "true")) {
            card.parentElement.parentElement.style.border = "solid lime 3px";
            clearInterval(gameInterval);
            const winner = card.parentElement.parentElement.children[0].textContent;
            document.querySelector("#result").innerText = `O vencedor é: ${winner}`;
            return true;
        }
    }

    function listNumbers() {
        return  playerCard;
    }

    function verifyNumbers() {
        const numbersDiv = this.parentNode.children[1]; 
        for (const key in playerCard) {
            if (Object.hasOwnProperty.call(playerCard, key)) {
                const element = playerCard[key];
                if (drawer.verifyNumber(element.cardNumber) && element.drawn != true) {
                    element.drawn = true;
                    numbersDiv.children[key].style.border = "solid red 3px";
                }
            }
        }
    }

    return {
        markNumber: markNumber,
        listNumbers: listNumbers,
        verifyNumbers: verifyNumbers,
        verifyWinner: verifyWinner
    }
}

function Drawer(_max, _min) {
    const maxNumber = _max;
    const minNumber = _min;

    let drawerNumbers = [];
    let drawnNumbers = [];

    function setupDrawer() {
        drawerNumbers = Array.from(Array(maxNumber).keys(), n => n+minNumber) ;

        drawerNumbers.sort(() => Math.random() - 0.5);
    }

    setupDrawer();

    function drawNumber() {
        const result = drawerNumbers[0];
        drawerNumbers = drawerNumbers.filter(number => number !== result);
        drawnNumbers.push(result);
        return result;
    }

    function verifyNumber(number) {
        if (drawnNumbers.findIndex(n => n == number) != -1) return true;
        else return false;
    }

    return {
        drawNumber: drawNumber,
        verifyNumber: verifyNumber
    }
}

function buildDrawer() {
    if (document.querySelector("#drawerWrapper") !== null) {
        document.querySelector("#drawerWrapper").innerHTML = "";
    } else { 
        const root = document.querySelector("#root");
        const drawerWrapper = CreateDiv("column", "drawerWrapper", true, "secondary-color");
        root.appendChild(drawerWrapper);
    }
    
    document.querySelector("#startDiv").remove();
    
    const drawerWrapper = document.querySelector("#drawerWrapper");
    document.querySelector("#root").appendChild(drawerWrapper);

    const drawer = CreateImg("./src/images/bingo.png", "drawerImg", "150px");
    drawerWrapper.appendChild(drawer);

    const drawerNumbers = CreateDiv("row", "drawerNumbersDiv", false);
    drawerNumbers.style.flexWrap = "wrap";
    drawerWrapper.appendChild(drawerNumbers);
   

    const drawerButton = CreateButton("reiniciar", "drawerButton", resetGame);
    drawerWrapper.appendChild(drawerButton);
}

function buildCards(playerCards) {
    
    if (document.querySelector("#cardWrapper") !== null) {
        document.querySelector("#cardWrapper").innerHTML = "";
    } else { 
        const root = document.querySelector("#root");
        const cardWrapper = CreateDiv("column", "cardWrapper", false);
        root.appendChild(cardWrapper);
    }
    
    playerCards.forEach((card, index) => {
        const numberValue = card.listNumbers();
        
        const cardDiv = CreateDiv("column", `player${index}`, true, "secondary-color");
        cardDiv.appendChild(CreateText("subtitle", `player${index}Subtitle`, `Jogador ${index}`));

        const numbersWrapper = CreateDiv("row", `player${index}NumberDiv`, false);
        cardDiv.appendChild(numbersWrapper)

        const listButton = CreateButton("conferir números", "", card.verifyNumbers);
        cardDiv.appendChild(listButton);
        
        for (let i = 0; i < 10; i++) {
            const numberDiv = CreateDiv("row", `number${i}`, false);
            numberDiv.appendChild(CreateText("text", "", `${numberValue[i].cardNumber}`));
            numberDiv.style.border = "solid 3px white";
            numberDiv.style.borderRadius = "100%";
            numberDiv.style.width = "30px";
            numberDiv.style.height = "30px";
            numberDiv.style.padding = "0.5rem";
            numberDiv.style.cursor = "pointer";
            numberDiv.addEventListener("click", card.markNumber);
            numbersWrapper.appendChild(numberDiv);
        }

        document.querySelector("#cardWrapper").appendChild(cardDiv);
    })

}

function resetGame() {
    clearInterval(gameInterval);
    document.querySelector("#result").innerText = ``;
    document.querySelector("#root").innerHTML = 
    `
        <div class="card secondary-color flex-column" id="startDiv">
            <label for="numberOfPlayers" class="input-label flex-column">
                <h3 class="text">Quantidade de jogadores</h3>
                <input type="number" name="numberOfPlayers" id="numberOfPlayers" class="input-field tertiary-color" step="1" max="10" min="2" value="2">
            </label>
            <input type="button" value="jogar" id="startButton" class="button">
        </div>
    `;
    document.querySelector("#startButton").addEventListener("click", startGame);
}