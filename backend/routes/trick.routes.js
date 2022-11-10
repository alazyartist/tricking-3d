import express from "express";
import {
	getAllTricks,
	getTrickByTrickId,
	getTrickParts,
	makeNewTrick,
	updateTrickPartPoints,
} from "../controllers/trick.controller.js";
export const trickRoutes = express.Router();

trickRoutes.route("/").get(getAllTricks);
trickRoutes.route("/").post(makeNewTrick);
trickRoutes.route("/parts").get(getTrickParts);
trickRoutes.route("/parts").put(updateTrickPartPoints);
trickRoutes.route("/:trick_id").get(getTrickByTrickId);
