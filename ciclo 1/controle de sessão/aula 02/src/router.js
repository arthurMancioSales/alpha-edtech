import { Router } from "express";
import * as userController from "./controllers/userController.js";

const router = Router();

router.post("/", userController.logUser);

router.post("/userInfo", userController.getUserInfo);

router.post("/logout", (req, res) => {
    res.clearCookie("session");
    res.send("Sessão terminada com sucesso!");
});

router.post("/createUser", userController.createUser);



export default router;
