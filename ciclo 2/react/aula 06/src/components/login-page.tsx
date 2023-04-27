import { useState } from "react";
import LoginForm from "./form";
import LoginModal from "./modal";


interface loginPageProps {
    onSucess: () => void;
}

export default function LoginPage({ onSucess }: loginPageProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sucess, setSucess] = useState(false);

    async function formSubmitted(username: string, password: string) {
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            console.log(response.status);

            if (response.status !== 200) {
                setSucess(false);
                setModalIsOpen(true);
                return;
            }
            onSucess();
        } catch (error) {
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
