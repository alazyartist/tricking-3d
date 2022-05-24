import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const PORT = 5000;
const app = express();

const options = {};
app.use(cors());

const corsOptions = {
	origin: "http://localhost:3000",
};

const requestEndpoint = `https://jsonplaceholder.typicode.com/todos/`;

app.get("/getData", cors(corsOptions), async (req, res) => {
	const fetchOptions = {
		method: "GET",
	};
	const response = await fetch(requestEndpoint, fetchOptions);
	const jsonResponse = await response.json();
	res.json(jsonResponse);
});
import db from "./models/index.js";
import { User } from "./models/Users.js";

await db.sequelize.sync().then(() => {
	console.log("Syncronized DB");
	app.listen(PORT, (err) => {
		if (err) {
			console.log(`You broke it. Here's how:`, err);
			return;
		}
		console.log(`I am watching for changes on http://localhost:${PORT}`);
	});
});
