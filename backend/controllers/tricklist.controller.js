import db from "../models/index.js";
const tricklist = await db.sequelize.models.Tricklist;
const tricks = await db.sequelize.models.Tricks;
db.sequelize.models.Bases.associate(db.sequelize.models);
db.sequelize.models.Tricks.associate(db.sequelize.models);
db.sequelize.models.Stances.associate(db.sequelize.models);
db.sequelize.models.Variations.associate(db.sequelize.models);
export const makeNewTricklist = async (req, res) => {
	const { name, uuid } = req.body;

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
	const { uuid } = req.body;
	tricklist
		.findAll({
			where: { owner: uuid },
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
export const getTricklistsById = async (req, res) => {
	const { uuid, tricklist_id } = req.body;
	tricklist
		.findAll({
			where: { owner: uuid, tricklist_id: tricklist_id },
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
