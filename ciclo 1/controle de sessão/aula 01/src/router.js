import { Router } from "express";
import * as userController from "./controllers/userController.js";

const router = Router();

router.post("/", userController.logUser);

router.get("/:id", userController.getUserInfo);

router.post("/logout", (req, res) => {
    res.clearCookie("id");
    res.send("Sessão terminada com sucesso!");
});



export default router;
