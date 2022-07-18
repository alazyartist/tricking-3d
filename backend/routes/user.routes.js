import express from "express";
import { interact } from "../controllers/interactions.controller.js";
import {
	checkPassword,
	deleteUser,
	findAll,
	findOrCreate,
	getUserInfo,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

export const userRoutes = express.Router();

userRoutes
	.route("/user")
	.get(verifyJWT, findAll)
	.post(findOrCreate)
	.delete(deleteUser);

userRoutes.route("/user/getInfo").get(verifyJWT, getUserInfo);
userRoutes.route("/user/login").post(checkPassword);
userRoutes.route("/user/interact").post(interact);
