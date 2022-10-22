"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("battlerooms", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			host: {
				type: Sequelize.UUID,
			},
			sessionid: {
				type: Sequelize.UUID,
				unique: true,
			},
			team1: {
				type: Sequelize.JSON,
			},
			team2: {
				type: Sequelize.JSON,
			},
			judges: {
				type: Sequelize.JSON,
			},
			duration: {
				type: Sequelize.INTEGER,
			},
			isOpen: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable("battlerooms");
	},
};
