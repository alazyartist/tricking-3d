import express from "express";

import {
	getTricklists,
	getUserTricklists,
	makeNewTricklist,
} from "../controllers/tricklist.controller.js";
export const tricklistRoutes = express.Router();

tricklistRoutes.route("/").get(getTricklists).post(makeNewTricklist);
tricklistRoutes.route("/user").post(getUserTricklists);
