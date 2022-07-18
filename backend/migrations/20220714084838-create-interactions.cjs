"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Interactions",
			{
				interaction_id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
				},
				user_id: {
					type: Sequelize.INTEGER,
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
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			{ constraints: false }
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Interactions");
	},
};
