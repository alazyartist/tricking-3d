import Users from "../models/users.cjs";
import db from "../models/index.js";
const user = await Users(db.sequelize);
import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

export const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	//Checks if cookies exists
	if (!cookies?.jwt) return res.status(401).json({ message: "NO COOKIE SENT" });

	const refreshToken = cookies.jwt;
	console.log("JWT COOKIE", cookies.jwt);
	//selects user from db
	try {
		const selectedUser = await user.findOne({ where: { refreshToken } });

		if (!selectedUser)
			return res.status(403).json({ message: "No User to Select" });
		//checks JWT
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				console.log("decoded", decoded);
				if (err || selectedUser.username !== decoded.username) {
					console.log(selectedUser.username, decoded.username);
					return res.sendStatus(403);
				}

				const accessToken = jwt.sign(
					{ username: decoded.username },
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "2min" }
				);
				res.json({ accessToken });
			}
		);
	} catch (err) {
		console.log("refreshErr", err);
	}
};
