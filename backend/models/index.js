"use strict";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
import * as config from "../config/config.js";
const db = {};
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		username: "tricking3d",
		password: "3dtricking",
		host: "a2plcpnl0022.prod.iad2.secureserver.net",
		port: "3306",
		dialect: "mysql",
	}
);

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
	console.log("Config", config);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = import(path.join(__dirname, file));
		if (typeof model != "function") return;
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
