import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

export const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.sendStatus(400);

	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(401);
		req.user = decoded.user;
		next();
	});
};
