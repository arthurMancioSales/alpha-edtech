import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import CartList from "./components/cartList";

function App() {
    alert("Início da renderização do componente App")
    return (
        <div>
            <CartList />
        </div>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
