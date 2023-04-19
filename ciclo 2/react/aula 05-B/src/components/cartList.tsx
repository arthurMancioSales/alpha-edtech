import React, { useEffect, useState } from "react";

export default function CartList() {
    interface cart {
        category: string;
        description: string;
        id: number;
        image: string;
        price: number;
        rating: {rate: number, count: number};
        title: string;
    }

    const [cartList, setCartList] = useState<cart[]>([])

    useEffect(() => {
        async function getCartList() {
            const res = await fetch('https://fakestoreapi.com/products?limit=5')
            const data: Array<cart> = await res.json()
            setCartList(data)
        }

        getCartList()

        return () => {
            setCartList([])
        }
    }, [cartList])

    const balance = 50

    function deleteProduct(productId: number) {
        const newCart = cartList.filter((product) => product.id != productId)
        setCartList(newCart)
    }

    const listItems = cartList.map((product) => {
        return (
            <li key={product.id}>

                {product.title}{" "}
                
                <button onClick={() => deleteProduct(product.id)}>
                    Remover
                </button>
            </li>
        );
    });
    let totalPrice: number = 0;

    cartList.forEach((product) => (totalPrice += product.price));

    return (
        <>
            <h1>Meu carrinho</h1>

            {totalPrice > balance ? <p>Saldo insuficiente</p> : ""}

            <ul>{listItems}</ul>
        </>
    );
}