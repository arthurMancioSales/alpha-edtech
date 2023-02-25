import fs from "fs";


export async function getUserInfo() {
    try {
        const result = fs.readFileSync("./src/repositories/database.json")
        return JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(username, email, passwordHash, type) {
    try {
        fs.readFile("./src/repositories/database.json", (err, data) => {
            if (err) throw err

            const users = JSON.parse(data)

            const userId = users.length+1

            const newUser = {
                id: userId,
                nome: username,
                email: email,
                tipo: type,
                senha: passwordHash
            }

            users.push(newUser)

            fs.writeFile("./src/repositories/database.json", JSON.stringify(users), () => {
                return "Operação concluída"
            })
        })
    } catch (error) {
        console.log(error);
    }
}