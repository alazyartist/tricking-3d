import db from "../models/index.js";
const battlerooms = await db.sequelize.models.BattleRooms;
const battleroomstats = await db.sequelize.models.BattleRoomStats;

export const makeNewRoom = async (req, res) => {
	const sessionid = req?.body?.sessionid;
	//save battleroom config
};
export const getRoombySessionid = async (req, res) => {
	const sessionid = req.params.sessionid;
	//save battleroom config
};
export const updateRoomStats = async (req, res) => {
	const sessionid = req.params.sessionid;
	//create/update battle stats
};
export const setRoomInactive = async (req, res) => {
	const sessionid = req.params.sessionid;
	//set battlerooms isOpen to false
};
