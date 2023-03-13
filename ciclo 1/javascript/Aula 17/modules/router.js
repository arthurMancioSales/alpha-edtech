import Principal from "./pages/mainPage.js";
import Cep from "./pages/cep.js";

const root = document.querySelector("#root")

export default function Router() {
    return {
        "/Aula 17": Principal,
        "/cep": Cep,
        getPage: function(url) {
            root.innerHTML = ""
            return this[url]()
        }
    }
}