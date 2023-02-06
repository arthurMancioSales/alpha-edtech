const addUserBtn = document.querySelector("#cadastrarBtn");
addUserBtn.addEventListener("click", submitUser);

const updateUserDataBtn = document.querySelector("#atualizarBtn");
updateUserDataBtn.style.display = "none";

const userName = document.querySelector("#nome-input");
const email = document.querySelector("#e-mail-input");

async function submitUser() {
    await fetch("http://localhost:8000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: userName.value,
            email: email.value,
        }),
    });
    updateUsers();
}

async function updateUsers() {
    const response = await fetch("http://localhost:8000/usuarios");
    const json = await response.json();

    const userTable = document.querySelector("#userList");
    userTable.innerHTML = "";

    for (const key in json) {
        if (Object.hasOwnProperty.call(json, key)) {
            const user = json[key];

            userTable.innerHTML += `
            <tr>
                <td class="id-number">${key}</td>
                <td class="nome">${user.nome}</td>
                <td class="e-mail">${user.email}</td>
                <td class="editar">
                    <i class="fa-solid fa-pen-to-square updateInfoIcon"></i>
                </td>
                <td class="excluir">
                    <i class="fa-solid fa-trash deleteUserIcon"></i>
                </td>
            </tr>
            `;
        }
    }

    Array.from(document.querySelectorAll(".updateInfoIcon"), (element) => {
        element.addEventListener("click", (event) => {
            selectUserForUpdate(event);
        });
    });

    Array.from(document.querySelectorAll(".deleteUserIcon"), (element) => {
        element.addEventListener("click", (event) => {
            deleteUser(event);
        });
    });
}

function selectUserForUpdate(event) {
    document.querySelector("#cadastrarBtn").style.display = "none";
    document.querySelector("#atualizarBtn").style.display = "block";
    userName.style.border = "3px lime solid";
    email.style.border = "3px lime solid";

    userName.value =
        event.target.parentElement.parentElement.children[1].innerText;
    email.value =
        event.target.parentElement.parentElement.children[2].innerText;

    const ID = event.target.parentElement.parentElement.children[0].innerText;
    console.log(ID);

    updateUserDataBtn.onclick = () => {
        updateUserData(ID);
    };
}

async function updateUserData(ID) {
    console.log(ID);

    await fetch(`http://localhost:8000/usuarios/${ID}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: userName.value,
            email: email.value,
        }),
    });

    updateUsers();
    console.log("rodando dps");

    document.querySelector("#cadastrarBtn").style.display = "block";
    document.querySelector("#atualizarBtn").style.display = "none";
    userName.style.border = "1px #353535 solid";
    email.style.border = "1px #353535 solid";
}

async function deleteUser(event) {
    const ID = event.target.parentElement.parentElement.children[0].innerText;

    await fetch(`http://localhost:8000/usuarios/${ID}`, {
        method: "DELETE",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    });

    updateUsers();
}
