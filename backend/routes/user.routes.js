import express from "express";
import {
	deleteInteraction,
	getInteractions,
	interact,
} from "../controllers/interactions.controller.js";
import {
	checkPassword,
	deleteUser,
	findAll,
	findOrCreate,
	getUserInfo,
	getUserInfoById,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

export const userRoutes = express.Router();

userRoutes.route("/user/login").post(checkPassword);
userRoutes
	.route("/user")
	.get(verifyJWT, findAll)
	.post(findOrCreate)
	.delete(deleteUser);

userRoutes.route("/user/getInfo").get(verifyJWT, getUserInfo);
userRoutes.route("/user/getInfoById").post(getUserInfoById);
userRoutes.route("/user/interact").post(interact);
userRoutes.route("/user/comments").post(getInteractions);
userRoutes.route("/user/comments/delete").post(deleteInteraction);
