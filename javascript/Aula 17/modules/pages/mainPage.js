import EventoCustomizado from "../customEvent.js"
import CreateButton from "../components/button.js"
import CreateText from "../components/text.js"
import CreateDiv from "../components/div.js"

export default function Principal() {
    const container = document.createElement("div")
    container.className = "flex-row cards-container"

    const card1 = CreateDiv("column", "card", true, "secondary-color")
    card1.appendChild(CreateText("subtitle", "pageTitle", "Verificar CEP"))
    card1.appendChild(CreateButton("acessar", "coinBtn", function() {
        const route = EventoCustomizado("/cep")
        window.dispatchEvent(route)
    }))

    container.appendChild(card1)
    return container
}