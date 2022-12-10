import CreateDiv from "../components/div.js";
import CreateText from "../components/text.js";
import CreateSelect from "../components/select.js";
import CreateButton from "../components/button.js";
import EventoCustomizado from "../customEvent.js";
import CreateImg from "../components/img.js";

export default function AwaitDeck() {
    const wrapper = CreateDiv("column", "wrapper");

    const content = CreateDiv("column", "content", true, "secondary-color");
    wrapper.appendChild(content);

    const title = CreateText("title", "pageTitle", "Await Deck");
    content.appendChild(title);

    const deckImg = CreateImg("Aula 19/src/images/poker-cards/Back.svg", "backCard", "250px");
    content.appendChild(deckImg);

    const button = CreateButton("pegar cartas", "deckButton", startGame);
    content.appendChild(button);

    wrapper.appendChild(
        CreateButton("home", "homeBtn", function () {
            const route = EventoCustomizado("/Aula 19");
            document.querySelector("#root").style.cursor = "default";
            window.dispatchEvent(route);
        })
    );

    wrapper.appendChild(CreateText("text", "result", ""));
    return wrapper;
}

async function startGame() {

    try {
        clearContent()
        const deckId = await createDeck()
        
        let numberOfCards = 5;
        const cardsDiv = CreateDiv("row", "cardsDiv", false)
        document.querySelector("#pageTitle").insertAdjacentElement("afterend", cardsDiv)
       
        for (let i = 0; i < numberOfCards; i++) {
            const card = await drawCards(deckId.deck_id)

            const cardImg = CreateImg(card.cards[0].image, `card${i}`, "200px")
            document.querySelector("#cardsDiv").appendChild(cardImg)
        }
    } catch (error) {
        document.querySelector("#result").innerText = error.message
    }
}

function clearContent() {
    if (document.querySelector("#cardsDiv") != null) {
        document.querySelector("#cardsDiv").remove()
    } else {
        document.querySelector("#backCard").remove()
    }
}

async function createDeck() {
    let deck = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    
    if (deck.status !== 200) {
        throw Promise.reject({message: "Não foi possível criar um novo deck"})
    } else {
        deck = await deck.json()
        return deck
    }
}

async function drawCards(deckId) {
    let card = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    
    if (card.status !== 200) {
        throw Promise.reject({message: "Não foi possível encontrar o deck informado"})
    } else {
        card = await card.json()
        return card
    }
    
}