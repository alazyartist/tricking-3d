import Interactions from "../models/interactions.cjs";
import Users from "../models/users.cjs";
const interactions = Interactions(db.sequelize);
const user = Users(db.sequelize);
import db from "../models/index.js";

export const interact = async (req, res) => {
	const { uuid, type, content, id } = req.body;
	try {
		const activeUser = await user.findOne({ where: { uuid: uuid } });

		const interact = await interactions.findOrCreate({
			where: {
				user_id: activeUser.id,
				trick_id: "a6899597-7b9b-4e5c-bac3-99dab501a8f9",
				type: type,
				content: content,
			},
			attributes: [
				"trick_id",
				"type",
				"content",
				"interaction_id",
				"createdAt",
			],
		});

		console.log("active", activeUser);
		console.log("interact", interact);
		res.json({ message: "I Interacted", interaction: interact });
	} catch (err) {
		console.log(err);
		err && res.json({ message: "I Failed to Interact", error: err });
	}
};
export const getInteractions = async (req, res) => {
	const { trick } = req.body;
	try {
		const commentData = await interactions.findAll({
			where: {
				type: trick,
			},
		});
		console.log(commentData);
		res.json({ message: "I Interacted", comments: commentData });
	} catch (err) {
		console.log(err);
		err && res.json({ message: "I Failed to Interact", error: err });
	}
};
