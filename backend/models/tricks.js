"use strict";

import { DataTypes } from "sequelize";

export const Trick = (sequelize) => {
	return sequelize.define(
		"Tricks",
		{
			trick_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			user_renamed: DataTypes.STRING,
			stance_id: {
				type: DataTypes.STRING,
			},
			takeoffStance_id: {
				type: DataTypes.STRING,
			},
			landingStance_id: {
				type: DataTypes.STRING,
			},
			variations_id: DataTypes.INTEGER,
			base_id: DataTypes.STRING,
		},
		{ constraints: false }
	);
};
