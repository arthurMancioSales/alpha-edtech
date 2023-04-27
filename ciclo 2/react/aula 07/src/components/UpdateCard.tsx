import { useContext, useState } from "react";
import LoginForm from "./form";
import UserContext from "../contexts/userContext";
import iUser from "../interfaces/userInterface";
import LoginModal from "./modal";

const UpdateCard = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sucess, setSucess] = useState(false);
    const { user, setUser } = useContext(UserContext);

    async function updateUser(email: string, password: string) {
        try {
            const request = await fetch("http://localhost:8000/users/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user?.id, email, password }),
            });

            const response = await request.json();
            const data = response.data;

            const userData: iUser = {
                id: data.id,
                email: data.email,
                username: data.username,
            };

            if (request.status !== 200) {
                setModalIsOpen(true);
            }
            setUser(userData);
        } catch (error) {
            console.log(error);
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
    );
};

export default UpdateCard;
