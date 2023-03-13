import * as userRepository from "../repositories/usersRepository.js"

export async function logUser(email, password) {
    try {
        const dbResponse = await userRepository.getUserInfo()
        let id = "false"

        dbResponse.forEach(user => {
            if (user.email == email) {
                if (user.senha == password) {
                    id = parseInt(user.id)
                }
            }
        });

        return id
    } catch (error) {
        console.log(error);
    }
}

export async function getUserInfo(userID) {
    try {
        const dbResponse = await userRepository.getUserInfo()
        
        let response = "none"

        dbResponse.forEach(user => {
            if (user.id == userID) {
                response = user
            }
        });

        return response
    } catch (error) {
        console.log(error);
    }
}