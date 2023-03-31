import { UserData } from "../interfaces/interfaces.js"
import userService from "../services/userService.js"
import { Request, Response } from "express"

export default class userController {
    private service: userService

    constructor() {
        this.service = new userService()
    }

    public async createUser(req: Request, res: Response) {
        const {name, email, password}: UserData = req.body

        const serviceResponse = await this.service.createUser({name, email, password})

        if (serviceResponse.errors) {
            return res.status(500).json(serviceResponse)
        }

        return res.status(200).json(serviceResponse)
    }

    public async logUser(req: Request, res: Response) {
        const {email, password}: UserData = req.body

        const serviceResponse = await this.service.logUser(email, password)
        
        if (serviceResponse.errors) {
            return res.status(500).json(serviceResponse)
        }

        res.cookie("sessionID", serviceResponse.data)
        return res.status(200).json(serviceResponse)
    }

    public async updateUser(req: Request, res: Response) {
        const {name, email, password}: UserData = req.body
        const { sessionID } = req.cookies

        const serviceResponse = await this.service.updateUser({name, email, password}, sessionID)

        if (serviceResponse.errors) {
            return res.status(500).json(serviceResponse)
        }

        return res.status(200).json(serviceResponse)
    }
} 