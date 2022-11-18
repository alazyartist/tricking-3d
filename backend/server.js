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
import handleLogout from "./controllers/logout.controller.js";
import { captureRoutes } from "./routes/captures.routes.js";
import { trickRoutes } from "./routes/trick.routes.js";
import { tricklistRoutes } from "./routes/tricklist.routes.js";
import { comboRoutes } from "./routes/combo.routes.js";
import ablyAuth from "./controllers/ably.controller.js";
import { battleroomRoutes } from "./routes/battleroom.routes.js";
import { sessionSummariesRoutes } from "./routes/sessionsummaries.routes.js";
import { webhookRoutes } from "./routes/webhook.routes.js";
import { paymentRoutes } from "./routes/payment.routes.js";

const corsOptions = {
	origin: [
		"http://localhost:3000",
		"http://trickedex.app",
		"https://trickedex.app",
		"http://trickedex.com",
		"https://trickedex.com",
	],
	allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
	credentials: true,
	exposedHeaders: ["*", "Authorization"],
};
app.use(
	"/api/webhooks",
	express.raw({ type: "application/json" }),
	webhookRoutes
);
app.use(cors(corsOptions), express.json(), cookieParser());
//Maybe dont need this. Still unsure. Keep for now
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Origin",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

//Middlewares
app.use("/api/checkout", paymentRoutes);
app.get("/api/ablyAuth", ablyAuth);
app.use("/api", userRoutes);
app.use("/api/battlerooms", battleroomRoutes);
app.use("/api/sessionsummaries", sessionSummariesRoutes);
app.use("/api/tricks", trickRoutes);
app.use("/api/tricklist", verifyJWT, tricklistRoutes);
app.use("/api/combo", comboRoutes);
app.use("/api/refresh", refreshRoutes);
app.use("/api/logout", handleLogout);
app.use("/api/loggedIn", verifyJWT, loginRoutes);
app.use("/api/capture", verifyJWT, captureRoutes);

//Synchronizes with DB
await db.sequelize.sync({ alter: false }).then(() => {
	console.log("Syncronized DB");
	app.listen(PORT, (err) => {
		if (err) {
			console.log(`You broke it. Here's how:`, err);
			return;
		}
		console.log(`I am watching for changes on http://localhost:${PORT}`);
	});
});
