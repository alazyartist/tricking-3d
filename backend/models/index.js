"use strict";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
import { config } from "../config/config.js";
import { User } from "./users.js";
import { Captures } from "./captures.js";
const db = {};
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		dialect: "mysql",
	}
);

try {
	await sequelize.authenticate();
	console.log("DB Connect!");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = import(path.join(`file://${__dirname}`, file));
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

//Associations User to User through Captures
const user = User(db.sequelize);
const captures = Captures(db.sequelize);
user.belongsToMany(user, { as: "captured_id", through: captures });
user.belongsToMany(user, { as: "user_id", through: captures });
export default db;
