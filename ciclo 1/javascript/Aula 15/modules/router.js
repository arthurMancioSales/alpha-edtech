import Principal from "./pages/mainPage.js";
import FirstBomb from "./pages/firstBomb.js";
import Alarm from "./pages/alarm.js"
import SecondBomb from "./pages/secondBomb.js"

const root = document.querySelector("#root")

export default function Router() {
    return {
        "/Aula 15": Principal,
        "/bomba1": FirstBomb,
        "/bomba2": SecondBomb,
        "/alarm": Alarm,
        getPage: function(url) {
            root.innerHTML = ""
            return this[url]()
        }
    }
}