import { useContext } from "react"
import ProfileCard from "./ProfileCard"
import UserContext from "../contexts/userContext"
import { Link, Navigate } from "react-router-dom"

export default function HomePage() {
    const { user } = useContext(UserContext)
    return (
        <>
            {user ? "" : <Navigate to={"/"} />}
            <h1>Home: sua página logada</h1>
            <ProfileCard/>
            <button>
                <Link to={"/update"}> Atualizar </Link>
            </button>

            <button >
                <Link to={"/"}> Sair </Link>
            </button>
        </>
    )
}