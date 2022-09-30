import db from "../models/index.js";
import Ably from "ably/promises.js";
const tricklist = await db.sequelize.models.Tricklist;
const tricklist_combos = await db.sequelize.models.Tricklist_Combos;
const tricks = await db.sequelize.models.Tricks;
const users = await db.sequelize.models.Users;
// db.sequelize.models.Bases.associate(db.sequelize.models);
// db.sequelize.models.Tricks.associate(db.sequelize.models);
// db.sequelize.models.Stances.associate(db.sequelize.models);
// db.sequelize.models.Variations.associate(db.sequelize.models);
const ably = new Ably.Realtime(
	"JGiS4w.Vg6zNA:TtwxohPIqL_TBzkPu0Gr0STE2cm6Ah-xfek0FkqY40s"
);
export const makeNewTricklist = async (req, res) => {
	const { name, uuid } = req.body.data;
	const feedChannel = ably.channels.get("feed");

	tricklist
		.findOrCreate({
			where: { name: name, owner: uuid },
		})
		.then(async (data) => {
			console.log(data);
			const owner = await users.findOne({ where: { uuid: uuid } });
			feedChannel.publish("public", {
				...data[0].dataValues,
				owner: owner.username,
			});
			res.json(data);
		})
		.catch((err) => console.log(err));
};

export const getTricklists = async (req, res) => {
	console.log("hitGetTricklist");
	tricklist
		.findAll({
			include: [
				{
					model: db.sequelize.models.Users,
					as: "Owner",
					attributes: ["username", "first_name"],
				},
				{ model: db.sequelize.models.Combo },
			],
		})
		.then((data) => {
			res.json(data);
		});
};
export const getUserTricklists = async (req, res) => {
	const { user_id } = await req.params;
	if (!user_id) return res.send("noUUID");
	console.log("hit userTricklists");
	console.log(user_id);
	tricklist
		.findAll({
			where: { owner: user_id },
			include: [
				{
					model: db.sequelize.models.Users,
					as: "Owner",
					attributes: ["username", "first_name"],
				},
				{ model: db.sequelize.models.Combo, as: "TricklistCombos" },
			],
		})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => console.log(err));
};
export const getTricklistsById = async (req, res) => {
	console.log("hitUserTricklistBYID");
	const { tricklist_id } = req.params;
	tricklist
		.findAll({
			where: { tricklist_id: tricklist_id },
			include: {
				model: db.sequelize.models.Users,
				as: "Owner",
				attributes: ["username", "uuid", "profilePic"],
			},
		})
		.then((data) => {
			res.json(data);
		});
};
export const deleteTricklistsById = async (req, res) => {
	const tricklist_id = req.params.tricklist_id;
	await tricklist_combos.destroy({
		where: { tricklist_id: tricklist_id },
	});
	tricklist
		.destroy({
			where: { tricklist_id: tricklist_id },
		})
		.then(() => {
			res.json({ message: "DELETED TRICKLIST" });
		});
};
