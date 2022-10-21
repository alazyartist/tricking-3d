import express from "express";
import {
	getRoombySessionid,
	getRooms,
	makeNewRoom,
	setRoomInactive,
	updateRoomStats,
} from "../controllers/battleroom.controller.js";

export const battleroomRoutes = express.Router();

battleroomRoutes.get("/", getRooms);
battleroomRoutes.post("/", makeNewRoom);
battleroomRoutes.post("/:sessionid", updateRoomStats);
battleroomRoutes.put("/:sessionid", setRoomInactive);
battleroomRoutes.get("/:sessionid", getRoombySessionid);
