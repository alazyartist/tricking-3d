"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ClaimedTricks", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.UUID,
			},
			trick_id: {
				type: Sequelize.UUID,
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
		await queryInterface.dropTable("ClaimedTricks");
	},
};
