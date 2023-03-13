//Remove uma determinada categoria
export async function deleteCategory(client, product_name) {
    const removeCategory = `
    DELETE FROM categories_product
    WHERE product_id =(SELECT id FROM products WHERE name=$1)`;
    await client.query(removeCategory, [product_name]);
}
//Instancia uma nova
export async function createCategories(client, [name, categories]) {
    categories.forEach(async (category) => {
        const insertCategory = `
        INSERT INTO categories (
            id, 
            name
        )
        VALUES (
            gen_random_uuid(), 
            $1
        )
        ON CONFLICT DO NOTHING`;
        await client.query(insertCategory, [category]);

        const connectProductCategory = `
        INSERT INTO categories_product (
            category_id,
            product_id
        ) SELECT
            categories.id, 
            products.id
        FROM products, categories
        WHERE products.name = $1 AND categories.name = $2
        ON CONFLICT DO NOTHING`;
        await client.query(connectProductCategory, [name, category]);
    });
}