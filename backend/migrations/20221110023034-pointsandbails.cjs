"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addColumn("SessionData", "bail", Sequelize.INTEGER, {
			defaultValue: 0,
			allowNull: false,
		});
		await queryInterface.addColumn(
			"Tricks",
			"pointValue",
			Sequelize.INTEGER,
			{}
		);
		await queryInterface.addColumn(
			"Combos",
			"pointValue",
			Sequelize.INTEGER,
			{}
		);
		await queryInterface.addColumn("Bases", "pointValue", Sequelize.INTEGER, {
			defaultValue: 0.5,
			allowNull: false,
		});
		await queryInterface.addColumn("Stances", "pointValue", Sequelize.INTEGER, {
			defaultValue: 0.5,
			allowNull: false,
		});
		await queryInterface.addColumn(
			"Variations",
			"pointValue",
			Sequelize.INTEGER,
			{
				defaultValue: 0.5,
				allowNull: false,
			}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
