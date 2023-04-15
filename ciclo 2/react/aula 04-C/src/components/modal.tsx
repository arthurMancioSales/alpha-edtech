import React from "react";

export default function LoginModal(props) {
    
    
    function stopPropagation(event) {
        event.stopPropagation()
    }

    return (
        <div className="bg-opacity-75 bg-black w-full h-full flex justify-center items-center absolute z-10" onClick={props.onClose}>
            <div className="bg-white w-1/2 h-3/4 text-center flex items-center justify-center" onClick={stopPropagation}>
                Login enviado com sucesso!
            </div>
        </div>
    )
}