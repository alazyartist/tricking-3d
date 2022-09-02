import db from "../models/index.js";
const tricklist = await db.sequelize.models.Tricklist;
const tricks = await db.sequelize.models.Tricks;
// db.sequelize.models.Bases.associate(db.sequelize.models);
// db.sequelize.models.Tricks.associate(db.sequelize.models);
// db.sequelize.models.Stances.associate(db.sequelize.models);
// db.sequelize.models.Variations.associate(db.sequelize.models);
export const makeNewTricklist = async (req, res) => {
	const { name, uuid } = req.body.data;

	tricklist
		.findOrCreate({
			where: { name: name, owner: uuid },
		})
		.then((data) => {
			console.log(data);
			res.json(data);
		})
		.catch((err) => console.log(err));
};

export const getTricklists = async (req, res) => {
	console.log("hitGetTricklist");
	tricklist
		.findAll({
			include: {
				model: db.sequelize.models.Users,
				as: "Owner",
				attributes: ["username", "first_name"],
			},
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
			include: {
				model: db.sequelize.models.Users,
				as: "Owner",
				attributes: ["username", "first_name"],
			},
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
	tricklist
		.destroy({
			where: { tricklist_id: tricklist_id },
		})
		.then((data) => {
			res.json({ data: data, message: "DELETED TRICKLIST" });
		});
};
