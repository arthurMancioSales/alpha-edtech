import React, { useState } from "react";

export default function CartList() {
    const cart = [
        { id: 1111, name: "teste 01", price: 10 },
        { id: 2222, name: "teste 02", price: 20 },
        { id: 3333, name: "teste 03", price: 30 },
        { id: 4444, name: "teste 04", price: 40 },
    ];
    const balance: number = 50;

    // seu código daqui pra baixo
    const [cartList, setCartList] = useState(cart)

    function deleteProduct(productId: number) {
        const newCart = cartList.filter((product) => product.id != productId)
        setCartList(newCart)
    }

    function DeleteProductButton(props: IproductDelete) {
        return (
            <button onClick={() => deleteProduct(props.productId)}>
                Remover
            </button>
        );
    }

    interface IproductDelete {
        productId: number;
    }

    const listItems = cartList.map((product) => {
        return (
            <li key={product.id}>

                {product.name}{" "}

                <DeleteProductButton
                    productId={product.id}
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