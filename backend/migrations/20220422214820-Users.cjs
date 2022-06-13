"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
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
					type: Sequelize.UUID,
					primaryKey: true,
					defaultValue: Sequelize.UUIDV4,
				},
				user_name: {
					type: Sequelize.STRING,
					len: [2, 50],
					allowNull: true,
				},
				first_name: {
					type: Sequelize.STRING,
				},
				last_name: {
					type: Sequelize.STRING,
					required: true,
				},
				email: {
					type: Sequelize.STRING,
					isEmail: true,
					required: true,
					unique: true,
				},
				password: {
					type: Sequelize.STRING,
					required: true,
					allowNull: false,
				},
				createdAt: {
					field: "created_at",
					type: Sequelize.DATE,
				},
				updatedAt: {
					field: "updated_at",
					type: Sequelize.DATE,
				},
				deletedAt: {
					field: "deleted_at",
					type: Sequelize.DATE,
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
