import CreateDiv from "../components/div.js";
import CreateText from "../components/text.js";
import CreateSelect from "../components/select.js";
import CreateButton from "../components/button.js";
import EventoCustomizado from "../customEvent.js";
import CreateImg from "../components/img.js";

export default function PromiseAllDeck() {
    const wrapper = CreateDiv("column", "wrapper");

    const content = CreateDiv("column", "content", true, "secondary-color");
    wrapper.appendChild(content);

    const title = CreateText("title", "pageTitle", "Promise All Deck");
    content.appendChild(title)

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
        let numberOfCards = 5;

        const cardsDiv = CreateDiv("row", "cardsDiv", false)
        document.querySelector("#pageTitle").insertAdjacentElement("afterend", cardsDiv)
        
        const deckId = await createDeck()
        console.log(deckId)
        const requests = []
        
        for (let i = 0; i < numberOfCards; i++) {
            requests.push(fetch(`https://deckofcardsapi.com/api/deck/${deckId.deck_id}/draw/?count=1`))
        }
        console.log(requests)
        Promise.all(requests)
            .then(response => {
                response.forEach(async element => {
                    const card = await element.json()
                    const cardImg = CreateImg(card.cards[0].image, ``, "200px")
                    document.querySelector("#cardsDiv").appendChild(cardImg)
                })
            })
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
