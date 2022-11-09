import express from "express";
import {
	getAllSessions,
	getSessionDetailsBySessionid,
	saveSessionDetails,
	submitSessionforReview,
} from "../controllers/sessionsummaries.controller.js";

export const sessionSummariesRoutes = express.Router();
sessionSummariesRoutes.get("/", getAllSessions);
sessionSummariesRoutes.post("/", submitSessionforReview);
sessionSummariesRoutes.get("/:sessionid", getSessionDetailsBySessionid);
sessionSummariesRoutes.post("/:sessionid", saveSessionDetails);
