import cookieParser from "cookie-parser";
import express from 'express'
import cors from 'cors'
import router from "./routes/router.js";

export class App {
    public server: express.Application

    constructor() {
        this.server = express()
        this.middleware()
        this.router()
    }

    private middleware() {
        this.server.use(cookieParser())
        this.server.use(cors())
        this.server.use(express.json())
    }

    private router() {
        this.server.use(router)
    }
}