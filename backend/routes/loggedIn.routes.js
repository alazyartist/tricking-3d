import express from "express";
import { updateUserInfo } from "../controllers/user.controller.js";

export const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
	res.send("It works");
});
loginRoutes.put("/user", updateUserInfo);

loginRoutes.get("/dash", (req, res) => {
	res.send("Welcome to the Dashboard");
});
