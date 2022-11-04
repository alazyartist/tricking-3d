"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("SessionData", {
			id: {
				defaultValue: uuidv4(),
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			srcid: {
				type: Sequelize.UUID,
			},
			sessionid: {
				type: Sequelize.UUID,
			},
			clipLabel: {
				type: Sequelize.UUID,
			},
			clipStart: {
				type: Sequelize.STRING,
			},
			clipEnd: {
				type: Sequelize.STRING,
			},
			admin: {
				type: Sequelize.UUID,
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				defaultValue: Sequelize.DATE,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("SessionData");
	},
};
