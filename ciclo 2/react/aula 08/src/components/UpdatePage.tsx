import { useContext, useState } from "react";
import LoginForm from "./form";
import Modal from "./modal";
import UserContext from "../contexts/userContext";
import iUser from "../interfaces/userInterface";
import { Navigate } from "react-router-dom";

const UpdatePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [updated, setUpdated] = useState(false);
    const {user, setUser} = useContext(UserContext);

    async function updateUser(email: string, password: string) {
        try {
            console.log(user)
            const request = await fetch("http://localhost:8000/users/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user?.id, email, password }),
            });

            if (request.status !== 200) {
                setModalContent("Não foi possível atualizar o usuário, tente novamente")
                setModalIsOpen(true);
            }

            const response = await request.json();
            const data = response.data;

            const userData: iUser = {
                id: data.id,
                email: data.email,
                username: data.username,
            };

            setUser(userData);
            setUpdated(true)
        } catch (error) {
            console.log(error);
            setModalContent(`${error}`)
            setModalIsOpen(true);
        }
    }
    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            {user ? "" : <Navigate to={"/"} />}
            {updated ? (
                <Navigate to={"/home"} />
            ) : (
                <>
                    {modalIsOpen ? (
                        <Modal onClose={() => closeModal()} message={modalContent} />
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
                        <h3>Atualizar</h3>
                        <LoginForm onSubmit={updateUser} />
                    </div>
                </>
            )}
        </>
    );
};

export default UpdatePage;
