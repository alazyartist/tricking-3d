import express from "express";
import {
	createCheckoutSession,
	createPaymentIntent,
	getSecretKey,
} from "../controllers/payment.controller.js";

export const paymentRoutes = express.Router();

paymentRoutes.get("/", getSecretKey);
paymentRoutes.post("/", createPaymentIntent);
