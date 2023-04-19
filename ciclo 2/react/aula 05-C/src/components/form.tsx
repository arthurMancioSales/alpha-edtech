import React, { useState } from "react";

export default function LoginForm(props) {
    const [username, setusername] = useState("")
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setusername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <form action="" className="w-1/2 flex flex-col items-center" onSubmit={(e) => props.onSubmit(e,  username, password)}>
                <label htmlFor="emailInput" id="emailLabel" className="w-fit">
                    <h2 className="w-1/2">Username</h2>
                    <input type="text" id="emailInput" className="bg-gray-400 rounded-md border-2 p-2 border-black" onChange={handleEmailChange} value={username} required />
                </label>
                <label htmlFor="passwordInput" id="passwordLabel" className="w-fit">
                    <h2 className="w-fit">Password</h2>
                    <input type="password" id="passwordInput" className="bg-gray-400 rounded-md border-2 p-2 border-black" onChange={handlePasswordChange} value={password} required />
                </label>
                <button type="submit" className="rounded-md px-3.5 py-2.5 text-center font-semibold bg-slate-400">Enviar</button>
            </form>

        </>
    )
}