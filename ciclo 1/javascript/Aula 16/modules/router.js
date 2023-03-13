import Principal from "./pages/mainPage.js";
import Coins from "./pages/coins.js";

const root = document.querySelector("#root")

export default function Router() {
    return {
        "/Aula 16": Principal,
        "/coins": Coins,
        getPage: function(url) {
            root.innerHTML = ""
            return this[url]()
        }
    }
}