import { createContext } from "react";
import iUser from "../interfaces/userInterface";

interface IUserContext {
    user: iUser | null,
    setUser: React.Dispatch<React.SetStateAction<iUser | null>>
}

const UserContext = createContext({} as IUserContext)

export default UserContext