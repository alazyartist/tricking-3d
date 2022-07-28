import express from "express";
import { getComboItemsByTricklistId } from "../controllers/combo.controller.js";

import {
	deleteTricklistsById,
	getTricklists,
	getTricklistsById,
	getUserTricklists,
	makeNewTricklist,
} from "../controllers/tricklist.controller.js";
export const tricklistRoutes = express.Router();

tricklistRoutes.route("/").get(getTricklists).post(makeNewTricklist);
tricklistRoutes.route("/user").post(getUserTricklists);
tricklistRoutes.route("/user/id").post(getTricklistsById);

tricklistRoutes.route("/user/:tricklist_id").delete(deleteTricklistsById);

tricklistRoutes.route("/user/tl/:tid").get(getComboItemsByTricklistId);
