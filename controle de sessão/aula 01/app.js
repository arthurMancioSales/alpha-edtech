import express from "express";
import { config } from "dotenv";
import router from "./src/router.js"
import authenticateUser from "./src/lib/authenticateUser.js";
import cookieParser from "cookie-parser";

config();

const app = express();
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.get(`/user`, (req, res) => {
    res.sendFile("/public/index.html", { root: "./" });
});

app.use("/", express.static("./public"));

app.use("/session", router)

app.listen(port, () => {
    console.log(`server running on http://${process.env.SERVER}:${port}`);
})