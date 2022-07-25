"use strict";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
import { config } from "../config/config.js";
import users from "./users.cjs";

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
// users(sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const modelFiles = fs
	.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-4) === ".cjs"
		);
	})
	.map((str) => str.replace(".cjs", ""));
for (const file of modelFiles) {
	const model = await import(path.join(`file://${__dirname}`, `${file}.cjs`));
	db[model.name] = model.default(sequelize);
	new db[model.name](sequelize);
}
console.log("db.models", db.sequelize.models);
// console.log("db.models", db.sequelize.models);

const dbmodels = Object.keys(db.sequelize.models);
console.log(dbmodels);
for (const modelName of dbmodels) {
	if (db.sequelize.models[modelName].associate) {
		console.log(db.sequelize.models[modelName], "Association Attempt");
		db.sequelize.models[modelName].associate(db.sequelize.models);
	}
}
console.log("AssociationIndexSetup", db.sequelize.models.Users.associations);
export default db;
