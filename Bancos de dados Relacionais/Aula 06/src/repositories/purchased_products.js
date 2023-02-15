// Move produtos do carrinho para tabela de compras
export async function finishPurchase(client, [user]) {
    const finishPurchase = `
    INSERT INTO purchased_products (
        id,
        product_id,
        quantity,
        buyer
    )
    SELECT
        gen_random_uuid(),
        cart_product.product_id,
        cart_product.quantity,
        users.id
    FROM
        cart_product,
        users
    WHERE
        cart_product.cart_id = (
            SELECT id
            FROM cart
            WHERE cart.owner = (
                SELECT id
                FROM users
                WHERE name = $1
            )
        )
        AND users.name = $1`
    await client.query(finishPurchase, [user])
}

export async function connectOrderPurchase(client) {
    const connectOrderPurchase= `
    INSERT INTO orders_purchased_products (
        order_id,
        product_id,
        quantity
    )
    SELECT 
        orders.id,
        purchased_products.id,
        purchased_products.quantity	
    FROM
        orders,
        purchased_products
    WHERE
        orders.owner = purchased_products.buyer
    ON CONFLICT DO NOTHING`
    await client.query(connectOrderPurchase, )
}