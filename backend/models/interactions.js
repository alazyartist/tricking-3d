"use strict";
import { Sequelize } from "sequelize";

export const Interactions = (sequelize) => {
	return sequelize.define(
		"Interactions",
		{
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: "users", key: "user_id" },
			},
			interaction_id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			trick_id: {
				type: Sequelize.UUID,
			},
			type: Sequelize.STRING,
			content: Sequelize.STRING,
			createdAt: {
				allowNull: false,
				field: "created_at",
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				field: "updated_at",
				type: Sequelize.DATE,
			},
		},
		{ uderscored: false }
	);
};
