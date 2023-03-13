import EventoCustomizado from "../customEvent.js"

export default function Principal() {
    const container = document.createElement("div")
    container.className = "flex-column"

    const paragraph = document.createElement("p")
    paragraph.className = "title"
    paragraph.innerText = "Bem-vindo a Doceria Sem Nome"
    
    const btnWrapper = document.createElement("div")
    btnWrapper.className = "flex-row"

    const brigadeiroBtn = document.createElement("input")
    brigadeiroBtn.type = "button"
    brigadeiroBtn.value = "brigadeiros"
    brigadeiroBtn.className = "button"
    brigadeiroBtn.onclick = function() {
        const route = EventoCustomizado(`/${this.value}`)
        window.dispatchEvent(route)
    }
    btnWrapper.appendChild(brigadeiroBtn)

    const cupcakeBtn = document.createElement("input")
    cupcakeBtn.type = "button"
    cupcakeBtn.value = "cupcakes"
    cupcakeBtn.className = "button"
    cupcakeBtn.onclick = function() {
        const route = EventoCustomizado(`/${this.value}`)
        window.dispatchEvent(route)
    }
    btnWrapper.appendChild(cupcakeBtn)

    const doceBtn = document.createElement("input")
    doceBtn.type = "button"
    doceBtn.value = "doces"
    doceBtn.className = "button"
    doceBtn.onclick = function() {
        const route = EventoCustomizado(`/${this.value}`)
        window.dispatchEvent(route)
    }
    btnWrapper.appendChild(doceBtn)

    container.appendChild(paragraph)
    container.appendChild(btnWrapper)

    return container
}