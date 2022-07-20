import db from "../models/index.js";
import { Interactions } from "../models/interactions.js";
import { User } from "../models/users.js";
const Associations = async () => {
	try {
		const user = await User(db.sequelize);
		const interaction = await Interactions(db.sequelize);
		user.hasMany(interaction, { foreignKey: "user_id" });
		interaction.belongsTo(user, { foreignKey: "id" });

		console.log(db.sequelize.models);

		console.log("Associations Setup");
	} catch (err) {
		console.log("Associations Failed");
		console.log(err);
	}
};

export default Associations;
