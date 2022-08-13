import Interactions from "../models/interactions.cjs";
import Users from "../models/users.cjs";
const interactions = Interactions(db.sequelize);
const user = Users(db.sequelize);
import db from "../models/index.js";

export const interact = async (req, res) => {
	const { uuid, type, content, trick_id } = req.body;
	try {
		const activeUser = await user.findOne({ where: { uuid: uuid } });

		const interact = await interactions.findOrCreate({
			where: {
				user_id: activeUser.id,
				trick_id: trick_id,
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
export const deleteInteraction = async (req, res) => {
	const { interaction_id } = req.params;
	try {
		console.log(interaction_id);
		await interactions.destroy({ where: { interaction_id: interaction_id } });

		res.json({ message: "Comment Deleted" });
	} catch (err) {
		console.log(err);
		err && res.json({ message: "I Failed to Delete", error: err });
	}
};
export const getInteractions = async (req, res) => {
	const { trick_id } = req.params;
	try {
		const commentData = await interactions.findAll({
			where: {
				trick_id: trick_id,
				type: "comment",
			},
		});
		console.log(commentData);
		res.json(commentData);
	} catch (err) {
		console.log("getInteractions", err);
	}
};
