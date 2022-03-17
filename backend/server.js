import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors(express.static("public", options)));

const options = {};
const corsOptions = {
	origin: "http://localhost:3000",
};

const requestEndpoint = ``;

app.get("/glb", cors(corsOptions), async (req, res) => {
	let andrew = "/public/Andrew.glb";
	res.download(andrew, "AndrewTestAPIDOWNLOAD", (err) => {
		console.log(err);
	});
});

app.get("/getData", cors(corsOptions), async (req, res) => {
	const fetchOptions = {
		method: "GET",
	};
	const response = await fetch(requestEndpoint, fetchOptions);
	const jsonResponse = await response.json();
	res.json(jsonResponse);
});

app.listen(PORT, (err) => {
	if (err) {
		console.log(`You broke it. Here's how:`, err);
		return;
	}
	console.log(`I am watching for changes on http://localhost:${PORT}`);
});
