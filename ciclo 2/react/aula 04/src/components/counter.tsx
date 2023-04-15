import React, { useState } from "react";

export default function Contador() {
    const [count, setCount] = useState(0)

    function increaseCount() {
        setCount(count + 1)
    }
    
    function decreaseCount() {
        setCount(count - 1)
    }

    return (
        <>
            <p>Contagem atual: {count} </p>
            <button onClick={increaseCount} >+</button>
            <button onClick={decreaseCount} >-</button>
        </>
    )
}