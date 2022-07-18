"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Tricks",
			{
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
				},
				takeoffStance_id: {
					type: Sequelize.STRING,
				},
				landingStance_id: {
					type: Sequelize.STRING,
				},
				variations_id: {
					type: Sequelize.INTEGER,
				},
				base_id: {
					type: Sequelize.STRING,
				},
			},
			{ constraints: false }
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Tricks");
	},
};
