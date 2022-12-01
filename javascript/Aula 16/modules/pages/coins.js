import CreateDiv from "../components/div.js";
import CreateText from "../components/text.js";
import CreateInput from "../components/input.js"
import CreateSelect from "../components/select.js"
import CreateButton from "../components/button.js";
import EventoCustomizado from "../customEvent.js";

export default function Coins() {
    const wrapper = CreateDiv("column", "wrapper")

    const content = CreateDiv("column", "content", true, "secondary-color")
    wrapper.appendChild(content)

    const title = CreateText("title", "pageTitle", "Consulta de cotação")
    content.appendChild(title)

    const coinSelect = CreateSelect("Moeda", "coinInput", 3, "tertiary-color")
    coinSelect.children[1][0].value = "real"
    coinSelect.children[1][0].innerHTML = "Real"

    coinSelect.children[1][1].value = "dolar"
    coinSelect.children[1][1].innerHTML = "Dolar"

    coinSelect.children[1][2].value = "euro"
    coinSelect.children[1][2].innerHTML = "Euro"

    content.appendChild(coinSelect)

    const inputDiv = CreateDiv("row", "inputDiv", false)
    content.appendChild(inputDiv)

    const startDate = CreateInput("date", "Data de início", "startDateInput", "tertiary-color")
    inputDiv.appendChild(startDate)
    const endDate = CreateInput("date", "Data de fim", "endDateInput", "tertiary-color")
    inputDiv.appendChild(endDate)

    const btn = CreateButton("verificar", "apiBtn", checkCoin)
    content.appendChild(btn)

    wrapper.appendChild(CreateButton("home", "homeBtn", function() {
        const route = EventoCustomizado("/Aula 16")
        document.querySelector("#root").style.cursor = "default"
        window.dispatchEvent(route)
    }))

    return wrapper;
}

function checkCoin() {
    document.querySelector("#root").style.cursor = "wait"
}