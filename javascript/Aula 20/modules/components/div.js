export default function CreateDiv(orientation, id, card = false, color = "") {
    const div = document.createElement("div");
    div.id = id;

    if (card) {
        div.className = `card ${color}`;
    }

    switch (orientation) {
        case "column":
            div.className += " flex-column";
            break;
        case "row":
            div.className += " flex-row";
            break;
    }

    return div;
}
