import { User } from "../models/users.js";
import { Interactions } from "../models/interactions.js";
import db from "../models/index.js";

const user = await User(db.sequelize);
const interactions = await Interactions(db.sequelize);

export const interact = async (req, res) => {
	try {
		const activeUser = await user.findOne({ where: { uuid: useruuid } });

		activeUser.addInteractions({
			trick_id: "a6899597-7b9b-4e5c-bac3-99dab501a8f9",
			type: "Comment",
			content: "Comment Content info",
		});
	} catch (err) {
		console.log(err);
	}
};
