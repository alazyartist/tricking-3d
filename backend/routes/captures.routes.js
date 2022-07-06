import express from "express";
import expressFile from "express-fileupload";

import { captureUser, getCaptures } from "../controllers/capture.controller.js";

export const captureRoutes = express.Router();

captureRoutes.post("/", captureUser);
captureRoutes.get("/", getCaptures);
