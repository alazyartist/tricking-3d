"use strict";

import { DataTypes } from "sequelize";

export const Trick = (sequelize) => {
	return sequelize.define("Tricks", {
		trick_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
		name: DataTypes.STRING,
		user_renamed: DataTypes.STRING,
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
		variations_id: DataTypes.INTEGER,
		base_id: DataTypes.INTEGER,
	});
};
