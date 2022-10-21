"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("battleroomstats", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sessionid: {
				type: Sequelize.UUID,
			},
			team1Score: {
				type: Sequelize.INTEGER,
			},
			team2Score: {
				type: Sequelize.INTEGER,
			},
			team1AudienceScore: {
				type: Sequelize.INTEGER,
			},
			team2AudienceScore: {
				type: Sequelize.INTEGER,
			},
			winner: {
				type: Sequelize.JSON,
			},
			audienceWinner: {
				type: Sequelize.JSON,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("battleroomstats");
	},
};
