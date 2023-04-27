import { useState } from 'react';
import LoginPage from './login-page';
import HomePage from './homePage';
import UserContext from '../contexts/userContext';
import iUser from '../interfaces/userInterface';

export default function App() {
    const [loged, setLoged] = useState(false)
    const [user, setUser] = useState<iUser | null>(null)

    function changePage() {
        setLoged(true)
    }
    
    return (
        <>
            <UserContext.Provider value={{user, setUser}}>
                {loged ? <HomePage /> : <LoginPage onSucess={changePage} /> }
            </UserContext.Provider>
        </>
        
    )
}