import EventoCustomizado from "../customEvent.js"
import CreateButton from "../components/button.js"
import CreateText from "../components/text.js"
import CreateDiv from "../components/div.js"

export default function Principal() {
    const container = CreateDiv("row", "container", false)
    
    const card1 = CreateDiv("column", "card", true, "secondary-color")
    card1.appendChild(CreateText("subtitle", "page1Title", "Async Await deck"))
    
    const card2 = CreateDiv("column", "card", true, "secondary-color")
    card2.appendChild(CreateText("subtitle", "page2Title", "Promise All Deck"))
    
    card1.appendChild(CreateButton("acessar", "awaitBtn", function() {
        const route = EventoCustomizado("/await deck")
        window.dispatchEvent(route)
    }))

    card2.appendChild(CreateButton("acessar", "promiseBtn", function() {
        const route = EventoCustomizado("/promise all deck")
        window.dispatchEvent(route)
    }))

    container.appendChild(card1)
    container.appendChild(card2)
    return container
}