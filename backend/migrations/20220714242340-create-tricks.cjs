"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Tricks", {
			trick_id: {
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
			},
			user_renamed: {
				type: Sequelize.STRING,
			},
			stance_id: {
				type: Sequelize.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			takeoffStance_id: {
				type: Sequelize.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			landingStance_id: {
				type: Sequelize.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			variations_id: {
				type: Sequelize.INTEGER,
			},
			base_id: {
				type: Sequelize.STRING,
				references: { model: "Bases", key: "base_id" },
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Tricks");
	},
};
