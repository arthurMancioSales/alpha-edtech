import EventoCustomizado from "../customEvent.js";
import CreateButton from "../components/button.js";
import CreateText from "../components/text.js";
import CreateDiv from "../components/createDiv.js";
import CreateImg from "../components/createImg.js";
import CreateInput from "../components/createInput.js";
import CreateSelect from "../components/createSelect.js";

let timeOut = ""
let countDown = ""
let time = 0
let finalTime = 0

export default function Alarm() {
    const wrapper = CreateDiv("column", false)

    const card1 = CreateDiv("column", true, "secondary-color");
    card1.id = "container";
    card1.appendChild(CreateText("subtitle", "Alarme"));
    wrapper.appendChild(card1)

    const div = CreateDiv("row", false);
    card1.appendChild(div);

    const minutesSelect = CreateSelect("Minutos", "minutesInput");
    div.appendChild(minutesSelect);
    for (let i = 0; i < 60; i++) {
        const option = document.createElement("option")
        option.value = i
        option.innerHTML = i
        minutesSelect.children[1].appendChild(option)
    }

    const secondsSelect = CreateSelect("Segundos", "secondsInput");
    div.appendChild(secondsSelect);
    for (let i = 0; i < 60; i++) {
        const option = document.createElement("option")
        option.value = i
        option.innerHTML = i
        secondsSelect.children[1].appendChild(option)
    }

    const btn = CreateButton("inciar", startTimer);
    btn.id = "startBtn";
    card1.appendChild(btn);

    const text = CreateText("text", "")
    text.id = "result"

    wrapper.appendChild(CreateButton("home", function() {
        const route = EventoCustomizado("/Aula 15")
        window.dispatchEvent(route)
        clearTimeout(timeOut)
        clearInterval(countDown)
    }))

    card1.appendChild(text)
    return wrapper;
}

function startTimer() {
    const btn = document.querySelector("#startBtn");
    btn.onclick = stopTimer
    btn.value = "parar"
    
    const minutesInput = document.querySelector("#minutesInput")
    const secondsInput = document.querySelector("#secondsInput")

    let minutesValue = parseInt(minutesInput.value)
    const secondsValue = parseInt(secondsInput.value)

    time = minutesValue * 60 + secondsValue
    finalTime = time*0.05

    timeOut = setTimeout(timer, time*1000 + 2000)
    countDown = setInterval(timerUpdate, 1000)
}

function stopTimer() {
    const btn = document.querySelector("#startBtn");
    btn.onclick = startTimer
    btn.value = "iniciar"

    clearTimeout(timeOut)
    clearInterval(countDown)
    if (time <= 0) {
        document.querySelector("#alarmSound").parentNode.removeChild(document.querySelector("#alarmSound"))
    }
    const container = document.querySelector("#container") 
    container.style="border: none"
}

function timer() {
    clearInterval(countDown)

    const alarm = document.createElement("audio")
    alarm.src = "Aula 15/src/audio/alarmSound.mp3"
    alarm.id = "alarmSound"
    alarm.autoplay = true
    alarm.loop = true
    document.querySelector("#root").appendChild(alarm)
    alert("Deu o tempo!")
}

function timerUpdate() {
    const result = document.querySelector("#result")
    result.innerText = `${twoDigitNumber(Math.floor(time/60).toString())}:${twoDigitNumber((time%60).toString())}`
    time--

    const tick = document.createElement("audio")
    tick.id = "alarmTick"
    tick.src = "Aula 15/src/audio/clockTick.mp3"
    tick.autoplay = true
    document.querySelector("#root").appendChild(tick)
    if (time <= finalTime) {
        const container = document.querySelector("#container") 
        container.style="border: 1px solid crimson"
    }
}

function twoDigitNumber(num) {
    if(num.length == 1) {
        return num = `0${num}`
    } else {
        return num
    }
}