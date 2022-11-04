"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("SessionSources", {
			srcid: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: uuidv4(),
			},
			sessionid: {
				type: Sequelize.UUID,
			},
			vidsrc: {
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
		await queryInterface.dropTable("SessionSources");
	},
};
