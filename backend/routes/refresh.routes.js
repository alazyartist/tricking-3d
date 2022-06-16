import express from "express";
import { handleRefreshToken } from "../controllers/refreshToken.controller.js";

export const refreshRoutes = express.Router();

refreshRoutes.post("/", handleRefreshToken);
