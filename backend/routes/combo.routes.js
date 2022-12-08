import express from "express";
import {
	getAllCombos,
	getComboByComboId,
	saveNewCombo,
	updateComboShorthand,
} from "../controllers/combo.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

export const comboRoutes = express.Router();

comboRoutes.route("/").get(getAllCombos);
comboRoutes.route("/:combo_id").get(getComboByComboId);
comboRoutes.route("/:combo_id/shorthand").put(updateComboShorthand);
comboRoutes.route("/add").post(verifyJWT, saveNewCombo);
