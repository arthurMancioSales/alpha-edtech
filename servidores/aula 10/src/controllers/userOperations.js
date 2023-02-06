import { nanoid } from "nanoid";
import fs from "fs";

export function addUser(req, res) {
    const userID = nanoid();
    const { nome, email } = req.body;

    fs.readFile("./src/db/userList.json", (err, data) => {
        if (err) {
            res.status(500);
            res.json({
                Status: "Operação não concluída",
                Motivo: "Um erro desconhecido ocorreu no servidor",
            });
        }

        const userList = JSON.parse(data);

        //userList.usuarios.push({id: skasd, nome: alskdjalksd, email:alksdjasljkd})
        userList[`${userID}`] = { nome: nome, email: email };

        fs.writeFile(
            "./src/db/userList.json",
            JSON.stringify(userList),
            (err) => {
                if (err) {
                    res.status(500);
                    res.json({
                        Status: "Operação não concluída",
                        Motivo: "Um erro desconhecido ocorreu no servidor",
                    });
                }
                res.status(200);
                res.json({ Status: "Usuário criado com sucesso", ID: userID });
            }
        );
    });
}

export function getAllUsers(req, res) {
    fs.readFile("./src/db/userList.json", (err, data) => {
        if (err) {
            res.status(500);
            res.json({
                Status: "Operação não concluída",
                Motivo: "Um erro desconhecido ocorreu no servidor",
            });
        }

        res.status(200);
        res.json(JSON.parse(data));
    });
}

export function getSingleUser(req, res, ID) {
    fs.readFile("./src/db/userList.json", (err, data) => {
        if (err) throw err;

        const userList = JSON.parse(data);
        if (userList[ID] == undefined) {
            res.status(404);
            res.json({
                Status: "Operação não concluída",
                Motivo: "Não foi possível encontrar um usuário com esse ID",
            });
        }

        res.status(200);
        res.json(userList[ID]);
    });
}

export function updateUser(req, res, ID) {
    const { nome, email } = req.body;

    fs.readFile("./src/db/userList.json", (err, data) => {
        if (err) {
            res.status(500);
            res.json({
                Status: "Operação não concluída",
                Motivo: "Um erro desconhecido ocorreu no servidor",
            });
        }

        const userList = JSON.parse(data);
        if (userList[ID] == undefined) {
            res.status(404);
            res.json({
                Status: "Operação não concluída",
                Motivo: "Não foi possível encontrar um usuário com esse ID",
            });
        }

        userList[`${ID}`] = { nome: nome, email: email };

        fs.writeFile(
            "./src/db/userList.json",
            JSON.stringify(userList),
            (err) => {
                if (err) {
                    res.status(500);
                    res.json({
                        Status: "Operação não concluída",
                        Motivo: "Um erro desconhecido ocorreu no servidor",
                    });
                }
                res.status(200);
                res.json({ Status: "Usuário atualizado com sucesso", ID: ID });
            }
        );
    });
}

export function deleteUser(req, res, ID) {
    fs.readFile("./src/db/userList.json", (err, data) => {
        if (err) {
            res.status(500);
            res.json({
                Status: "Operação não concluída",
                Motivo: "Um erro desconhecido ocorreu no servidor",
            });
        }

        const userList = JSON.parse(data);
        if (userList[ID] == undefined) {
            res.status(404);
            res.json({
                Status: "Operação não concluída",
                Motivo: "Não foi possível encontrar um usuário com esse ID",
            });
        }

        delete userList[`${ID}`];

        fs.writeFile(
            "./src/db/userList.json",
            JSON.stringify(userList),
            (err) => {
                if (err) {
                    res.status(500);
                    res.json({
                        Status: "Operação não concluída",
                        Motivo: "Um erro desconhecido ocorreu no servidor",
                    });
                }
                res.status(200);
                res.json({ Status: "Usuário excluído com sucesso" });
            }
        );
    });
}
