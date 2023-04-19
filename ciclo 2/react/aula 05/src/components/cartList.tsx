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
    }, [])

    const balance = 50

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

                {product.title}{" "}

                <DeleteProductButton
                    productId={product.id}
                />
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