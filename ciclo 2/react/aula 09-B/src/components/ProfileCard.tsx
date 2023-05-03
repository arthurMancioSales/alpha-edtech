import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { Navigate } from "react-router-dom"

const ProfileCard = () => {
    const userContext = useContext(UserContext)
    const user = userContext.user
    console.log(user)
    if (!user) {
        return (
            <>
                <Navigate to={"/"} />
            </>
        )
    }
    
    return (
        <div  style={{border: "1px solid black", padding: "10px", margin: "10px"}}>
            <h3>Perfil</h3>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
        </div>
    )
}

export default ProfileCard