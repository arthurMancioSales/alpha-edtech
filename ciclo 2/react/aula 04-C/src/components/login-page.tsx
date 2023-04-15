import React, { useState } from "react"
import LoginForm from "./form"
import LoginModal from "./modal"

export default function LoginPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function formSubmitted(e: React.FormEvent) {
        e.preventDefault()
        setModalIsOpen(true)
    }
    
    function closeModal() {
        setModalIsOpen(false)
    }

    return (
        <>
            {modalIsOpen ? <LoginModal onClose={closeModal} /> : ''}
            <h1 className="text-2xl font-bold w-fit">Página de login</h1>
            <LoginForm onSubmit={formSubmitted} />
        </>
    )
}