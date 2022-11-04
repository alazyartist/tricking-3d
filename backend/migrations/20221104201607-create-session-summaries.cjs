"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("SessionSummaries", {
			sessionid: {
				defaultValue: uuidv4(),
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			name: {
				type: Sequelize.STRING,
			},
			user_id: {
				type: Sequelize.UUID,
			},
			admin: {
				type: Sequelize.UUID,
			},
			sessionDate: {
				type: Sequelize.DATEONLY,
			},
			startTime: {
				type: Sequelize.STRING,
			},
			endTime: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("SessionSummaries");
	},
};
