"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Stances", {
			stance_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			trick_id: {
				type: Sequelize.UUID,
			},
			name: {
				type: Sequelize.STRING,
			},
			leg: {
				type: Sequelize.STRING,
			},
			direction: {
				type: Sequelize.STRING,
			},
			stanceRotation: {
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
		await queryInterface.dropTable("Stances");
	},
};
