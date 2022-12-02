import CreateDiv from "../components/div.js";
import CreateText from "../components/text.js";
import CreateInput from "../components/input.js";
import CreateSelect from "../components/select.js";
import CreateButton from "../components/button.js";
import EventoCustomizado from "../customEvent.js";

let cep = 0;
let userLat = ""
let userLng = ""

export default function Cep() {
    const wrapper = CreateDiv("column", "wrapper");

    const content = CreateDiv("column", "content", true, "secondary-color");
    wrapper.appendChild(content);

    const title = CreateText("title", "pageTitle", "Consultar CEP");
    content.appendChild(title);

    const cepInput = CreateInput(
        "text",
        "CEP (apenas números)",
        "cepInput",
        "tertiary-color"
    );
    cepInput.children[1].oninput = checkInput;
    content.appendChild(cepInput);

    const btn = CreateButton("Consultar", "apiBtn", checkCep);
    content.appendChild(btn);

    content.appendChild(CreateText("text", "result", ""));

    wrapper.appendChild(
        CreateButton("home", "homeBtn", function () {
            const route = EventoCustomizado("/Aula 17");
            document.querySelector("#root").style.cursor = "default";
            window.dispatchEvent(route);
        })
    );
    return wrapper;
}

function checkCep() {

    document.querySelector("#content").style.pointerEvents = "none"
    document.querySelector("#root").style.cursor = "wait"
    
    cep = 0;
    document.querySelector("#result").innerText = "";
    
    try {
        
        if (document.querySelector("#cepInput").value.length < 8) {
            throw "Digite um CEP válido"
        }

        fetch(`https://cep.awesomeapi.com.br/json/${document.querySelector("#cepInput").value}`)
            .then(response => {
                try {
                    if (response.status != 200) {
                        throw response.statusText;
                    } else {
                        return response.json()
                    }
                } catch (error) {
                    document.querySelector("#content").style.pointerEvents = ""
                    document.querySelector("#root").style.cursor = "default"
                    document.querySelector("#result").innerText = 'CEP inválido!';
                }
            })
            .then(data => {
                if (typeof(data) == "undefined") {
                    return
                } else {
                    plotData(data)
                    document.querySelector("#content").style.pointerEvents = ""
                    document.querySelector("#root").style.cursor = "default"
                }
            });

    } catch (error) {
        
        document.querySelector("#result").innerText = error;
    
    }
    
}

const cepValidation = /[^0-9]/gm;

function checkInput(e) {
    e.target.value = e.target.value.replaceAll(cepValidation, "");

    if (e.target.value.length == 8) {
        cep = e.target.value;
    } else if (e.target.value.length > 8) {
        e.target.value = cep;
    }
}

function plotData(data) {
    userLat = data.lat
    userLng = data.lng

    const root = document.querySelector("#root")
    if (root.children.length == 2) {
        root.removeChild(root.lastChild)
        root.parentNode.removeChild(root.parentNode.lastChild)
    }

    const wrapper = CreateDiv("column", "dataWrapper", false)
    root.appendChild(wrapper)
    
    const dataDiv = CreateDiv("column", "dataDiv", true, "secondary-color")
    wrapper.appendChild(dataDiv)
    dataDiv.style.alignItems = "flex-start"
    dataDiv.style.lineHeight = "1.5"
    
    const map = document.createElement("iframe")
    map.id = "map"
    map.style.display = "none"
    root.parentElement.appendChild(map)

    wrapper.appendChild(CreateButton("ver mapa", "mapBtn", showMap))

    const title = CreateText("title", "dataTitle", `CEP ${data.cep}`)
    title.style.alignSelf = "center"
    dataDiv.appendChild(title)

    console.log(data)

    const address = CreateText("text", "address", ``)
    address.innerHTML = `<span>Endereço:</span> ${data.address}`
    dataDiv.appendChild(address)
     
    const district = CreateText("text", "district", ``)
    district.innerHTML = `<span>Bairro:</span> ${data.district}`
    dataDiv.appendChild(district)
     
    const city = CreateText("text", "city", ``)
    city.innerHTML = `<span>Cidade:</span> ${data.city}`
    dataDiv.appendChild(city)
     
    const state = CreateText("text", "state", ``)
    state.innerHTML = `<span>Estado:</span> ${data.state}`
    dataDiv.appendChild(state)
     
    const lng = CreateText("text", "lng", ``)
    lng.innerHTML = `<span>Longitude:</span> ${data.lng}`
    dataDiv.appendChild(lng)
     
    const lat = CreateText("text", "lat", ``)
    lat.innerHTML = `<span>Latitude:</span> ${data.lat}`
    dataDiv.appendChild(lat)
     
    const span = document.querySelectorAll("span")

    span.forEach(e => {
        e.style.fontWeight = "600"
        e.style.fontSize = "1.6rem"
        e.style.color = "var(--text-color)"
    })
}

function showMap() {
    const map = document.querySelector("#map")
    map.src = `https://maps.google.com/maps?q=${userLat},${userLng}&hl=pt&z=14&output=embed`
    map.style.display = ""
    map.style.width = "85%"
    map.style.height = "500px"
    
    console.log("test")
}