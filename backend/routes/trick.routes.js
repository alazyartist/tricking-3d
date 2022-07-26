import express from "express";
import {
	getAllTricks,
	getTrickByTrickId,
} from "../controllers/trick.controller.js";
export const trickRoutes = express.Router();

trickRoutes.route("/").get(getAllTricks);
trickRoutes.route("/trickbyid").post(getTrickByTrickId);
