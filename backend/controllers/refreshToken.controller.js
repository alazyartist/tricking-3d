import { User } from "../models/Users.js";
import db from "../models/index.js";
const user = await User(db.sequelize);
import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

export const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	//Checks if cookies exists
	if (!cookies?.jwt) return res.status(401);

	const refreshToken = cookies.jwt;
	console.log(cookies.jwt);
	//selects user from db
	const selectedUser = await user.findOne({ where: { refreshToken } });

	if (!selectedUser) return res.sendStatus(403);
	//checks JWT
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		console.log(decoded);
		if (err || selectedUser.username !== decoded.username) {
			console.log(selectedUser.username, decoded.username);
			return res.sendStatus(403);
		}

		const accessToken = jwt.sign(
			{ username: decoded.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "5min" }
		);
		res.json({ accessToken });
	});
};
