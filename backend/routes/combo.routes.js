import express from "express";
import { getAllCombos, saveNewCombo } from "../controllers/combo.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

export const comboRoutes = express.Router();

comboRoutes.route("/").get(getAllCombos);
comboRoutes.route("/add").post(verifyJWT, saveNewCombo);
