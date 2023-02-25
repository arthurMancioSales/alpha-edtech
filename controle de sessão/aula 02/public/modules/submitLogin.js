// @author {Arthur}
export default async function submitLogin() {
    const emailInput = document.querySelector("#login");
    const passwordInput = document.querySelector("#password");

    const login = await fetch("http://localhost:8000/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
        }),
    });
    
    return login
}
