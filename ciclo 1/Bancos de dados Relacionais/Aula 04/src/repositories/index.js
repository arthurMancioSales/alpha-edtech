import pg from "pg";
import { config } from "dotenv";

config();

const pool = new pg.Pool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.USER_PASSWORD,
    max: "20",
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

async function createProduct(
    pool,
    [name, brand, price, description, quantity, categories]
) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

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
        ON CONFLICT (name) DO NOTHING
        RETURNING 'Produto já cadastrado'`;
        await client.query(insertProduct, [
            name,
            brand,
            price,
            description,
            quantity,
        ]);

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
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.log(error);
    } finally {
        client.release();
    }
}

async function readProduct(pool, [brand, categories]) {
    const client = await pool.connect();
    try {
        const readProduct = `
        SELECT *
        FROM products
        JOIN brands ON products.brand = brands.id
        JOIN categories_product ON products.id = categories_product.product_id
        JOIN categories ON categories_product.category_id = categories.id
        WHERE brands.name = $1 AND categories.name = $2
        ORDER BY price ASC`;
        const res = await client.query(readProduct, [brand, categories]);
        console.log(res.rows);
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

async function updateProduct(
    pool,
    [old_name, new_name, brand, price, description, quantity, categories]
) {
    const client = await pool.connect();

    try {
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
            await client.query(connectProductCategory, [old_name, category]);
        });
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

async function deleteProduct(pool, [product_name]) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const removeCategory = `
        DELETE FROM categories_product
        WHERE product_id =(SELECT id FROM products WHERE name=$1)`;
        await client.query(removeCategory, [product_name]);

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
