import { EmailInput, NameInput, PasswordInput } from "./index.js"

interface APIResponse<T> {
    data: T,
    errors: Array<string>
}

interface UserData {
    name: string,
    email: string,
    password: string
}

interface LoginData {
    id: string
}

async function signUpUser(user: UserData) {
    const body = {
        name: user.name,
        email: user.email,
        password: user.password
    }

    const options: RequestInit = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }

    try {
        validateOperation()
        const signUp: APIResponse<LoginData> = await fetch("/accounts", options).then((data) => data.json())
        console.log(signUp);
    } catch (error) {
        console.log(error);
    }
}

async function signInUser(user:UserData) {
    const body = {
        email: user.email,
        password: user.password
    }

    const options: RequestInit = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }

    try {
        validateOperation()
        const signIn: APIResponse<LoginData> = await fetch("/accounts/login", options).then((data) => data.json())
        console.log(signIn);
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(user:UserData) {
    const body = {
        name: user.name,
        email: user.email,
        password: user.password
    }

    const options: RequestInit = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }

    try {
        validateOperation()
        const updateUser: APIResponse<LoginData> = await fetch("/accounts", options).then((data) => data.json())
        console.log(updateUser);
    } catch (error) {
        console.log(error);
    }
}

function validateOperation():void {
    const name = querySelectorAs("#nameInput", NameInput)
    const email = querySelectorAs("#emailInput", EmailInput) 
    const password = querySelectorAs("#passwordInput", PasswordInput)
    
    if (!name.value || !email.value || !password.value) {
        throw new Error("Algum dos inputs não foi preenchido")
    }
}

function querySelectorAs<T extends Element>(selector:string, clazz: new () => T) {
    const element = document.querySelector(selector)
    if(!(element instanceof clazz)) {
        throw new Error("Elemento não encontrado")
    }

    return element
}

const signUpButton = document.querySelector("#signUpButton")

signUpButton?.addEventListener("click", (e) => {
    const name = querySelectorAs("#nameInput", NameInput)
    const email = querySelectorAs("#emailInput", EmailInput) 
    const password = querySelectorAs("#passwordInput", PasswordInput)

    const user: UserData = {
        name: name.value,
        email: email.value,
        password: password.value
    }


    signUpUser(user)
})

const signInButton = document.querySelector("#signInButton")

signInButton?.addEventListener("click", (e) => {
    const name = querySelectorAs("#nameInput", NameInput)
    const email = querySelectorAs("#emailInput", EmailInput) 
    const password = querySelectorAs("#passwordInput", PasswordInput)

    const user: UserData = {
        email: email.value,
        name: name.value,
        password: password.value
    }


    signInUser(user)
})

const updateButton = document.querySelector("#updateButton")

updateButton?.addEventListener("click", (e) => {
    const name = querySelectorAs("#nameInput", NameInput)
    const email = querySelectorAs("#emailInput", EmailInput) 
    const password = querySelectorAs("#passwordInput", PasswordInput)

    const user = {
        email: email.value,
        name: name.value,
        password: password.value
    } satisfies UserData


    updateUser(user)
})