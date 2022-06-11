"use strict";

module.exports = {
	async up(queryInterface, DataTypes) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return queryInterface.createTable(
			"users",
			{
				id: {
					type: DataTypes.UUID,
					primaryKey: true,
				},
				user_name: {
					type: DataTypes.STRING,
					len: [2, 50],
					allowNull: true,
				},
				first_name: {
					type: DataTypes.STRING,
				},
				last_name: {
					type: DataTypes.STRING,
					required: true,
				},
				email: {
					type: DataTypes.STRING,
					isEmail: true,
					required: true,
				},
				password: {
					type: DataTypes.STRING,
					required: true,
				},
				account_created: {
					type: DataTypes.STRING,
					required: true,
				},
			},
			{
				underscored: true,
				paranoid: true,
			}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 */
		return queryInterface.dropTable("users");
	},
};
