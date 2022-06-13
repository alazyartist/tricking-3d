import express from "express";
import {
	checkPassword,
	deleteUser,
	findAll,
	findOrCreate,
} from "../controllers/user.controller.js";

export const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
	res.send("It works");
});

userRoutes.get("/user", findAll);
userRoutes.post("/user", findOrCreate);
userRoutes.delete("/user", deleteUser);
userRoutes.post("/user/login", checkPassword);
