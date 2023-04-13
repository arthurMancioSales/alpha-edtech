import React from "react"
import LoginForm from "./form"
import LoginModal from "./modal"

export default function LoginPage() {
    const modalIsOpen = false

    function formSubmitted() {
        alert("Na próxima aula, clicar aqui vai abrir o modal!")
    }

    return (
        <>
            {modalIsOpen ? <LoginModal /> : ''}
            <h1 className="text-2xl font-bold w-fit">Página de login</h1>
            <LoginForm onSubmit={formSubmitted} />
        </>
    )
}