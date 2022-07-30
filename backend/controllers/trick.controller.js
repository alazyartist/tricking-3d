import db from "../models/index.js";
const tricks = await db.sequelize.models.Tricks;
const stances = await db.sequelize.models.Stances;
const transitions = await db.sequelize.models.Transitions;
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
	try {
		stances
			.findAll()
			.then((allStances) => {
				return allStances;
			})
			.then(async (allStances) => {
				const allTricks = await tricks.findAll({
					include: db.sequelize.models.Variations,
				});
				const data = [...allTricks, ...allStances];

				return data;
			})
			.then(async (data) => {
				const allTransitions = await transitions.findAll({});

				const data2 = [...data, ...allTransitions];
				return data2;
			})
			.then((data) => {
				res.json(data);
			})
			.catch((err) => console.log(err));
	} catch (err) {
		console.log(err);
	}
};
