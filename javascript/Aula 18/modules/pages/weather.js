import CreateDiv from "../components/div.js";
import CreateText from "../components/text.js";
import CreateSelect from "../components/select.js";
import CreateButton from "../components/button.js";
import EventoCustomizado from "../customEvent.js";
import CreateImg from "../components/img.js";

export default function Weather() {
    const wrapper = CreateDiv("column", "wrapper");

    const content = CreateDiv("column", "content", true, "secondary-color");
    wrapper.appendChild(content);

    const title = CreateText("title", "pageTitle", "Previsão do Tempo");
    content.appendChild(title);

    const stateInput = CreateSelect("Estado", "stateInput", 28, "tertiary-color");

    fetchStates()
        .then((result) => {
            for (let i = 0; i < stateInput.children[1].childElementCount; i++) {
                if (i == 0) {
                    stateInput.children[1].children[i].value = "";
                    stateInput.children[1].children[i].innerHTML = "Selecione uma opção";
                } else {
                    stateInput.children[1].children[i].value = result[i - 1].id;
                    stateInput.children[1].children[i].innerHTML = result[i - 1].nome;
                }
            }
        })
        .catch((error) => (document.querySelector("#result").innerText = error));

    stateInput.children[1].onchange = showCities;
    content.appendChild(stateInput);

    const btn = CreateButton("Consultar", "apiBtn", "checkCep");
    btn.style.display = "none";
    content.appendChild(btn);

    wrapper.appendChild(CreateText("text", "result", ""));

    wrapper.appendChild(
        CreateButton("home", "homeBtn", function () {
            const route = EventoCustomizado("/Aula 18");
            document.querySelector("#root").style.cursor = "default";
            window.dispatchEvent(route);
        })
    );
    return wrapper;
}

function fetchStates() {
    return new Promise((resolve, reject) => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
            .then((response) => {
                if (response.ok) {
                    if (response.status === 200) {
                        return response.json();
                    }
                }
                reject("Erro na requisição dos dados!");
            })
            .then((json) => resolve(json));
    });
}

function showCities() {

    document.querySelector("#result").innerText = ""

    if (document.querySelector("#cityLabel") != null) {
        document.querySelector("#cityLabel").remove();

        if (document.querySelector("#weatherDiv") != null) {
            document.querySelector("#weatherDiv").remove();
        }
    }

    const cityInput = CreateSelect("Cidade", "cityInput", 0, "tertiary-color");
    cityInput.id = "cityLabel";

    fetchCities(this.value)
        .then((result) => {
            for (let i = 0; i < result.length + 1; i++) {
                const option = document.createElement("option");

                if (i == 0) {
                    option.value = "";
                    option.innerHTML = "Selecione uma opção";
                } else {
                    option.value = result[i - 1].id;
                    option.innerHTML = result[i - 1].nome;
                }

                cityInput.children[1].appendChild(option);
            }
        })
        .catch(
            (error) => (document.querySelector("#result").innerText = error)
        );

    cityInput.children[1].onchange = plotWeather;
    document.querySelector("#content").appendChild(cityInput);
}

function fetchCities(cityId) {
    return new Promise((resolve, reject) => {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cityId}/municipios?orderBy=nome`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                reject("Erro na requisição dos dados!");
            })
            .then((json) => resolve(json));
    });
}

function fetchWeather(geocode) {
    return new Promise((resolve, reject) => {
        fetch(`https://apiprevmet3.inmet.gov.br/previsao/${geocode}`)
            .then((response) => {
                if (response.ok) {
                    if (response.status === 200) {
                        return response.json();
                    }
                }
                reject("Erro na requisição dos dados!");
            })
            .then((json) => {
                const result = filterData(json);
                resolve(result);
            });
    });
}

function plotWeather() {

    document.querySelector("#result").innerText = ""

    if (document.querySelector("#weatherDiv") != null) {
        document.querySelector("#weatherDiv").remove();
    }

    const contentDiv = document.querySelector("#content");

    const weatherDiv = CreateDiv("row", "weatherDiv", false);
    weatherDiv.style.marginTop = "20px";
    contentDiv.appendChild(weatherDiv);

    fetchWeather(this.value)
        .then((result) => {
            const daysData = result["cityWeather"];
            const daysDataKeys = Object.keys(daysData);

            for (let i = 0; i < daysDataKeys.length; i++) {
                const day = daysData[daysDataKeys[i]];
                const dayDiv = CreateDiv("column", "", true, "tertiary-color");
                dayDiv.style.marginRight = "15px";
                dayDiv.style.alignSelf = "stretch";

                dayDiv.appendChild(CreateText("subtitle", "", day["diaSemana"]));
                dayDiv.appendChild(CreateImg(day["icone"]));
                dayDiv.appendChild(CreateText("text", "", daysDataKeys[i]));
                dayDiv.appendChild(CreateText("text", "", day["resumo"]));
                dayDiv.appendChild(CreateText("text","",`Temperatura máxima: ${day["tempMax"]}°`));
                dayDiv.appendChild(CreateText("text", "", `Temperatura mínima: ${day["tempMin"]}°`));

                dayDiv.childNodes.forEach(
                    (element) => (element.style.margin = " 5px 0 5px 0")
                );

                weatherDiv.appendChild(dayDiv);
            }
        })
        .catch(
            (error) => (document.querySelector("#result").innerText = error)
        );
}

function filterData(object) {
    const geocode = Object.keys(object);
    const daysData = object[geocode];
    const keys = Object.keys(object[geocode]);

    const result = {
        cityWeather: {
            [keys[0]]: {
                diaSemana: daysData[keys[0]]["manha"]["dia_semana"],
                data: keys[0],
                resumo: daysData[keys[0]]["manha"]["resumo"],
                tempMax: daysData[keys[0]]["manha"]["temp_max"],
                tempMin: daysData[keys[0]]["manha"]["temp_min"],
                icone: daysData[keys[0]]["manha"]["icone"],
            },
            [keys[1]]: {
                diaSemana: daysData[keys[1]]["manha"]["dia_semana"],
                data: keys[1],
                resumo: daysData[keys[1]]["manha"]["resumo"],
                tempMax: daysData[keys[1]]["manha"]["temp_max"],
                tempMin: daysData[keys[1]]["manha"]["temp_min"],
                icone: daysData[keys[1]]["manha"]["icone"],
            },
            [keys[2]]: {
                diaSemana: daysData[keys[2]]["dia_semana"],
                data: keys[2],
                resumo: daysData[keys[2]]["resumo"],
                tempMax: daysData[keys[2]]["temp_max"],
                tempMin: daysData[keys[2]]["temp_min"],
                icone: daysData[keys[2]]["icone"],
            },
            [keys[3]]: {
                diaSemana: daysData[keys[3]]["dia_semana"],
                data: keys[3],
                resumo: daysData[keys[3]]["resumo"],
                tempMax: daysData[keys[3]]["temp_max"],
                tempMin: daysData[keys[3]]["temp_min"],
                icone: daysData[keys[3]]["icone"],
            },
            [keys[4]]: {
                diaSemana: daysData[keys[4]]["dia_semana"],
                data: keys[4],
                resumo: daysData[keys[4]]["resumo"],
                tempMax: daysData[keys[4]]["temp_max"],
                tempMin: daysData[keys[4]]["temp_min"],
                icone: daysData[keys[4]]["icone"],
            },
        },
    };

    return result;
}
