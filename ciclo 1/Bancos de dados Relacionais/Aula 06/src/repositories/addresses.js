// Instancia novo endereço
export async function createAddress(client, address) {
    const addAddress = `
    INSERT INTO addresses (
        id,
        address
    )
    VALUES (
        gen_random_uuid(),
        $1
    )
    ON CONFLICT DO NOTHING`
    await client.query(addAddress, [address])
}