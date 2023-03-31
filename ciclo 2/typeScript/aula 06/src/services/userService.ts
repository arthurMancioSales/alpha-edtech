import { log } from "console";
import { UserData } from "../interfaces/interfaces.js";
import userRepository from "../repositories/userRepository.js";
import { UserValidator } from "../validators/validator.js";

export default class userService {
    private repository: userRepository

    constructor() {
        this.repository = new userRepository
    }

    public async createUser(user: UserData) {
        const userCheck = new UserValidator(user.name, user.email, user.password)

        if (!userCheck.valid) {
            const response = {
                data: null,
                errors: "Invalid user"
            }
            return response
        }

        const newUser = await this.repository.createUser(user)
        
        return newUser
    }

    public async updateUser(user: UserData, id: number) {
        const userCheck = new UserValidator(user.name, user.email, user.password)

        if (!userCheck.valid) {
            const response = {
                data: null,
                errors: "Invalid user"
            }
            return response
        }

        if (isNaN(id)) {
            const response = {
                data: null,
                errors: "Invalid id"
            }
            return response
        }

        const updatedUser = await this.repository.updateUser(user, id)
        
        return updatedUser
    }

    public async logUser(email: string, password:string) {

        if (typeof(email) != "string" || typeof(password) != "string") {
            const response = {
                data: null,
                errors: "Invalid email or password"
            }
            return response
        }

        const logUser = await this.repository.getUser(email)

        if (!logUser.data) {
            const response = {
                data: null,
                errors: "An error has ocurred"
            }
            return response
        }

        if (logUser.data[0].password != password) {
            const response = {
                data: null,
                errors: "Email or password wrong"
            }
            return response
        }

        const response = {
            data: logUser.data[0].id,
            errors: null
        }
        
        return response
    }
}