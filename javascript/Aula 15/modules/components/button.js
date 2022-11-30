export default function CreateButton(value, onclick = "") {
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = value;
    btn.className = "button";
    btn.onclick = onclick;
    return btn;
}
