import { Interactions } from "../models/interactions.js";
import { User } from "../models/users.js";
const interactions = Interactions(db.sequelize);
const user = User(db.sequelize);
import db from "../models/index.js";

export const interact = async (req, res) => {
	const { useruuid, type, content } = req.body;
	try {
		const activeUser = await user.findOne({ where: { uuid: useruuid } });

		const interact = await interactions.findOrCreate({
			where: {
				user_id: activeUser.id,
				trick_id: "a6899597-7b9b-4e5c-bac3-99dab501a8f9",
				type: type,
				content: content,
			},
			attributes: ["trick_id", "type", "content", "interaction_id"],
		});

		console.log("active", activeUser);
		console.log("interact", interact);
		res.json({ message: "I Interacted", interaction: interact });
	} catch (err) {
		console.log(err);
		err && res.json({ message: "I Failed to Interact", error: err });
	}
};
