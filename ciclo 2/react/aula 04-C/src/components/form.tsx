import React from "react";

export default function LoginForm(props) {
    return (
        <>
            <form action="" className="w-1/2 flex flex-col items-center">
                <label htmlFor="emailInput" id="emailLabel" className="w-fit">
                    <h2 className="w-1/2">Email</h2>
                    <input type="email" id="emailInput" className="bg-gray-400 rounded-md border-2 p-2 border-black" />
                </label>
                <label htmlFor="passwordInput" id="passwordLabel" className="w-fit">
                    <h2 className="w-fit">Password</h2>
                    <input type="password" id="passwordInput" className="bg-gray-400 rounded-md border-2 p-2 border-black" />
                </label>
                <button type="submit" className="rounded-md px-3.5 py-2.5 text-center font-semibold bg-slate-400" onClick={props.onSubmit}>Enviar</button>
            </form>

        </>
    )
}