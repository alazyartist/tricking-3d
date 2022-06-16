import express from "express";
import cors from "cors";
import fetch from "node-fetch";
const PORT = 5000;
const app = express();
import db from "./models/index.js";
import { userRoutes } from "./routes/user.routes.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import { loginRoutes } from "./routes/loggedIn.routes.js";
import { refreshRoutes } from "./routes/refresh.routes.js";
import cookieParser from "cookie-parser";
const corsOptions = {
	origin: "http://localhost:3000",
	allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
	credentials: true,
	exposedHeaders: ["*", "Authorization"],
};

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
// );
app.use((req, res, next) => {
	console.log(req.rawHeaders);
	next();
});
app.use(cors(corsOptions), express.json(), cookieParser());
// app.use((req, res, next) => {
// 	console.log("after", req);
// 	next();
// });

// app.get("/api", cors(corsOptions), async (req, res) => {
// 	res.send("A Working Server by Dylan!");
// });
app.use("/api", userRoutes);
app.use("/api/refresh", refreshRoutes);
app.use("/api/loggedIn", verifyJWT, loginRoutes);

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
