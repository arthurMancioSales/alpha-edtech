import express from "express";
import router from "./src/routes/users.js";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/usuarios", router);

app.use(function (req, res) {
    res.status(404).send("Não foi possível encontrar o recurso especificado");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
