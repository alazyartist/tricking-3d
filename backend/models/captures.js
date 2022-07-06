"use strict";
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
			user_id: DataTypes.INTEGER,
			captured_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Captures",
		}
	);
};
