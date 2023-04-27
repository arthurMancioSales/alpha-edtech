import { useContext, useState } from "react";
import LoginForm from "./form";
import LoginModal from "./modal";
import UserContext from "../contexts/userContext";
import iUser from "../interfaces/userInterface";


interface loginPageProps {
    onSucess: () => void;
}

export default function LoginPage({ onSucess }: loginPageProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sucess, setSucess] = useState(false);
    const {setUser} = useContext(UserContext)

    async function formSubmitted(email: string, password: string) {
        try {
            const request = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const response = await request.json()
            const data = response.data

            const user: iUser = {
                id: data.id,
                email: data.email,
                username: data.username
            }

            if (request.status !== 200) {
                setSucess(false);
                setModalIsOpen(true);
                return;
            }
            
            setUser(user)
            onSucess();
        } catch (error) {
            console.log(error)
            setSucess(false);
            setModalIsOpen(true);
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            {modalIsOpen ? (
                <LoginModal onClose={() => closeModal()} sucess={sucess} />
            ) : (
                ""
            )}
            <h1 className="text-2xl font-bold w-fit">Página de login</h1>
            <LoginForm onSubmit={formSubmitted} />
        </>
    );
}
