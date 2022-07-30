"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Transitions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
				defaultValue: "Transition",
			},
			transitionType: {
				type: Sequelize.STRING,
			},
			takeoffStyle: {
				type: Sequelize.STRING,
			},
			landingStyle: {
				type: Sequelize.STRING,
			},
			fromLeg: {
				type: Sequelize.STRING,
			},
			toLeg: {
				type: Sequelize.STRING,
			},
			rotation: {
				type: Sequelize.INTEGER,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Transitions");
	},
};
