"use strict";
import { Sequelize } from "sequelize";

export const Interactions = (sequelize) => {
	sequelize.define(
		"Interactions",
		{
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: "users", key: "id" },
			},
			interaction_id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
			trick_id: {
				type: Sequelize.UUID,
			},
			type: Sequelize.STRING,
			content: Sequelize.STRING,
		},
		{
			underscored: true,
		}
	);
};
