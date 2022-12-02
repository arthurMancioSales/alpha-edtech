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

    

    const coinSelect = CreateSelect("Moeda", "coinInput", 2, "tertiary-color")

    coinSelect.children[1][0].value = "USD"
    coinSelect.children[1][0].innerHTML = "Dolar"

    coinSelect.children[1][1].value = "EUR"
    coinSelect.children[1][1].innerHTML = "Euro"

    content.appendChild(coinSelect)

    const inputDiv = CreateDiv("row", "inputDiv", false)
    content.appendChild(inputDiv)

    const startDate = CreateInput("date", "Data de início", "startDateInput", "tertiary-color")
    inputDiv.appendChild(startDate)
    const endDate = CreateInput("date", "Data de fim", "endDateInput", "tertiary-color")
    inputDiv.appendChild(endDate)

    const btn = CreateButton("verificar", "apiBtn", checkCoin)
    content.appendChild(btn)

    content.appendChild(CreateText("text", "result", ""))

    wrapper.appendChild(CreateButton("home", "homeBtn", function() {
        const route = EventoCustomizado("/Aula 16")
        document.querySelector("#root").style.cursor = "default"
        window.dispatchEvent(route)
    }))

    return wrapper;
}

function checkCoin() {
    document.querySelector("#content").style.pointerEvents = "none"
    document.querySelector("#root").style.cursor = "wait"

    document.querySelector("#result").innerText = ''

    const coin = document.querySelector('#coinInput').value

    const startDateInput = document.querySelector("#startDateInput").value
    const startDate = new Date (startDateInput)

    const endDateInput = document.querySelector("#endDateInput").value
    const endDate = new Date (endDateInput)

    try {
        if (startDate > endDate || endDate > new Date() || startDate > new Date()) {
            document.querySelector("#content").style.pointerEvents = ""
            document.querySelector("#root").style.cursor = "default"
            throw "Selecione uma data válida"
        } 
        else if (dateDifference(startDate, endDate) > 360) {
            document.querySelector("#content").style.pointerEvents = ""
            document.querySelector("#root").style.cursor = "default"
            throw "A diferença entre as datas não pode ser maior que 360 dias"
        }

        fetch(`https://economia.awesomeapi.com.br/json/daily/${coin}-BRL/${dateDifference(startDate, endDate)+1}?start_date=${startDateInput.replaceAll("-","")}&end_date=${endDateInput.replaceAll("-", "")}`)
            .then(response => {
                document.querySelector("#content").style.pointerEvents = ""
                document.querySelector("#root").style.cursor = "default"
                return response.json()
            })
            .then(data => {
                plotData(data)
            })

    } catch (error) {
        document.querySelector("#result").innerText = error
    }

}

function dateDifference(date1, date2) {
    return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24) 
}

function plotData(data) {
    
    const table = document.createElement("table")
    table.id = "coinTable"
    
    const tableRow = document.createElement("tr")
    
    for (let i = 0; i < 5; i++) {
        const tableHeader = document.createElement("th")
        switch (i) {
            case 0:
                tableHeader.innerHTML = "Data e hora"
                break
            case 1:
                tableHeader.innerHTML = "Valor máximo"
                break
            case 2:
                tableHeader.innerHTML = "Valor mínimo"
                break
            case 3:
                tableHeader.innerHTML = "Valor de venda"
                break
            case 4:
                tableHeader.innerHTML = "Valor de compra"
        }
        tableRow.appendChild(tableHeader)
    }
    
    table.appendChild(tableRow)

    data.forEach(element => {

        const tableRow = document.createElement("tr")
        const values = Object.keys(element)

        values.forEach((e, i) => {

            const tableData = document.createElement("td")

            if (e == "bid" || e == "ask" || e == "low" || e == "high") {
                tableData.innerHTML = element[e]
                tableRow.appendChild(tableData)
            } else if (e == "timestamp") {
                const date = new Date(parseInt(`${element[e]}000`))
                tableData.innerHTML = date.toLocaleString()
                tableRow.insertAdjacentElement("afterbegin", tableData)
            }
        });
        
        table.appendChild(tableRow)

    });

    const root = document.querySelector("#root") 

    if (root.childElementCount != 1) {
        root.removeChild(root.lastChild)
    }
    
    document.querySelector("#root").appendChild(table)
}