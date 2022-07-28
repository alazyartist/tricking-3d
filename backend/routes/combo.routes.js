import express from "express";
import { addComboItem } from "../controllers/combo.controller.js";

export const comboRoutes = express.Router();

comboRoutes.route("/add").post(addComboItem);
