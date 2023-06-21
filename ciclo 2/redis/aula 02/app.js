import express from "express";
import pg from "pg";
import { config } from "dotenv";
import { Redis } from "ioredis";

const { Pool } = pg

config()

const app = express();

app.use(express.json())

app.post("/books", async (req, res) => {
    const bookTitle = req.body.title;
    
    if (!bookTitle || typeof(bookTitle) != "string") {
        return res.status(400).json({
            error: "Insira um título válido",
            data: null
        })
    }

    try {
        const pool = new pg.Pool()

        const client = await pool.connect()

        const response = await client.query(
            `INSERT INTO books (title)
                VALUES ($1)`,
            [bookTitle]
        )

        const redis = new Redis()

        const cache = await redis.del("books")

        return res.status(200).json({
            error: null,
            data: null,
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: "Um erro desconhecido aconteceu",
            data: null
        })
    }
}) 

app.get("/books", async (req, res) => {
    try {
        const redis = new Redis()

        const cache = await redis.get("books")

        if (!cache) {
            const pool = new pg.Pool()
    
            const client = await pool.connect()
    
            const response = await client.query(
                `SELECT * FROM books`
            )

            await redis.set("books", JSON.stringify(response.rows))
            await redis.expire("books", 5)

            return res.status(200).json({
                error: null,
                data: response.rows,
            })
        }

        return res.status(200).json({
            error: null,
            data: JSON.parse(cache),
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: "Um erro desconhecido aconteceu",
            data: null
        })
    }
})

app.listen(3000, () => {
    console.log(`Server running on localhost:3000`);
})