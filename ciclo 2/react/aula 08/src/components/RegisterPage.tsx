import { useState } from "react";
import LoginForm from "./form";
import LoginModal from "./modal";
import { Navigate, redirect } from "react-router-dom";

const RegisterPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [created, setCreated] = useState(false);

    async function updateUser(email: string, password: string) {
        try {
            const request = await fetch(
                "http://localhost:8000/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (request.status !== 200) {
                setModalContent(
                    "Não foi possível registrar o usuário, tente novamente"
                );
                setModalIsOpen(true);
                return;
            }

            setCreated(true);
        } catch (error) {
            console.log(error);
            setModalContent(`${error}`);
            setModalIsOpen(true);
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            {created ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    {modalIsOpen ? (
                        <LoginModal
                            onClose={() => closeModal()}
                            message={modalContent}
                        />
                    ) : (
                        ""
                    )}
                    <div
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            margin: "10px",
                        }}
                    >
                        <h3>Cadastrar</h3>
                        <LoginForm onSubmit={updateUser} />
                    </div>
                </>
            )}
        </>
    );
};

export default RegisterPage;
