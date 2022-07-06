import express from "express";
import expressFile from "express-fileupload";

import { captureUser } from "../controllers/capture.controller.js";

export const captureRoutes = express.Router();

captureRoutes.get("/", (req, res) => {
	res.send("Captures");
});
captureRoutes.post("/", captureUser);
