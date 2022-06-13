import express from "express";
import cors from "cors";
import fetch from "node-fetch";
const PORT = 5000;
const app = express();
import db from "./models/index.js";
import { userRoutes } from "./routes/user.routes.js";
app.use(cors(), express.json());
const corsOptions = {
	origin: "http://localhost:3000",
};

// app.get("/api", cors(corsOptions), async (req, res) => {
// 	res.send("A Working Server by Dylan!");
// });
app.use("/api", userRoutes);

//Synchronizes with DB
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
