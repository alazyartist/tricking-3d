import express from "express";
import expressFile from "express-fileupload";

import {
	updateProfilePic,
	updateUserInfo,
} from "../controllers/user.controller.js";

export const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
	res.send("It works");
});
loginRoutes.put("/user", updateUserInfo);
loginRoutes.post("/user/profilePic", expressFile(), updateProfilePic);

loginRoutes.get("/dash", (req, res) => {
	res.send("Welcome to the Dashboard");
});
