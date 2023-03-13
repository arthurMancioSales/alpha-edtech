//Instancia uma nova marca
export async function createBrand(client, brand) {
    const insertBrand = `
        INSERT INTO brands (
            id, 
            name
        )
        VALUES (
            gen_random_uuid(), 
            $1
        )
        ON CONFLICT DO NOTHING`;
    await client.query(insertBrand, [brand]);
}
