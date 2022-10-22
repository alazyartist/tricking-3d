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
export const getRooms = async (req, res) => {
	const availableRooms = await battlerooms.findAll();
	console.log(availableRooms);
	res.json(availableRooms);
};
export const getRoombySessionid = async (req, res) => {
	const sessionid = req.params.sessionid;
	console.log(sessionid);
	try {
		const room = await battlerooms.findOne({ where: { sessionid } });
		res.json(room);
	} catch (err) {
		console.log(err);
	}

	//save battleroom config
};
export const updateRoomStats = async (req, res) => {
	const sessionid = req.params.sessionid;
	const {
		team1Score,
		team2Score,
		team1AudienceScore,
		team2AudienceScore,
		winner,
		audienceWinner,
	} = req.body.data;
	try {
		const roomStats = await battleroomstats.findOrCreate({
			where: {
				sessionid,
				team1Score,
				team2Score,
				team1AudienceScore,
				team2AudienceScore,
				winner,
				audienceWinner,
			},
		});

		res.json(roomStats);
	} catch (err) {
		console.log(err);
		res.status(403).json(err);
	}
	//create/update battle stats
	/*
    sessionid
    team1Score
    team2Score
    team1AudienceScore
    team2AudienceScore
    winner
    audienceWinner
    */
};
export const setRoomInactive = async (req, res) => {
	const sessionid = req.params.sessionid;
	//set battlerooms isOpen to false
	try {
		const room = await battlerooms.findOne({ where: { sessionid } });
		const closedroom = await room.update({ isOpen: false });
		res.json(closedroom);
	} catch (err) {
		console.log(err);
	}
};
