import React, { useState } from "react";
import Contador from "./counter";

export default function CounterList() {
    const [list, setList] = useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ]);

    function removeCounter(counterId: number) {
        const newList = list.filter((i) => i.id != counterId);
        setList(newList);
    }

    return (
        <>
            {list.map((i) => <Contador onRemove={() => removeCounter(i.id)} />) }
        </>
    )
}
