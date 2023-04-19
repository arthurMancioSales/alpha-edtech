import React, { useState } from 'react';
import LoginPage from './login-page';
import HomePage from './homePage';

export default function App(props) {
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