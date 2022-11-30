import EventoCustomizado from "../customEvent.js"
import CreateButton from "../components/button.js"
import CreateText from "../components/text.js"
import CreateDiv from "../components/createDiv.js"

export default function Principal() {
    const container = document.createElement("div")
    container.className = "flex-row cards-container"

    const card1 = CreateDiv("column", true, "secondary-color")
    card1.appendChild(CreateText("subtitle", "Bomba 1"))
    card1.appendChild(CreateButton("acessar", function() {
        const route = EventoCustomizado("/bomba1")
        window.dispatchEvent(route)
    }))

    const card2 = CreateDiv("column", true, "secondary-color")
    card2.appendChild(CreateText("subtitle", "Bomba 2"))
    card2.appendChild(CreateButton("acessar", function() {
        const route = EventoCustomizado("/bomba2")
        window.dispatchEvent(route)
    }))

    const card3 = CreateDiv("column", true, "secondary-color")
    card3.appendChild(CreateText("subtitle", "Alarme"))
    card3.appendChild(CreateButton("acessar", function() {
        const route = EventoCustomizado("/alarm")
        window.dispatchEvent(route)
    }))
    
    container.appendChild(card1)
    container.appendChild(card2)
    container.appendChild(card3)
    return container
}