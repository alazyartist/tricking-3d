"use strict";
import { User } from "./users.js";
import { DataTypes } from "sequelize";
export const Captures = (sequelize) => {
	return sequelize.define("Captures", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
		captured_id: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
	});
};
