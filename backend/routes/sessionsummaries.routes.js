import express from "express";
import {
	getAllSessions,
	submitSessionforReview,
} from "../controllers/sessionsummaries.controller.js";

export const sessionSummariesRoutes = express.Router();
sessionSummariesRoutes.get("/", getAllSessions);
sessionSummariesRoutes.post("/", submitSessionforReview);
