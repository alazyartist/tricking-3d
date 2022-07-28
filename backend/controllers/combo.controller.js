import db from "../models/index.js";
const tricklist = db.sequelize.models.Tricklist;
const tricklist_combos = db.sequelize.models.Tricklist_Combos;
const combos = db.sequelize.models.Combo;
// db.sequelize.models.Combo.associate(db.sequelize.models);
// db.sequelize.models.Tricks.associate(db.sequelize.models);
export const addComboItem = (req, res) => {
	const { uuid, name } = req.body;
	console.log(uuid, req.body.tricklist_id);
	tricklist_combos
		.create({
			tricklist_id: req.body.tricklist_id,
			combo_id: name,
		})
		.then((data) => res.json(data))
		.catch((err) => res.json(err));
};
export const getComboItemsByTricklistId = async (req, res) => {
	console.log("params", req.params.tid);
	tricklist
		.findAll({
			where: {
				tricklist_id: req.params.tid,
			},
			include: [
				{
					model: db.sequelize.models.Combo,
					as: "TricklistCombos",
					include: [
						{
							model: db.sequelize.models.Tricks,
							as: "ComboTricks",
						},
					],
				},
				{
					model: db.sequelize.models.Users,
					as: "Owner",
					attributes: ["username", "uuid", "profilePic"],
				},
			],
		})
		.then((response) => {
			console.log(response), res.json(response);
		})
		.catch((err) => {
			console.log(err), res.json(err);
		});
};
