export default function CreateText(type, textContent) {
    switch (type) {
        case "title":
            const title = document.createElement("h2");
            title.innerText = textContent
            title.className = "title"
            return title;
        case "subtitle":
            const subtitle = document.createElement("h3");
            subtitle.innerText = textContent
            subtitle.className = "subtitle"
            return subtitle;
        case "text":
            const text = document.createElement("p");
            text.innerText = textContent
            text.className = "text"
            return text;
    }
}
