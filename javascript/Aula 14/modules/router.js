import Principal from "./pages/mainPage.js";
import Brigadeiros from "./pages/brigadeiroPage.js";
import Doces from "./pages/docesPage.js"
import Cupcakes from "./pages/cupcakePage.js"
import {root} from "../index.js"

export default function Router() {
    return {
        "/": Principal,
        "/brigadeiros": Brigadeiros,
        "/cupcakes": Cupcakes,
        "/doces": Doces,
        getPage: function(url) {
            root.innerHTML = ""
            return this[url]()
        }
    }
}