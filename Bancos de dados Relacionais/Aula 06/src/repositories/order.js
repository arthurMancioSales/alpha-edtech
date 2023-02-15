// Cria cabeçalho do pedido
export async function createOrder(client, [user]) {
    const createOrder = `
    INSERT INTO orders (
        id,
        status,
        address,
        created_at,
        owner
    ) 
    SELECT 
        gen_random_uuid(),
        'pending',
        users.address,
        CURRENT_TIMESTAMP(0),
        users.id
    FROM
        users
    WHERE users.name=$1`;
    await client.query(createOrder, [user]);
}
