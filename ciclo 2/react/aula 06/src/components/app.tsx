import { useState } from 'react';
import LoginPage from './login-page';
import HomePage from './homePage';

export default function App() {
    const [loged, setLoged] = useState(false)

    function changePage() {
        setLoged(true)
    }
    
    return (
        <>
            {loged ? <HomePage /> : <LoginPage onSucess={changePage} /> }
        </>
        
    )
}