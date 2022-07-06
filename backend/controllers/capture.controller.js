import { User } from "../models/Users.js";
import { Captures } from "../models/captures.js";
import db from "../models/index.js";

const user = await User(db.sequelize);
const capture = await Captures(db.sequelize);

export const captureUser = async (req, res) => {
	let useruuid = req.body.useruuid;
	let captureuuid = req.body.captureuuid;
	console.log("Capture UUID", captureuuid);
	console.log("User UUID", useruuid);
	try {
		const activeUser = await user.findOne({ where: { uuid: useruuid } });
		const capturedUser = await user.findOne({ where: { uuid: captureuuid } });
		const cpt = capture.findOrCreate({
			where: {
				user_id: activeUser.id,
				captured_id: capturedUser.id,
			},
		});
		res.json(cpt);
	} catch (err) {
		console.log(err);
	}
};

export const getCaptures = async (req, res) => {
	console.log("Hit Captures");
	const userid = await req.body.id;
	console.log(userid, req.body.id, "UserID");
	try {
		const cpt = await capture.findAll({
			where: { user_id: userid },
			attributes: ["user_id", "captured_id"],
		});
		res.json(cpt);
	} catch (err) {
		console.log(err);
	}
};
