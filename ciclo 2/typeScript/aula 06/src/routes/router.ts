import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router()
const user = new userController()

// Rota para cadastro
router.post("/accounts", (req, res) => {
    user.createUser(req, res)
})
// Recebe: email, name e password;
// Retorna: id, email, name;

// Rota para login
router.post("/accounts/login", (req, res) => {
    user.logUser(req, res)
})
// Recebe: email e password;
// Retorna: id;
// Cookie: token = sessionID

// Rota para update
router.patch("/accounts", (req, res) => {
    user.updateUser(req, res)
})
// Recebe: email, name e/ou password;
// Retorna: id, email, name; 

export default router
