import db from "../models/index.js";
const tricks = await db.sequelize.models.Tricks;
const stances = await db.sequelize.models.Stances;
const transitions = await db.sequelize.models.Transitions;
// db.sequelize.models.Tricks.associate(db.sequelize.models);
const bases = await db.sequelize.models.Bases;
const variations = await db.sequelize.models.Variations;
export const getTrickByTrickId = async (req, res) => {
	const { trick_id } = req.params;
	tricks
		.findAll({
			where: { trick_id },
			include: [
				{
					model: db.sequelize.models.Trick_Variations,
					as: "Variations",
					include: [
						{
							model: db.sequelize.models.Variations,
						},
					],
				},
				{ model: db.sequelize.models.Variations, as: "UniqueVariations" },
				{ model: db.sequelize.models.Stances, as: "Stance" },
				{ model: db.sequelize.models.Bases },
				{ model: db.sequelize.models.Animations },
			],
		})
		.then((data) => {
			// console.log(data);
			res.json(data);
		})
		.catch((err) => console.log(err));
};
export const getTrickParts = async (req, res) => {
	try {
		const allStances = await stances.findAll();
		const allBases = await bases.findAll();
		const allVariations = await variations.findAll();
		const data = [...allStances, ...allBases, ...allVariations];
		res.json(data);
	} catch (err) {
		console.log(err);
	}
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
					include: [
						{
							model: db.sequelize.models.Trick_Variations,
							as: "Variations",
							include: [
								{
									model: db.sequelize.models.Variations,
								},
							],
						},
						{ model: db.sequelize.models.Variations, as: "UniqueVariations" },
						db.sequelize.models.Animations,
					],
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
