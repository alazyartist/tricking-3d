"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Bases",
			{
				base_id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.STRING,
				},
				name: {
					type: Sequelize.STRING,
				},
				direction: {
					type: Sequelize.STRING,
				},
				fromLeg: {
					type: Sequelize.STRING,
				},
				toLeg: {
					type: Sequelize.STRING,
				},
				rotation: {
					type: Sequelize.INTEGER,
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
			},
			{ constraints: false }
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Bases");
	},
};
