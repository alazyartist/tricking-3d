import express from "express";
import { purchaseSessionReviewCredit } from "../controllers/webhook.controller.js";

export const webhookRoutes = express.Router();

webhookRoutes.post("/", purchaseSessionReviewCredit);
