import db from "../models/index.js";
const tricklist = db.sequelize.models.Tricklist;
const tricklist_combos = db.sequelize.models.Tricklist_Combos;
const combos = db.sequelize.models.Combo;
// db.sequelize.models.Combo.associate(db.sequelize.models);
// db.sequelize.models.Tricks.associate(db.sequelize.models);
export const addCombotoTricklist = async (req, res) => {
	const { uuid, name } = req.body;
	console.log(uuid, req.body.tricklist_id);
	//getsCurrent TrickList
	const currentTL = await tricklist.findOne({
		where: { tricklist_id: req.body.tricklist_id },
	});
	//getsSelectedCombotoAdd
	const selectedCombo = await combos.findOne({ where: { name: name } });
	//addsCombo to Tricklist through tricklist_combos
	try {
		currentTL.addTricklistCombo(selectedCombo).catch((err) => console.log(err));
		console.log(currentTL);
	} catch (err) {
		console.log(err);
	}
	res.send("GOT IT");
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
		combos.findAll({}).then((results) => res.json(results));
	} catch (err) {
		console.log(err), res.json(err);
	}
};
