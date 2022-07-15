"use strict";
import { DataTypes } from "sequelize";
export const Stance = (sequelize) => {
	return sequelize.define("Stances", {
		stance_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		trick_id: {
			type: DataTypes.INTEGER,
			references: { model: "Tricks", key: "trick_id" },
		},
		name: DataTypes.STRING,
		leg: DataTypes.STRING,
		direction: DataTypes.STRING,
		stanceRotation: DataTypes.INTEGER,
	});
};
