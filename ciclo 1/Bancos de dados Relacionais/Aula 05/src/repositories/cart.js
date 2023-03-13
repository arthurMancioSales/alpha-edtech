//Instancia um novo carrinho
async function setupUserCart(client, [user]) {
    const createCart = `
    INSERT INTO cart (
        id,
        created_at,
        owner
    ) 
    SELECT 
        gen_random_uuid(),
        CURRENT_TIMESTAMP(0),
        users.id
    FROM users
    WHERE users.name = $1
    ON CONFLICT DO NOTHING`;
    await client.query(createCart, [user]);
}

// Insere item no carrinho do usuário
async function insertProductOnCart(client, [user, product]) {
    const addProduct = `
    INSERT INTO cart_product (
        cart_id,
        product_id
    )
    SELECT 
        cart.id,
        products.id
    FROM 
        cart,
        products
    WHERE cart.owner=(SELECT id FROM users WHERE name=$1) 
    AND products.name= $2`;
    await client.query(addProduct, [user, product]);
}

//Filtra todos os produtos em um carrinho
async function selectProducsOnUserCart(client, [user]) {
    const selectProducts = `
    SELECT 
        products.name AS product_name, 
        products.price AS product_price, 
        products.description AS product_description, 
    FROM cart_product
    JOIN products ON cart_product.product_id=products.id
    JOIN cart ON cart_product.cart_id=cart.id
    WHERE cart.owner=(SELECT id FROM users WHERE name=$1)`;
    const res = await client.query(selectProducts, [user]);
    return res;
}

//Calcula a quantidade de todos os produtos no carrinho
async function countAllProductsOnCart(client, [user]) {
    const countProducts = `
    SELECT count(cart_id) FROM cart_product
    JOIN products ON cart_product.product_id=products.id
    JOIN cart ON cart_product.cart_id=cart.id
    WHERE cart.owner=(SELECT id FROM users WHERE name=$1)`;
    const res = await client.query(countProducts, [user]);
    return res;
}

//Soma o valor de todos os produtos no carrinho
async function getTotalPriceCart(client, [user]) {
    const sumProducts = `
    SELECT sum(price) FROM cart_product
    JOIN products ON cart_product.product_id=products.id
    JOIN cart ON cart_product.cart_id=cart.id
    WHERE cart.owner=(SELECT id FROM users WHERE name=$1)`;
    const res = await client.query(sumProducts, [user]);
    return res;
}

//Remove um produto do carrinho do usuário
async function removeProductFromUserCart(client, [product, user]) {
    const removeProductQuery = `
    DELETE FROM cart_product
    WHERE product_id=(SELECT id FROM products WHERE name=$1) 
    AND cart_id=(SELECT id FROM cart WHERE owner=(SELECT id FROM users WHERE name=$2))`;
    await client.query(removeProductQuery, [product, user]);
}

//Remove um produto de todos os carrinhos
export async function removeProductFromAllCart(client, [product]) {
    const removeProductAllQuery = `
    DELETE FROM cart_product
    WHERE product_id=(SELECT id FROM products WHERE name=$1)`;
    await client.query(removeProductAllQuery, [product]);
}
