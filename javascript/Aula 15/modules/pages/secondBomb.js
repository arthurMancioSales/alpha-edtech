import EventoCustomizado from "../customEvent.js"
import CreateButton from "../components/button.js"
import CreateText from "../components/text.js"
import CreateDiv from "../components/createDiv.js"
import CreateImg from "../components/createImg.js"

let timeOut = ""
let countDown = ""
let i = 60

export default function SecondBomb() {
    const container = document.createElement("div")
    container.className = "flex-column"
    container.id = "container"

    const card1 = CreateDiv("column", true, "secondary-color")
    card1.appendChild(CreateText("subtitle", "BOMBA 2"))

    const img = CreateImg("https://www.svgrepo.com/show/288938/bomb.svg", "150px")
    img.id = "bomb"
    card1.appendChild(img)

    const statusText = CreateText("text", "A bomba está armada")
    statusText.id = "status" 
    card1.appendChild(statusText)

    container.appendChild(card1)
    
    container.appendChild(CreateButton("home", function() {
        const route = EventoCustomizado("/Aula 15")
        window.dispatchEvent(route)
        clearTimeout(timeOut)
        clearInterval(countDown)
    }))
    i = 60

    return container
}

window.addEventListener("pageload", (e) => {
    if(e.detail.name == "/bomba2") {
        countDown = setInterval(bombTimer, 1000)
        timeOut = setTimeout(detonateBomb, 62000)
        document.querySelector("#bomb").onclick = () => {
            
            document.querySelector("#bomb").src = "Aula 15/src/images/bomb2.svg"
            document.querySelector("#status").innerText = "A bomba foi desarmada"
            clearTimeout(timeOut)
            clearInterval(countDown)
        }
    }

})

function detonateBomb() {
    const bomb = document.createElement("audio")
    bomb.autoplay = true
    bomb.src = "Aula 15/src/audio/explosion.mp3"
    document.querySelector("#container").appendChild(bomb)
    clearInterval(countDown)

    alert("A bomba explodiu")
}

function bombTimer() {
    const bomb = document.createElement("audio")
    bomb.src = "Aula 15/src/audio/countdown.mp3"
    bomb.autoplay = true
    document.querySelector("#status").innerText = `A bomba está armada!\n ${i} segundos restantes`
    i--
}