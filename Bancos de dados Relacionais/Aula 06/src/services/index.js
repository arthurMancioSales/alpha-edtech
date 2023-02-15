import { createOrder } from "../repositories/order.js";
import { finishPurchase, connectOrderPurchase } from "../repositories/purchased_products.js";
import pool from '../repositories/connection.js'
import { readProduct } from '../repositories/products.js'

async function registerOrder([user]) {
    await pool.connect()
    try {
        await pool.query('BEGIN')

        await createOrder(pool, [user])

        await finishPurchase(pool, [user])

        await connectOrderPurchase()

        await pool.query('COMMIT')
    } catch (error) {
        await pool.query('ROLLBACK')
    } finally {
        await pool.release()
    }
}


console.table(await readProduct(pool, ['', 'material escolar']))