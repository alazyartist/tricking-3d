import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
const sessionsummaries = await db.sequelize.models.SessionSummaries;
const sessionsources = await db.sequelize.models.SessionSources;
const sessiondata = await db.sequelize.models.SessionData;
const combo = await db.sequelize.models.combo;
export const submitSessionforReview = async (req, res) => {
	const { user_id, sessionid, name, sessionDate, startTime, endTime, url } =
		await req?.body;
	let status = "In Queue";
	try {
		const sessionSetup = await sessionsummaries.findOrCreate({
			where: {
				sessionid,
				name: name || sessionDate,
				user_id,
				sessionDate,
				startTime,
				endTime,
				status,
			},
		});
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
		res.json({ sessionSetup, sourcesSetup });
	} catch (err) {
		console.log(err);
		res.status(409).json(err);
	}
};
