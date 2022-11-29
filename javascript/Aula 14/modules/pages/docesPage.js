import EventoCustomizado from "../customEvent.js"

export default function Doces() {
    const container = document.createElement("div")
    container.className = "flex-column"

    const title = document.createElement("p")
    title.className = "title"
    title.innerText = "Conheça nossos doces"

    const paragraph = document.createElement("p")
    paragraph.className = "text"
    paragraph.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, expedita laborum perferendis officia magni itaque perspiciatis. Consequatur minus culpa asperiores, porro possimus dicta consectetur repudiandae temporibus quia, facere earum distinctio?"
    

    const homeBtn = document.createElement("input")
    homeBtn.type = "button"
    homeBtn.value = "página principal"
    homeBtn.className = "button"
    homeBtn.onclick = function() {
        const route = EventoCustomizado('/')
        window.dispatchEvent(route)
    }

    container.appendChild(title)
    container.appendChild(paragraph)
    container.appendChild(homeBtn)

    return container
}