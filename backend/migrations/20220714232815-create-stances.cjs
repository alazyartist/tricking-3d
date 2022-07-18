"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Stances",
			{
				stance_id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.STRING,
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
			},
			{ constraints: false }
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Stances");
	},
};
