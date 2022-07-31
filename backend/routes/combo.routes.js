import express from "express";
import { getAllCombos, saveNewCombo } from "../controllers/combo.controller.js";

export const comboRoutes = express.Router();

comboRoutes.route("/").get(getAllCombos);
comboRoutes.route("/add").post(saveNewCombo);
