import express from "express";
import {
	getAllTricks,
	getTrickByTrickId,
	getTrickParts,
} from "../controllers/trick.controller.js";
export const trickRoutes = express.Router();

trickRoutes.route("/").get(getAllTricks);
trickRoutes.route("/parts").get(getTrickParts);
trickRoutes.route("/:trick_id").get(getTrickByTrickId);
