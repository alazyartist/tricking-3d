"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Profiles", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.UUID,
			},
			name: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.STRING,
			},
			socials: {
				type: Sequelize.JSON,
			},
			age: {
				type: Sequelize.INTEGER,
			},
			country: {
				type: Sequelize.STRING,
			},
			state: {
				type: Sequelize.STRING,
			},
			city: {
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
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Profiles");
	},
};
