import { createAddress } from "./addresses.js"

// Instancia novo usuário
export async function createUser(client, [name, email, phone, password, address]) {
    await createAddress(client, address)

    const addUser= `
    INSERT INTO users (
        id,
        name,
        email,
        phone,
        password,
        address
    )
    SELECT 
        gen_random_uuid(),
        $1,
        $2,
        $3,
        $4,
        addresses.id
    FROM addresses
    WHERE addresses.address = $5
    ON CONFLICT DO NOTHING`
    await client.query(addUser, [name, email, phone, password, address])
}