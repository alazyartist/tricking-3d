"use strict";
import { DataTypes } from "sequelize";

export const Base = (sequelize) => {
	return sequelize.define("Bases", {
		base_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: DataTypes.STRING,
		direction: DataTypes.STRING,
		fromLeg: DataTypes.STRING,
		toLeg: DataTypes.STRING,
		rotation: DataTypes.INTEGER,
		stance_id: {
			type: DataTypes.INTEGER,
			references: { model: "Stances", key: "id" },
		},
		takeoffStance_id: {
			type: DataTypes.INTEGER,
			references: { model: "Stances", key: "id" },
		},
		landingStance_id: {
			type: DataTypes.INTEGER,
			references: { model: "Stances", key: "id" },
		},
	});
};
