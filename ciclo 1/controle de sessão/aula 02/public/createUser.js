const form = document.querySelector("#form")
form.onsubmit = (e) => {
    newUser(e)
}

async function newUser(e) {
    console.log("a");
    e.preventDefault()

    const usernameInput = document.querySelector("#userName");
    const emailInput = document.querySelector("#userEmail");
    const emailConfirmInput = document.querySelector("#userEmailConfirm");
    const passwordInput = document.querySelector("#userPass");
    const passwordConfirmInput = document.querySelector("#userPassConf");
    const userTypeInput = document.querySelector("#userType");

    validateInput(usernameInput);
    validateInput(emailInput);
    validateInput(emailConfirmInput);
    validateInput(passwordInput);
    validateInput(passwordConfirmInput);

    if (emailInput.value != emailConfirmInput.value) {
        document.querySelector("#loginResult").innerText = "Emails divergentes"
    }

    if (passwordInput.value != passwordConfirmInput.value) {
        document.querySelector("#loginResult").innerText = "Senhas divergentes"
    }

    const response = await fetch("http://localhost:8000/session/createUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            type: userTypeInput.value
        }),
    });

    const result = await response.json()


}

function validateInput(field) {
    if (field.value == "") {
        field.classList.add("campoInvalido");
        field.classList.remove("campoValido");
    } else {
        field.classList.remove("campoInvalido");
        field.classList.add("campoValido");
    }
}
