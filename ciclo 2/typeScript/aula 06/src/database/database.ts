import pg from "pg";
import { config } from "dotenv";

config()

export default class databaseConnection {
    private pool
    constructor() {
        this.pool = new pg.Pool({
            user: process.env.DBUSER,
            host: process.env.DBHOST,
            database: process.env.DBNAME,
            password: process.env.DBPASSWORD,
            port: Number(process.env.DBPORT),
            max: 20,
            idleTimeoutMillis: 100,
        })
    }

    get connection() {
        return this.pool
    }
}