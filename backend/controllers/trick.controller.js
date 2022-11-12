import QueryTypes from "sequelize";
import db from "../models/index.js";
const tricks = await db.sequelize.models.Tricks;
const stances = await db.sequelize.models.Stances;
const transitions = await db.sequelize.models.Transitions;
// db.sequelize.models.Tricks.associate(db.sequelize.models);
const bases = await db.sequelize.models.Bases;
const trick_variations = await db.sequelize.models.Trick_Variations;
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

export const makeNewTrick = async (req, res) => {
	try {
		const {
			name,
			base_id,
			trickType,
			takeoffStance,
			variationsArr,
			landingStance,
			useruuid,
		} = await req.body;

		//take trick info create trick getTrick_id
		let newTrick = await tricks.findOrCreate({ where: { name } });

		Promise.resolve(newTrick).then((newTrick) => {
			console.log(newTrick[0]);
			if (newTrick) {
				newTrick[0].update({
					base_id,
					trickType,
					stance_id: takeoffStance,
					takeoffStance,
					landingStance,
				});
			}
		});
		try {
			await variationsArr.map(async (variation) => {
				Promise.resolve(newTrick).then(async (newTrick) => {
					let variation_id = variation.id;

					let trick_id = await newTrick[0]?.dataValues?.trick_id;
					await trick_variations.findOrCreate({
						where: { variation_id, trick_id },
					});
				});
			});
			//take variationsArr map over and associate with trick
		} catch (err) {
			console.log(err);
			res.json({ message: "Issue Saving variation to trick", error: err });
		}
		console.log(newTrick[0].dataValues.trick_id, "newTrick check");
		let trick_id = newTrick[0].dataValues.trick_id;
		if (trick_id !== undefined) {
			let madeTrick = await tricks.findOne({
				where: { trick_id: trick_id },
				include: {
					model: db.sequelize.models.Trick_Variations,
					as: "Variations",
					include: [
						{
							model: db.sequelize.models.Variations,
						},
					],
				},
			});
			res.json({ message: "savedNewTrick", trick: madeTrick });
		}
	} catch (err) {
		console.log(err);
		res.send(err);
	}
};

export const updateTrickPartPoints = async (req, res) => {
	const { pointValue, type, id } = await req.body;
	try {
		console.log(type);
		if (type === "Transition") {
			await transitions.update(
				{ pointValue: pointValue },
				{ where: { id: id } }
			);
			res.send("UpdatedPointValue");
		} else if (type === "Stance") {
			await stances.update(
				{ pointValue: pointValue },
				{ where: { stance_id: id } }
			);
			res.send("UpdatedPointValue");
		} else if (type === "Base") {
			await bases.update(
				{ pointValue: pointValue },
				{ where: { base_id: id } }
			);
			res.send("UpdatedPointValue");
		} else if (type === "Variation") {
			await variations.update(
				{ pointValue: pointValue },
				{ where: { id: id } }
			);
			res.send("UpdatedPointValue");
		}
	} catch (err) {
		console.log(err);
		res.send(err);
	}
};

export const getTrickPointsValue = async (req, res) => {
	try {
		//production query
		const points = await db.sequelize.query(
			`select Tricks.name,(ifNull(avg(Bases.pointValue),0) + (ifNull(avg(Landing.pointValue),0) - ifNull(avg(Takeoff.pointValue),0))) + sum(ifNull(Variations.pointValue),0)) as Total,ifNull(avg(Tricks.pointValue),0) as tp,sum(ifNull(Variations.pointValue,0)) as vartiationpoints, ifNull(avg(Bases.pointValue),0) as bp,ifNull(avg(Takeoff.pointValue),0) as tsp,ifNull(avg(Landing.pointValue),0) as lsp from Tricks left join Trick_Variations on Tricks.trick_id = Trick_Variations.trick_id left join Variations on Trick_Variations.variation_id = Variations.id left join Bases on Bases.base_id=Tricks.base_id left join Stances as Landing on Landing.stance_id=Tricks.landingStance left join Stances as
Takeoff on Takeoff.stance_id=Tricks.takeoffStance group by Tricks.name;`,
			{ type: QueryTypes.SELECT }
		);
		//local query
		// const points = await db.sequelize.query(
		// 	"select tricks.name,(ifNull(bases.pointValue,0) + ifNull(takeoff.pointValue,0) + ifNull(landing.pointValue,0)) as Total,ifNull(tricks.pointValue,0) as tp,sum(ifNull(variations.pointValue,0)) as vartiationpoints, ifNull(bases.pointValue,0) as bp,takeoff.pointValue as tsp,ifNull(landing.pointValue,0) as lsp from tricks left join trick_variations on tricks.trick_id = trick_variations.trick_id left join variations on trick_variations.variation_id = variations.id left join bases on bases.base_id=tricks.base_id left join stances as landing on landing.stance_id=tricks.landingStance left join stances as takeoff on takeoff.stance_id=tricks.takeoffStance group by name;",
		// 	{ type: QueryTypes.SELECT }
		// );
		res.json(points[0]);
	} catch (err) {
		console.log(err);
		res.status(501).send(err);
	}
};
