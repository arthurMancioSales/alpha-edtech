import Router from "./modules/router.js";

export const root = document.querySelector("#root")

const routes = Router()
root.appendChild(routes.getPage("/"))

window.addEventListener("onstatechange", (e) => {
    
    const page = routes.getPage(e.detail.url)
    history.pushState({}, "", e.detail.url)
    root.appendChild(page)
})