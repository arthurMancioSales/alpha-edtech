import { createCategories, deleteCategory } from "./categories.js";
import { removeProductFromAllCart } from "./cart.js";
import { createBrand } from "./brand.js";

// Instancia novo produto
async function createProduct(
    pool,
    [name, brand, price, description, quantity, categories]
) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await createBrand(client, brand);

        const insertProduct = `
        INSERT INTO products (
            id, 
            name, 
            brand, 
            price, 
            description, 
            created_at, 
            quantity
        ) 
        SELECT 
            gen_random_uuid(), 
            $1, 
            brands.id, 
            $3, 
            $4, 
            CURRENT_TIMESTAMP(0), 
            $5
        FROM brands
        WHERE brands.name = $2
        ON CONFLICT (name) DO UPDATE
        SET quantity = products.quantity + EXCLUDED.quantity
        RETURNING 'Produto já cadastrado'`;
        await client.query(insertProduct, [
            name,
            brand,
            price,
            description,
            quantity,
        ]);

        await createCategories(client, [name, categories]);

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.log(error);
    } finally {
        client.release();
    }
}

// Filtra produtos com base em marca e categoria
async function readProduct(pool, [brand, categories]) {
    const client = await pool.connect();
    try {
        const readProduct = `
        SELECT 
            products.name AS product_name, 
            products.price AS product_price,
            products.description AS product_description, 
            products.quantity AS product_quantity, 
            brands.name AS brand_name, categories.name AS category_name
        FROM products
        JOIN brands ON products.brand = brands.id
        JOIN categories_product ON products.id = categories_product.product_id
        JOIN categories ON categories_product.category_id = categories.id
        WHERE brands.name = $1 AND categories.name = $2
        ORDER BY price ASC`;
        const res = await client.query(readProduct, [brand, categories]);
        console.log("Resultado leitura de produtos:\n", res.rows);
        return res;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

//Atualiza as informações de um produto
async function updateProduct(
    pool,
    [old_name, new_name, brand, price, description, quantity, categories]
) {
    const client = await pool.connect();

    try {
        await createBrand(client, brand);

        const updateProduct = `
        UPDATE products
        SET name=$2, brand=(SELECT id FROM brands WHERE name = $3), price=$4, 
        description=$5, updated_at=CURRENT_TIMESTAMP(0), quantity=$6
        WHERE products.name = $1`;
        await client.query(updateProduct, [
            old_name,
            new_name,
            brand,
            price,
            description,
            quantity,
        ]);

        await deleteCategory(client, new_name);

        await createCategories(client, [new_name, categories]);
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

//Apaga um produto
async function deleteProduct(pool, [product_name]) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await removeProductFromAllCart(pool, [product_name]);

        await deleteCategory(client, product_name);

        const deleteProduct = `
        DELETE FROM products
        WHERE name =  $1`;
        await client.query(deleteProduct, [product_name]);

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.log(error);
    } finally {
        client.release();
    }
}
