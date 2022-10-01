import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

const ablyAuth = async (req, res) => {
	const apiKey = process.env.ABLY_API_KEY;
	const [keyId, keySecret] = apiKey.split(":");
	const expiresIn = 10000;
	const jwtOptions = { expiresIn, keyid: keyId };
	console.log("Successfully connected to the server auth endpoint");

	const randomId = Math.random().toString(16).slice(-8);
	const clientId = req.query.clientId || randomId;

	const jwtPayload = {
		"x-ably-capability": '{"*":["*"]}',
		"x-ably-clientId": clientId,
	};

	jwt.sign(jwtPayload, keySecret, jwtOptions, (err, tokenId) => {
		console.log("JSON Web Token signed by auth server");
		if (err) {
			console.log(err);
		}
		if (err) return console.trace();

		res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
		res.setHeader("Content-Type", "application/json");

		console.log("Sending signed JWT token back to client", tokenId);
		res.send(JSON.stringify(tokenId));
	});
};

export default ablyAuth;
