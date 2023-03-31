import { QueryResult } from "pg";
import databaseConnection from "../database/database.js";
import { LoginData, UserData } from "../interfaces/interfaces.js";


export default class userRepository {
    private db: databaseConnection 
    
    constructor() {
        this.db = new databaseConnection()
    }

    public async getUser(email: string) {
        try {
            const query = `
                SELECT * FROM 
                    accounts
                WHERE 
                    email = $1`

            const userInfo = await this.db.connection.query(query, [email])

            const response = {
                data: userInfo.rows,
                errors: null
            }

            return response
        } catch (error) {
            const response = {
                data: null,
                errors: error
            }

            return response
        }
    }

    public async createUser(user:UserData) {
        try {
            const query = `
                INSERT INTO accounts (
                    email,
                    name,
                    password
                )
                VALUES (
                    $1,
                    $2,
                    $3
                )
                RETURNING id, name, email`

            const newUser = await this.db.connection.query(query, [user.email, user.name, user.password])
            const response = {
                data: newUser.rows,
                errors: null
            }

            return response
        } catch (error) {
            console.log(error)
            const response = {
                data: null,
                errors: error
            }

            return response
        }
    }

    public async updateUser(user:UserData, id: number) {
        try {
            const query = `
                UPDATE accounts SET 
                    email = $1,
                    name = $2,
                    password = $3
                WHERE
                    id = $4
                RETURNING id, name, email`

            const updatedUser = await this.db.connection.query(query, [user.email, user.name, user.password, id])

            const response = {
                data: updatedUser.rows,
                errors: null
            }

            return response
        } catch (error) {
            const response = {
                data: null,
                errors: error
            }

            return response
        }
    }
}