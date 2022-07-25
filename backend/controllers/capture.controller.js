import db from "../models/index.js";
const user = await db.sequelize.models.Users;
const capture = await db.sequelize.models.Captures;

// const user = Users(db.sequelize);
// const capture = Captures(db.sequelize);
// user.belongsToMany(user, {
// 	through: capture,
// 	as: "MainUser",
// 	foreignKey: "captured_id",
// });
// user.belongsToMany(user, {
// 	through: capture,
// 	as: "Captured",
// 	foreignKey: "user_id",
// });
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
	console.log("Hit Captures");
	const userid = await req.body.id;
	console.log(userid, req.body.id, "UserID");
	try {
		const cpt = await capture.findAll({
			where: { user_id: userid },
			attributes: ["user_id", "captured_id"],
		});

		let cptUserArr = [];
		Object.keys(cpt).map((key) => {
			cptUserArr.push(cpt[key].dataValues.captured_id);
		});
		console.log(cptUserArr);

		// user
		// 	.findOne({
		// 		where: { id: userid },
		// 		attributes: ["username", "first_name", "last_name"],
		// 		include: "Captured",
		// 	})
		// 	.then((testUser) => {
		// 		testUser.dataValues.Captured.map((data) => {
		// 			console.log("captureddata", data);
		// 		});
		// 	});
		const cptUsers = await user.findAll({
			where: { id: cptUserArr },
			attributes: ["username", "profilePic", "first_name", "last_name", "uuid"],
		});
		console.log(cptUsers);
		// console.log(cptUsers);
		res.json(cptUsers);
	} catch (err) {
		console.log(err);
	}
};
