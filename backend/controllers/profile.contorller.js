import db from "../models/index.js";
const profile = await db.sequelize.models.Profile;

export const updateStatus = async (req, res) => {
	const { user_id, status } = await req.body;
	console.log(user_id, status);

	try {
		profile
			.findOne({ where: { user_id: user_id } })
			.then((currentProfile) => {
				console.log(currentProfile);
				currentProfile.update({ status });
			})
			.then((updatedProfile) => {
				res.json({ updatedProfile });
			});
	} catch (err) {
		console.log(err);
	}
};
