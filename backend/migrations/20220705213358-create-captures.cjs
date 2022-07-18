"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Captures",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				user_id: {
					type: Sequelize.INTEGER,
				},
				captured_id: {
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
			},
			{
				underscored: true,
				paranoid: true,
				constraints: false,
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Captures");
	},
};
