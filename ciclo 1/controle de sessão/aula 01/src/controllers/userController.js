import SPA from "../../public/modules/spa.js";
import * as userService from "../services/userService.js"

const spa = SPA()

export async function logUser(req, res) {
    const { email, password } = req.body

    if (email == undefined || typeof email != "string") {
        response.message = "Informe um email válido";
        response.data = null;
        response.error = "Email inválido";

        res.status(403).json(response);
        return;
    }
    if (password == undefined || typeof password != "string") {
        response.message = "Informe uma senha válida";
        response.data = null;
        response.error = "Senha inválida";

        res.status(403).json(response);
        return;
    }

    try {
        const serviceResponse = await userService.logUser(email, password)
        if (isNaN(serviceResponse)) {
            res.status(403).send("Não foi possível completar o login")
        } else {
            res.status(200).cookie("id", serviceResponse, { maxAge: 300000 }).json({'status': "Login completado com sucesso"});
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getUserInfo(req, res) {

    const userID = req.params.id

    if (userID == "undefined") {
        res.status(403).json({"Status": "Não foi possível encontrar o usuário especificado"})
    }

    try {
        const serviceResponse = await userService.getUserInfo(userID)

        if (serviceResponse == "none") {
            res.status(403)
        } else {
            res.status(200).json(serviceResponse)
        }
    } catch (error) {
        
    }
}

