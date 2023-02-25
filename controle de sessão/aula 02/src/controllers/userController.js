import SPA from "../../public/modules/spa.js";
import * as userService from "../services/userService.js";
import JWT from "jsonwebtoken";
import { config } from "dotenv";

config();

const spa = SPA();

export async function logUser(req, res) {
    const { email, password } = req.body;

    if (email == undefined || typeof email != "string") {
        res.status(403).json(response);
        return;
    }
    if (password == undefined || typeof password != "string") {
        res.status(403).json(response);
        return;
    }

    try {
        const serviceResponse = await userService.logUser(email, password);
        if (serviceResponse.ok) {
            const sessionJWT = JWT.sign(
                {
                    usuario: serviceResponse.nome,
                    email: serviceResponse.email,
                    id: serviceResponse.id,
                    tipo: serviceResponse.tipo,
                },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            res.status(200)
                .cookie("session", sessionJWT)
                .json({ status: "Login completado com sucesso" });
        } else {
            res.status(403).send("Não foi possível completar o login");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getUserInfo(req, res) {
    const { jwt } = req.body;

    try {
        const userInfo = JWT.decode(jwt);
        res.status(200).json(userInfo);
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(req, res) {
    const { username, email, password, type } = req.body;

    if (username.length == 0 || typeof username != "string") {
        res.status(400).send("Nome usuário inválido");
        return;
    }
    if (email.length == 0 || typeof email != "string") {
        res.status(400).send("Email inválido");
        return;
    }
    if (password.length == 0 || typeof password != "string") {
        res.status(400).send("Senha inválida");
        return;
    }

    try {
        const serviceResponse = await userService.createUser(
            username,
            email,
            password,
            type
        );
        console.log("service", serviceResponse);
        res.status(200).send("usuário criado com sucesso");
    } catch (error) {
        console.log(error);

        res.status(500).send("não foi possível criar o usuário");
    }
}
