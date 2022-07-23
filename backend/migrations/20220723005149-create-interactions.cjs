"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Interactions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
			},
			interaction_id: {
				type: Sequelize.UUID,
			},
			trick_id: {
				type: Sequelize.UUID,
			},
			type: {
				type: Sequelize.STRING,
			},
			content: {
				type: Sequelize.STRING,
			},
			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Interactions");
	},
};
