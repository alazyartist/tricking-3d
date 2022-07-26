import db from "../models/index.js";
const user = await db.sequelize.models.Users;
const capture = await db.sequelize.models.Captures;
const tricks = await db.sequelize.models.Tricks;

db.sequelize.models.Bases.associate(db.sequelize.models);
db.sequelize.models.Tricks.associate(db.sequelize.models);
db.sequelize.models.Stances.associate(db.sequelize.models);
db.sequelize.models.Variations.associate(db.sequelize.models);
db.sequelize.models.Users.associate(db.sequelize.models);

export const captureUser = async (req, res) => {
	let useruuid = req.body.useruuid;
	let captureuuid = req.body.captureuuid;
	console.log("Capture UUID", captureuuid);
	console.log("User UUID", useruuid);
	try {
		const activeUser = await user.findOne({ where: { uuid: useruuid } });
		const capturedUser = await user.findOne({ where: { uuid: captureuuid } });
		const cpt = capture.findOrCreate({
			where: {
				user_id: activeUser.id,
				captured_id: capturedUser.id,
			},
		});
		res.json(cpt);
	} catch (err) {
		console.log(err);
		res.send("error");
	}
};

export const getCaptures = async (req, res) => {
	const userid = await req.body.id;

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

	// try {
	// 	user
	// 		.findOne({
	// 			where: { id: userid },
	// 			attributes: [
	// 				"username",
	// 				"first_name",
	// 				"last_name",
	// 				"profilePic",
	// 				"uuid",
	// 			],
	// 			include: {
	// 				model: db.sequelize.models.Users,
	// 				as: "Captured",
	// 				attributes: [
	// 					"username",
	// 					"first_name",
	// 					"last_name",
	// 					"profilePic",
	// 					"uuid",
	// 				],
	// 			},
	// 		})
	// 		.then((userWithCaptures) => {
	// 			console.log(userWithCaptures);
	// 			res.json(userWithCaptures);
	// 		});
	// } catch (err) {
	// 	console.log(err);
	// }
};
