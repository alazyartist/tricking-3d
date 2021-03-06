"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Variations", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			variationType: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
				defaultValue: "Variation",
			},
			name: {
				type: Sequelize.STRING,
			},
			value: {
				type: Sequelize.STRING,
			},
			pos: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Variations");
	},
};
