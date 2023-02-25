import * as userRepository from "../repositories/usersRepository.js";
import bcrypt from "bcrypt";

export async function logUser(email, password) {
    try {
        const dbResponse = await userRepository.getUserInfo();
        const response = { ok: false };

        for (let i = 0; i < dbResponse.length; i++) {
            const user = dbResponse[i];
            if (user.email == email) {
                const login = await bcrypt.compare(password, user.senha);
                if (login) {
                    response.ok = true;
                    response.id = user.id;
                    response.tipo = user.tipo;
                    response.nome = user.nome;
                    response.email = user.email;
                    break;
                }
            }
        }

        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserInfo(userID) {
    try {
        const dbResponse = await userRepository.getUserInfo();

        let response = "none";

        dbResponse.forEach((user) => {
            if (user.id == userID) {
                response = user;
            }
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(username, email, password, type) {
    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const dbResponse = await userRepository.createUser(
            username,
            email,
            passwordHash,
            type
        );


        return dbResponse;
    } catch (error) {
        console.log("error caught at");
        throw error;
    }
}
