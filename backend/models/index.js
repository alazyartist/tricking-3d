"use strict";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
import { config } from "../config/config.js";

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
try {
	for (const file of modelFiles) {
		const model = await import(path.join(`file://${__dirname}`, `${file}.cjs`));
		db[model.name] = model.default(sequelize);
		new db[model.name](sequelize);
	}
} catch (err) {
	console.log(err);
}

const dbmodels = Object.keys(db.sequelize.models);
// console.log(dbmodels);
for (const modelName of dbmodels) {
	if (db.sequelize.models[modelName].associate) {
		// console.log(db.sequelize.models[modelName]);
		db.sequelize.models[modelName].associate(db.sequelize.models);
	}
}
// console.log(
// 	"models/index.js Associtions",
// 	"users",
// 	db.sequelize.models.Users?.associations,
// 	"Tricks",
// 	db.sequelize.models.Tricks?.associations
// );
export default db;
