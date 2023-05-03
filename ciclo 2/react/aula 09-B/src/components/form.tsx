import React, { useState } from "react";
import Button from '@mui/material/Button'

interface IFromProps {
    onSubmit: (email:string, password:string) => void
}

export default function LoginForm({onSubmit}: IFromProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <form action="" className="w-1/2 flex flex-col items-center">
                <label htmlFor="emailInput" id="emailLabel" className="w-fit">
                    <h2 className="w-1/2">Email</h2>
                    <input type="email" id="emailInput" className="bg-gray-400 rounded-md border-2 p-2 border-black" onChange={handleEmailChange} value={email} required />
                </label>
                <label htmlFor="passwordInput" id="passwordLabel" className="w-fit">
                    <h2 className="w-fit">Password</h2>
                    <input type="password" id="passwordInput" className="bg-gray-400 rounded-md border-2 p-2 border-black" onChange={handlePasswordChange} value={password} required />
                </label>
                <Button variant="contained" onClick={() => onSubmit(email, password)}> Enviar</Button>
            </form>
        </>
    )
}