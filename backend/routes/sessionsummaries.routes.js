import express from "express";
import { submitSessionforReview } from "../controllers/sessionsummaries.controller.js";

export const sessionSummariesRoutes = express.Router();
sessionSummariesRoutes.post("/", submitSessionforReview);
