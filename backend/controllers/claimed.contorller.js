import db from "../models/index.js";
const user = await db.sequelize.models.Users;
const claimedcombos = await db.sequelize.models.ClaimedCombos;

export const claimCombo = async (req, res) => {
	const { user_id, combo_id } = await req.body;
	console.log(user_id, combo_id);

	try {
		claimedcombos
			.findOrCreate({ where: { user_id: user_id, combo_id: combo_id } })
			.then((ComboClaimed) => {
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
