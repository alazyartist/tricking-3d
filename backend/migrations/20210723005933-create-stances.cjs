"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Stances", {
			stance_id: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
				defaultValue: "Stance",
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
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Stances");
	},
};
