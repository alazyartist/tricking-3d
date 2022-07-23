import Users from "../models/users.cjs";
import db from "../models/index.js";
const user = await Users(db.sequelize);
import env from "dotenv";
env.config();

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	//Checks if cookies exists
	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;
	console.log("JWT COOKIE", cookies.jwt);
	//selects user from db
	const selectedUser = await user.findOne({ where: { refreshToken } });
	// is there cookie?
	if (!selectedUser) {
		res.clearCookie("jwt", { httpOnly: true });
		console.log("YOU LOGGED OUT");
		return res.sendStatus(204);
	}
	//eat cookie
	selectedUser.update({ refreshToken: "" });

	res.status(204).json({ message: "LoggedOut" });
};

export default handleLogout;
