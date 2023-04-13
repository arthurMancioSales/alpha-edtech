import React from "react";

export default function LoginForm() {
    return (
        <>
            <form action="" className="w-1/2">
                <label htmlFor="emailInput" id="emailLabel" className="w-3/4">
                    <h2 className="w-fit">Email</h2>
                    <input type="email" id="emailInput" className="bg-gray-400 rounded-md border-2 p-2 border-black" />
                </label>
                <label htmlFor="passwordInput" id="passwordLabel" className="w-3/4">
                    <h2 className="w-fit">Password</h2>
                    <input type="password" id="passwordInput" className="bg-gray-400 rounded-md border-2 p-2 border-black" />
                </label>
            </form>
        </>
    )
}