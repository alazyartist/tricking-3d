"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("UserScores", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sessionid: {
				type: Sequelize.UUID,
			},
			userid: {
				type: Sequelize.UUID,
			},
			team: {
				type: Sequelize.JSON,
			},
			score: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("UserScores");
	},
};
