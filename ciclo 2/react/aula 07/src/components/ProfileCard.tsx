import { useContext } from "react"
import UserContext from "../contexts/userContext"

const ProfileCard = () => {
    const userContext = useContext(UserContext)
    const user = userContext.user

    if (!user) {
        throw new Error("um erro inesperado aconteceu")
    }
    
    return (
        <div  style={{border: "1px solid black", padding: "10px", margin: "10px"}}>
            <h3>Perfil</h3>
            <p>Email: {user.email}</p>
        </div>
    )
}

export default ProfileCard