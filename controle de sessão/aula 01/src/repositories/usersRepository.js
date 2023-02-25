import fs from "fs";


export async function getUserInfo() {
    try {
        const result = fs.readFileSync("./src/repositories/database.json")
        return JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}