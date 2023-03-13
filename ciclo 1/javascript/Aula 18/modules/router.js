import Principal from "./pages/mainPage.js";
import Weather from "./pages/weather.js";

const root = document.querySelector("#root")

export default function Router() {
    return {
        "/Aula 18": Principal,
        "/weather": Weather,
        getPage: function(url) {
            root.innerHTML = ""
            return this[url]()
        }
    }
}