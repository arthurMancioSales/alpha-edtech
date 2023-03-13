import SPA from "../../public/modules/spa.js";
import JWT from "jsonwebtoken";
import { config } from "dotenv";

config()

export default function authenticateUser(req, res, next) {
    try {
        const decodedSessionJWT = JWT.verify(
            req.cookies.session,
            process.env.JWT_SECRET
        );
        next();
    } catch (error) {
        res.status(403).send("acesso negado")
    }
}
