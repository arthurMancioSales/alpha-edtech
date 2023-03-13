import express from "express";
import {
    addUser,
    deleteUser,
    getAllUsers,
    getSingleUser,
    updateUser,
} from "../controllers/userOperations.js";

const router = express.Router();

//Get all users
router.get("/", (req, res) => {
    getAllUsers(req, res);
});

//Get specific users
router.get("/:id", (req, res) => {
    getSingleUser(req, res, req.params.id);
});

//Create a new user
router.post("/", (req, res) => {
    addUser(req, res);
});

//Update user info
router.put("/:id", (req, res) => {
    updateUser(req, res, req.params.id);
});

//Delete an user
router.delete("/:id", (req, res) => {
    deleteUser(req, res, req.params.id);
});

export default router;
