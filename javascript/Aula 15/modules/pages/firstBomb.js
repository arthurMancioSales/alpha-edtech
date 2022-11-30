import EventoCustomizado from "../customEvent.js"
import CreateButton from "../components/button.js"
import CreateText from "../components/text.js"
import CreateDiv from "../components/createDiv.js"
import CreateImg from "../components/createImg.js"

let timeOut = ""
 
export default function FirstBomb() {
    const container = document.createElement("div")
    container.className = "flex-column"
    container.id = "container"

    const card1 = CreateDiv("column", true, "secondary-color")
    card1.appendChild(CreateText("subtitle", "BOMBA 1"))

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
    }))
    return container
}

window.addEventListener("pageload", (e) => {
    if(e.detail.name == "/bomba1") {
        timeOut = setTimeout(detonateBomb, 10000)
        
        document.querySelector("#bomb").onclick = () => {
            
            document.querySelector("#bomb").src = "Aula 15/src/images/bomb2.svg"
            document.querySelector("#status").innerText = "A bomba foi desarmada"
            clearTimeout(timeOut)
        }
    }

})

function detonateBomb() {
    const bomb = document.createElement("audio")
    bomb.autoplay = true
    bomb.src = "Aula 15/src/audio/explosion.mp3"
    document.querySelector("#container").appendChild(bomb)
    
    alert("A bomba explodiu")
}