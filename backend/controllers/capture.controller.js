import db from "../models/index.js";
const user = await db.sequelize.models.Users;
const capture = await db.sequelize.models.Captures;

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

	try {
		user
			.findOne({
				where: { id: userid },
				attributes: [
					"username",
					"first_name",
					"last_name",
					"profilePic",
					"uuid",
				],
				include: {
					model: db.sequelize.models.Users,
					as: "Captured",
					attributes: [
						"username",
						"first_name",
						"last_name",
						"profilePic",
						"uuid",
					],
				},
			})
			.then((userWithCaptures) => {
				console.log(userWithCaptures);
				res.json(userWithCaptures);
			});
	} catch (err) {
		console.log(err);
	}
};
