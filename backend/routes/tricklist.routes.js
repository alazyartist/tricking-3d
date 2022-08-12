import express from "express";
import {
	addCombotoTricklist,
	deleteComboFromTricklist,
	getComboItemsByTricklistId,
} from "../controllers/combo.controller.js";

import {
	deleteTricklistsById,
	getTricklists,
	getTricklistsById,
	getUserTricklists,
	makeNewTricklist,
} from "../controllers/tricklist.controller.js";
export const tricklistRoutes = express.Router();

tricklistRoutes.route("/").get(getTricklists).post(makeNewTricklist);
tricklistRoutes.route("/:user_id").get(getUserTricklists);
tricklistRoutes.route("/:user_id/:tricklist_id").get(getTricklistsById);
tricklistRoutes
	.route("/:user_id/:tricklist_id/combos")
	.get(getComboItemsByTricklistId);

tricklistRoutes
	.route("/user/:tricklist_id")
	.delete(deleteTricklistsById)
	.post(addCombotoTricklist);
tricklistRoutes
	.route("/user/:tricklist_id/:combo_id/:id")
	.delete(deleteComboFromTricklist);
