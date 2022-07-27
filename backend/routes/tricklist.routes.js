import express from "express";

import {
	getTricklists,
	getTricklistsById,
	getUserTricklists,
	makeNewTricklist,
} from "../controllers/tricklist.controller.js";
export const tricklistRoutes = express.Router();

tricklistRoutes.route("/").get(getTricklists).post(makeNewTricklist);
tricklistRoutes.route("/user").post(getUserTricklists);
tricklistRoutes.route("/user/id").post(getTricklistsById);
