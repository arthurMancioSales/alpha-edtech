import SPA from "../modules/spa.js";

const spa = SPA();

export default function userHome() {
    const outDiv = document.createElement("div");

    const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("session="))
    ?.split("=")[1];

    fetch(`http://localhost:8000/session/userInfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jwt: cookieValue,
        }),
    })
        .then((res) => {
            if (res.status != 200) {
                throw "Não foi possível encontrar o usuário";
            }
            return res.json();
        })
        .then((user) => {
            console.log(user);
            const heading = document.createElement("h1");
            const name = document.createElement("p");
            const email = document.createElement("p");
            const id = document.createElement("p");
            const type = document.createElement("p");

            heading.textContent = "Informações do Usuário";
            name.textContent = `Nome: ${user.usuario}`;
            email.textContent = `Email: ${user.email}`;
            id.textContent = `ID: ${user.id}`;
            type.textContent = `Tipo: ${user.tipo}`;

            const logoutBtn = document.createElement("input");
            logoutBtn.type = "button";
            logoutBtn.value = "logout";
            logoutBtn.onclick = async () => {
                await fetch("http://localhost:8000/session/logout", {
                    method: "POST",
                });
                spa.redirect("/");
            };

            outDiv.appendChild(heading);
            outDiv.appendChild(name);
            outDiv.appendChild(email);
            outDiv.appendChild(id);
            outDiv.appendChild(type);
            outDiv.appendChild(logoutBtn);
        })
        .catch((error) => {
            const heading = document.createElement("h1");
            console.log(error);
            heading.textContent = "Não foi possível encontrar o usuário";
            outDiv.appendChild(heading);
        });

    return outDiv;
}
