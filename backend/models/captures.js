"use strict";
import { User } from "./Users.js";
import { DataTypes } from "sequelize";
export const Captures = (sequelize) => {
	return sequelize.define(
		"captures",
		{
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
		},
		{
			sequelize,
			modelName: "Captures",
			underscored: true,
		}
	);
};
