import db from "../models/index.js";
const user = await db.sequelize.models.Users;
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
export const updateProfileInfo = async (req, res) => {
	const { username, uuid, name, country, state, city, age } = await req.body;

	try {
		await user.findOne({ where: { uuid: uuid } }).then((selectedUser) => {
			selectedUser.update({ username });
		});

		profile
			.findOne({ where: { user_id: uuid } })
			.then((currentProfile) => {
				console.log(currentProfile);
				currentProfile.update({ name, country, state, city, age });
			})
			.then((updatedProfile) => {
				res.json({ updatedProfile });
			});
	} catch (err) {
		console.log(err);
	}
};
