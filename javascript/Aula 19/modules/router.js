import Principal from "./pages/mainPage.js";
import AwaitDeck from "./pages/awaitDeck.js";
import PromiseAllDeck from "./pages/promiseAllDeck.js";

const root = document.querySelector("#root")

export default function Router() {
    return {
        "/Aula 19": Principal,
        "/await deck": AwaitDeck,
        "/promise all deck": PromiseAllDeck,
        getPage: function(url) {
            root.innerHTML = ""
            return this[url]()
        }
    }
}