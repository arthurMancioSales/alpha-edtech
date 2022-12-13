export default function CreateSelect(name, id, qnt, color = "tertiary-color") {
    const label = document.createElement("label");
    label.className = "input-label flex-column";

    const labelTitle = document.createElement("h3");
    labelTitle.innerText = name;
    labelTitle.className = "text";
    label.appendChild(labelTitle);

    const input = document.createElement("select");
    input.className = `input-field ${color}`;
    input.id = id;
    label.appendChild(input);

    for (let i = 0; i < qnt; i++) {
        const opt = document.createElement("option")
        input.appendChild(opt)
    } 
    
    return label;
}
