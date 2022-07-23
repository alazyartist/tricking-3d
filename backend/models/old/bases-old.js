"use strict";
import { DataTypes } from "sequelize";

export const Base = (sequelize) => {
	return sequelize.define("Bases", {
		base_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		trick_id: {
			type: DataTypes.UUID,
		},
		name: DataTypes.STRING,
		direction: DataTypes.STRING,
		fromLeg: DataTypes.STRING,
		toLeg: DataTypes.STRING,
		rotation: DataTypes.INTEGER,
		stance_id: {
			type: DataTypes.STRING,
			references: {
				model: "Stances",
				key: "stance_id",
			},
		},
		takeoffStance_id: {
			type: DataTypes.STRING,
		},
		landingStance_id: {
			type: DataTypes.STRING,
		},
	});
};
