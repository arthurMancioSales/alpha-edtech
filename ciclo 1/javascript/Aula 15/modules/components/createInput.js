export default function CreateInput(type, name, id, color = "tertiary-color") {
    const label = document.createElement("label")
    label.className = "input-label flex-column" 

    const labelTitle = document.createElement("h3")
    labelTitle.innerText = name
    labelTitle.className = "text"
    label.appendChild(labelTitle)

    const input = document.createElement("input")
    input.type = type
    input.className = `input-field ${color}`
    input.id = id
    label.appendChild(input)
    
    return label
}