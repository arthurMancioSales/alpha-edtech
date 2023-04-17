import React, { useState } from "react";

interface counterProps {
    onRemove: () => void;
}

export default function Contador({onRemove}: counterProps) {
    const [count, setCount] = useState(0);

    function increaseCount() {
        setCount(count + 1);
    }

    function decreaseCount() {
        setCount(count - 1);
    }

    return (
        <>
            <p>Contagem atual: {count} </p>
            <button onClick={increaseCount}>+</button>
            <button onClick={decreaseCount}>-</button>
            <button onClick={onRemove}>X</button>
        </>
    );
}
