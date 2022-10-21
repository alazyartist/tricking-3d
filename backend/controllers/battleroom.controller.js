import db from "../models/index.js";
const battlerooms = await db.sequelize.models.BattleRooms;
const battleroomstats = await db.sequelize.models.BattleRoomStats;

export const makeNewRoom = async (req, res) => {
	let hostid = req.body.data.hostID.uuid;
	const { sessionid, team1, team2, judges, duration } = req?.body?.data;
	let isOpen = true;

	try {
		const sessionSetup = await battlerooms.findOrCreate({
			where: {
				host: hostid,
				sessionid,
				team1,
				team2,
				judges,
				duration,
				isOpen,
			},
		});
		res.json(sessionSetup);
	} catch (err) {
		console.log(err);
		res.send("error");
	}
	/*
    hostid
    sessionid
    team1
    team2
    judges
    isOpen 
    */
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
