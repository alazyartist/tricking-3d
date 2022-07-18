"use strict";
import { DataTypes } from "sequelize";
export const Stance = (sequelize) => {
	return sequelize.define(
		"Stances",
		{
			stance_id: {
				type: DataTypes.STRING,
			},
			trick_id: {
				type: DataTypes.UUID,
			},
			name: DataTypes.STRING,
			leg: DataTypes.STRING,
			direction: DataTypes.STRING,
			stanceRotation: DataTypes.INTEGER,
		},
		{ constraints: false }
	);
};
