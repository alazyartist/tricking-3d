import { User } from "../models/Users.js";
import db from "../models/index.js";
const user = await User(db.sequelize);
import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

export const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	//Checks if cookies exists
	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;
	console.log("JWT COOKIE", cookies.jwt);
	//selects user from db
	const selectedUser = await user.findOne({ where: { refreshToken } });

	if (!selectedUser) return res.sendStatus(403);
	//checks JWT
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		console.log("decoded", decoded);
		if (err || selectedUser.username !== decoded.username) {
			console.log(selectedUser.username, decoded.username);
			return res.sendStatus(403);
		}

		const accessToken = jwt.sign(
			{ username: decoded.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "30s" }
		);
		res.json({ accessToken });
	});
};
