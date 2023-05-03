import { useState } from 'react';
import UserContext from '../contexts/userContext';
import iUser from '../interfaces/userInterface';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './login-page';
import RegisterPage from './RegisterPage';
import HomePage from './homePage';
import UpdatePage from './UpdatePage';

export default function App() {
    const [user, setUser] = useState<iUser | null>(null)

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage />
        },
        {
            path: "/register",
            element: <RegisterPage />
        },
        {
            path: "/home",
            element: <HomePage />
        },
        {
            path: "/update",
            element: <UpdatePage />
        }
    ])
    
    return (
        <>
            <UserContext.Provider value={{user, setUser}}>
                <RouterProvider router={router} />
            </UserContext.Provider>
        </>
        
    )
}