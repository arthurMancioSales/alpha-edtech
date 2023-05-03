import { useState } from "react";
import LoginForm from "./form";
import useModal from "./modal";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
    const [ EasyModal, openModal ] = useModal()
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
                openModal()

                return;
            }

            setCreated(true);
        } catch (error) {
            console.log(error);
            openModal()
        }
    }

    return (
        <>
            {created ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <EasyModal />
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
