export default function CreateText(type, id, textContent) {
    switch (type) {
        case "title":
            const title = document.createElement("h2");
            title.innerText = textContent
            title.className = "title"
            title.id = id
            return title;
        case "subtitle":
            const subtitle = document.createElement("h3");
            subtitle.innerText = textContent
            subtitle.className = "subtitle"
            subtitle.id = id
            return subtitle;
        case "text":
            const text = document.createElement("p");
            text.innerText = textContent
            text.className = "text"
            text.id = id
            return text;
    }
}
