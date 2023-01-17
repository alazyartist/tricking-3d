import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import sequelize from "sequelize";
import { prisma } from "../prisma.js";
const sessionsummaries = await db.sequelize.models.SessionSummaries;
const sessionsources = await db.sequelize.models.SessionSources;
const sessiondata = await db.sequelize.models.SessionData;
const combo = await db.sequelize.models.Combo;
const users = await db.sequelize.models.Users;
export const submitSessionforReview = async (req, res) => {
	const {
		user_id,
		sessionid,
		name,
		sessionDate,
		startTime,
		endTime,
		url,
		type,
		trickers,
	} = await req?.body;
	let status = "In Queue";

	let submittingUser = await users.findOne({ where: { uuid: user_id } });
	console.log(submittingUser?.dataValues?.SessionReviewCredits);
	console.log(trickers);
	let curCredits = await submittingUser?.dataValues?.SessionReviewCredits;
	if (curCredits >= 1) {
		await submittingUser.update({ SessionReviewCredits: curCredits - 1 });
		try {
			//sequelize
			// const sessionSetup = await sessionsummaries.findOrCreate({
			// 	where: {
			// 		sessionid,
			// 		name: name || sessionDate,
			// 		user_id,
			// 		sessionDate,
			// 		startTime,
			// 		endTime,
			// 		type,
			// 		status,
			// 	},
			// });
			//prisma
			const sessionSetup = await prisma.sessionsummaries.upsert({
				where: { sessionid },
				update: {
					name: name || sessionDate,
					user_id: user_id,
					sessionDate,
					startTime,
					endTime,
					type,
					status,
				},
				create: {
					sessionid,
					name: name || sessionDate,
					user_id: user_id,
					sessionDate,
					startTime,
					endTime,
					type,
					status,
				},
			});
			console.log(trickers);
			const trickerSetup = await Promise.all(
				trickers.map(async (tricker) => {
					try {
						const trickerSession = await prisma.user_sessions.create({
							data: {
								user_id: tricker.uuid,
								sessionid,
							},
						});
						return trickerSession;
					} catch (err) {
						console.log(err);
					}
				})
			);
			console.log("trickerSetup", trickerSetup);
			const sourcesSetup = await Promise.all(
				Object.keys(url).map(async (key) => {
					try {
						const source = await sessionsources.findOrCreate({
							where: {
								srcid: uuidv4(),
								sessionid: sessionid,
								vidsrc: url[key],
							},
						});
						return source;
						// console.log(source);
					} catch (err) {
						console.log(err);
						res.status(409).json(err);
					}
				})
			);
			console.log(sessionSetup, sourcesSetup);
			res.json({ sessionSetup, sourcesSetup, message: "Submitted" });
		} catch (err) {
			console.log(err);
			res.status(409).json(err);
		}
	} else {
		res.json({ message: "Out of Credits" });
	}
};

export const getAllSessions = async (req, res) => {
	const allSessions = await sessionsummaries.findAll({
		order: sequelize.col("createdAt"),
	});
	res.json(allSessions);
};
export const changeSessionStatus = async (req, res) => {
	let { sessionid } = req.params;
	let { status } = await req.body;
	console.log(req.body);
	try {
		const changedSession = await sessionsummaries.update(
			{ status: status },
			{ where: { sessionid: sessionid } }
		);
		res.json(changedSession);
	} catch (err) {
		console.log(err);
		res.json(err);
	}
};

export const getSessionDetailsBySessionid = async (req, res) => {
	const { sessionid } = req.params;
	const sessionDetails = await sessionsummaries.findOne({
		where: { sessionid },
		include: [
			{ model: db.sequelize.models.SessionSources },
			{
				model: db.sequelize.models.SessionData,
				include: [
					{ model: db.sequelize.models.Combo, as: "ClipLabel" },
					{ model: db.sequelize.models.SessionSources },
				],
			},
		],
	});
	res.json(sessionDetails);
};

export const saveSessionDetails = async (req, res) => {
	const sd = await req.body;
	try {
		try {
			await sessiondata.destroy({
				where: { srcid: await sd[0]?.srcid },
			});
		} catch (err) {
			res.status(501).send("Couldnt Destory");
			console.log("CouldntDestroy");
			console.log(err);
		}

		Object.keys(req.body).map(async (i) => {
			let curData = sd[i];
			let foundCombo = await combo.findOne({ where: { name: curData.name } });
			try {
				if (!foundCombo) {
					let madeCombo = await combo.findOrCreate({
						where: {
							name: curData.name,
							comboArray: curData.clipLabel,
							creator: curData.admin ?? "admin696-8c94-4ca7-b163-9alazyartist",
						},
					});
					if (madeCombo) {
						await sessiondata.findOrCreate({
							where: {
								id: curData.id,
								srcid: curData.srcid,
								clipLabel: madeCombo[0].dataValues.combo_id,
								sessionid: curData.sessionid,
								bail: curData.bail ?? 0,
								clipStart: curData.startTime,
								clipEnd: curData.endTime,
								admin: curData.admin ?? "admin696-8c94-4ca7-b163-9alazyartist",
							},
						});
						console.log("savedmadeCombodata");
					}
				} else {
					await sessiondata.findOrCreate({
						where: {
							id: curData.id,
							srcid: curData.srcid,
							clipLabel: foundCombo.dataValues.combo_id,
							sessionid: curData.sessionid,
							clipStart: curData.startTime,
							clipEnd: curData.endTime,
							bail: curData?.bail ?? 0,
							admin: curData.admin ?? "admin696-8c94-4ca7-b163-9alazyartist",
						},
					});
					console.log("savedfoundCombodata");
				}
			} catch (err) {
				console.log(err);
				// res.send(err);
			}
		});
		// res.send("SavedSessionDetails");
	} catch (err) {
		console.log(err);
		res.status(501).send(err);
	}
};
