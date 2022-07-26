import db from "../models/index.js";
const tricks = await db.sequelize.models.Tricks;
db.sequelize.models.Bases.associate(db.sequelize.models);
db.sequelize.models.Tricks.associate(db.sequelize.models);
db.sequelize.models.Stances.associate(db.sequelize.models);
db.sequelize.models.Variations.associate(db.sequelize.models);
export const getTrickByTrickId = async (req, res) => {
	tricks
		.findAll({
			where: { name: "dragonfly-Cork" },
			include: [
				{ model: db.sequelize.models.Variations, as: "Variations" },
				{ model: db.sequelize.models.Stances, as: "Stance" },
				{ model: db.sequelize.models.Bases },
			],
		})
		.then((data) => {
			console.log(data);
			res.json(data);
		})
		.catch((err) => console.log(err));
};

export const getAllTricks = async (req, res) => {
	tricks.findAll().then((data) => {
		res.json(data);
	});
};
