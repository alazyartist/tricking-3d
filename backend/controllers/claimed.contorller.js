import db from "../models/index.js";
import env from "dotenv";
import Ably from "ably/promises.js";

const user = await db.sequelize.models.Users;
const tricks = await db.sequelize.models.Tricks;
const claimedcombos = await db.sequelize.models.ClaimedCombos;
const claimedtricks = await db.sequelize.models.ClaimedTricks;
env.config();
const ably = new Ably.Realtime(process.env.ABLY_API_KEY);
const feedChannel = ably.channels.get("feed");

export const claimCombo = async (req, res) => {
	const { user_id, combo_id } = await req.body;
	console.log(user_id, combo_id);

	try {
		claimedcombos
			.findOrCreate({ where: { user_id: user_id, combo_id: combo_id } })
			.then(async (ComboClaimed) => {
				const activeUser = await user.findOne({ where: { uuid: user_id } });
				feedChannel.publish("public", {
					...data[0].dataValues,
					owner: activeUser.username,
				});
				console.log(activeUser);
				res.json({ ComboClaimed });
			});
	} catch (err) {
		console.log(err);
	}
};
export const unclaimCombo = async (req, res) => {
	const { user_id, combo_id } = await req.params;
	console.log(user_id, combo_id);

	try {
		claimedcombos
			.destroy({ where: { user_id: user_id, combo_id: combo_id } })
			.then((ComboClaimed) => {
				res.json({ ComboClaimed });
			});
	} catch (err) {
		console.log(err);
	}
};

//Tricks
export const claimTrick = async (req, res) => {
	const { user_id, trick_id } = await req.body;
	console.log(user_id, trick_id);

	try {
		claimedtricks
			.findOrCreate({ where: { user_id: user_id, trick_id: trick_id } })
			.then(async (ComboClaimed) => {
				const activeUser = await user.findOne({ where: { uuid: user_id } });
				const trick = await tricks.findOne({
					where: { trick_id: ComboClaimed?.[0].dataValues.trick_id },
				});
				feedChannel.publish("public", {
					...ComboClaimed[0].dataValues,
					name: trick.name,
					owner: activeUser.username,
					type: "claimed by",
				});
				console.log(activeUser);
				res.json({ ComboClaimed });
			});
	} catch (err) {
		console.log(err);
	}
};
export const unclaimTrick = async (req, res) => {
	const { user_id, trick_id } = await req.params;
	console.log(user_id, trick_id);

	try {
		claimedtricks
			.destroy({ where: { user_id: user_id, trick_id: trick_id } })
			.then((ComboClaimed) => {
				res.json({ ComboClaimed });
			});
	} catch (err) {
		console.log(err);
	}
};
