import db from "../models/index.js";
const tricks = await db.sequelize.models.Tricks;
const stances = await db.sequelize.models.Stances;
// db.sequelize.models.Tricks.associate(db.sequelize.models);
// db.sequelize.models.Bases.associate(db.sequelize.models);
// db.sequelize.models.Stances.associate(db.sequelize.models);
// db.sequelize.models.Variations.associate(db.sequelize.models);
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
	stances
		.findAll()
		.then((allStances) => {
			return allStances;
		})
		.then(async (allStances) => {
			const allTricks = await tricks.findAll({
				include: db.sequelize.models.Variations,
			});
			const data = [...allStances, ...allTricks];
			return data;
		})

		.then((data) => {
			res.json(data);
		});
};
