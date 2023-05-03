import { useContext, useState } from "react";
import LoginForm from "./form";
import Modal from "./modal";
import UserContext from "../contexts/userContext";
import iUser from "../interfaces/userInterface";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const {user, setUser} = useContext(UserContext)

    async function formSubmitted(email: string, password: string) {
        try {
            const request = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (request.status !== 200) {
                setModalContent("Não foi possível realizar o login, tente novamente");
                setModalIsOpen(true);
                return;
            }

            const response = await request.json()
            const data = response.data
            
            const userData: iUser = {
                id: data.id,
                email: data.email,
                username: data.username
            }
            setUser(userData)
        } catch (error) {
            console.log(error)
            setModalContent(`${error}`);
            setModalIsOpen(true);
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            {user ? <Navigate to={"/home"} /> : (
                <>
                {modalIsOpen ? (
                    <Modal onClose={() => closeModal()} message={modalContent} />
                ) : (
                    ""
                )}
                <h1 className="text-2xl font-bold w-fit">Página de login</h1>
                <LoginForm onSubmit={formSubmitted} />
                <a href="/register"><strong>Cadastre-se </strong></a>
            </>
            )}
        </>
        
    );
}
