export default function CreateButton(value, id, onclick = "") {
    const btn = document.createElement("input");
    btn.type = "button";
    btn.id = id;
    btn.value = value;
    btn.className = "button";
    btn.onclick = onclick;
    return btn;
}
