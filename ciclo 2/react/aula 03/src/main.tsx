import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

function App() {
    const cart = [
        { id: 1111, name: "teste 01", price: 10 },
        { id: 2222, name: "teste 02", price: 20 },
        { id: 3333, name: "teste 03", price: 30 },
        { id: 4444, name: "teste 04", price: 40 },
    ];
    const balance: number = 50;

    // seu código daqui pra baixo

    function deleteProduct(productName: string) {
        document.querySelector(`#${productName}`)?.remove();
        alert(`o produto com id ${productName} foi removido`);
    }

    interface IproductDelete {
        productId: string;
    }

    function DeleteProductButton(props: IproductDelete) {
        return (
            <button onClick={() => deleteProduct(props.productId)}>
                Remover
            </button>
        );
    }

    const listItems = cart.map((product) => {
        return (
            <li id={`${product.name[0]}${product.id}`} key={product.id}>

                {product.name}{" "}

                <DeleteProductButton
                    productId={`${product.name[0]}${product.id}`}
                />
            </li>
        );
    });
    let totalPrice: number = 0;

    cart.forEach((product) => (totalPrice += product.price));

    return (
        <>
            <h1>Meu carrinho</h1>

            {totalPrice > balance ? <p>Saldo insuficiente</p> : ""}

            <ul>{listItems}</ul>
        </>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
