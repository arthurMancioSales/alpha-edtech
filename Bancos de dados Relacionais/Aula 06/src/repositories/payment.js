//Adiciona novo método de pagamento
async function addNewPayment(client, [paymentMethod]) {
    const createPayment = `
    INSERT INTO payment (
        id,
        type
    )
    VALUES (
        gen_random_uuid(),
        $1
    )`;
    await client.query(createPayment, [paymentMethod]);
}

//Associa um usuário a um método de pagamento
async function addUserPayment(client, [user, payment]) {
    const addUserPaymentRelation = `
    INSERT INTO users_payment (
        user_id,
        payment_id
    ) SELECT
        users.id, 
        payment.id
    FROM users, payment
    WHERE user.name = $1 AND payment.name = $2`;
    await client.query(addUserPaymentRelation, [user, payment]);
}
