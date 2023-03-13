import Router from "./modules/router.js";

const root = document.querySelector("#root")

const routes = Router()
root.appendChild(routes.getPage("/Aula 19"))

window.addEventListener("onstatechange", (e) => {
    
    const page = routes.getPage(e.detail.url)
    history.pushState({}, "", e.detail.url)
    root.appendChild(page)
    const pageLoaded = new CustomEvent("pageload", {detail: {name: e.detail.url}})
    window.dispatchEvent(pageLoaded)
})