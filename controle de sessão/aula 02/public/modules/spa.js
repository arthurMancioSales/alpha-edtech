// @author {Thiago}
// @coauthor {Arthur}

import login from "../pages/login.js";
import userHome from "../pages/user.js";

export default function SPA() {
  return {
    "/": login,
    "/user": userHome,

        getPage: function (url) {
            if (url == "/index.html") {
                url = "/";
            }
            return this[url]();
        },

        redirect: function (url) {
            const root = document.querySelector("#root")
            root.innerHTML = ""
            const page = this.getPage(url);
            window.history.pushState({}, "", url);
            root.appendChild(page);
        },
    };
}
