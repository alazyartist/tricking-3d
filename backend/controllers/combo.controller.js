import db from "../models/index.js";
const tricklist = db.sequelize.models.Tricklist;
const tricklist_combos = db.sequelize.models.Tricklist_Combos;
const combos = db.sequelize.models.Combo;
const combo_tricks = db.sequelize.models.Combo_Tricks;
// db.sequelize.models.Combo.associate(db.sequelize.models);
// db.sequelize.models.Tricks.associate(db.sequelize.models);
export const addCombotoTricklist = async (req, res) => {
	const { uuid, combo_id } = req.body;
	try {
		tricklist_combos
			.create({
				tricklist_id: req.body.tricklist_id,
				combo_id: combo_id,
			})
			.then((newCombo) => res.json(newCombo))
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	} catch (err) {
		console.log(err);
	}

	// //getsCurrent TrickList
	// const currentTL = await tricklist.findOne({
	// 	where: { tricklist_id: req.body.tricklist_id },
	// });
	// //getsSelectedCombotoAdd
	// const selectedCombo = await combos.findOne({ where: { combo_id: combo_id } });
	// //addsCombo to Tricklist through tricklist_combos
	// try {
	// 	currentTL.addTricklistCombo(selectedCombo).catch((err) => console.log(err));
	// 	console.log(currentTL);
	// } catch (err) {
	// 	console.log(err);
	// }
};

export const deleteComboFromTricklist = async (req, res) => {
	const { tricklist_id, combo_id, id } = req.params;
	tricklist_combos.destroy({
		where: { id: id, tricklist_id: tricklist_id, combo_id: combo_id },
	});
	res.send("DELETING it for you");
};
export const getComboItemsByTricklistId = async (req, res) => {
	console.log("params", req.params.tid);
	tricklist_combos
		.findAll({
			where: { tricklist_id: req.params.tid },
			include: [
				{ model: db.sequelize.models.Combo },
				{ model: db.sequelize.models.Tricklist },
			],
		})
		.then((data) => {
			console.log("t_c", data);
			res.json(data);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});

	// tricklist
	// 	.findAll({
	// 		where: {
	// 			tricklist_id: req.params.tid,
	// 		},
	// 		include: [
	// 			{
	// 				model: db.sequelize.models.Combo,
	// 				as: "TricklistCombos",
	// 				include: [
	// 					{
	// 						model: db.sequelize.models.Tricks,
	// 						as: "ComboTricks",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				model: db.sequelize.models.Users,
	// 				as: "Owner",
	// 				attributes: ["username", "uuid", "profilePic"],
	// 			},
	// 		],
	// 	})
	// 	.then((response) => {
	// 		console.log("tricklist", response), res.json(response);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err), res.json(err);
	// 	});
};

export const getAllCombos = async (req, res) => {
	try {
		combos
			.findAll({
				include: { model: db.sequelize.models.Tricks, as: "ComboTricks" },
			})
			.then((results) => res.json(results));
	} catch (err) {
		console.log(err), res.json(err);
	}
};

export const saveNewCombo = async (req, res) => {
	const { creator, comboName, comboItems } = req.body;

	console.log(
		comboName,
		comboItems.map((combo) => combo.name)
	);

	try {
		combos
			.findOrCreate({
				where: {
					name: comboName,
					creator: creator,
					comboArray: comboItems,
				},
			})
			// .then(async (newCombo) => {
			// 	comboItems.map(async (comboItem) => {
			// 		await combo_tricks.findOrCreate({
			// 			where: {
			// 				combo_id: newCombo[0].dataValues.combo_id,
			// 				trick_id: comboItem.trick_id,
			// 			},
			// 		});
			// 	});

			// 	res.json(newCombo);
			// })
			.catch((err) => console.log(err));
	} catch (err) {
		console.log(err), res.json(err);
	}
};
