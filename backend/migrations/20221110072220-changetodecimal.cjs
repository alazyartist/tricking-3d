"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */

		await queryInterface.changeColumn(
			"Tricks",
			"pointValue",
			Sequelize.FLOAT,
			{}
		);
		await queryInterface.changeColumn(
			"Combos",
			"pointValue",
			Sequelize.FLOAT,
			{}
		);
		await queryInterface.changeColumn("Bases", "pointValue", Sequelize.FLOAT, {
			defaultValue: 0.5,
			allowNull: false,
		});
		await queryInterface.changeColumn(
			"Stances",
			"pointValue",
			Sequelize.FLOAT,
			{
				defaultValue: 0.5,
				allowNull: false,
			}
		);
		await queryInterface.changeColumn(
			"Variations",
			"pointValue",
			Sequelize.FLOAT,
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
