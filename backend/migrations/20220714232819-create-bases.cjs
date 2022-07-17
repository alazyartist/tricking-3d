"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Bases", {
			base_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
			},
			direction: {
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
			stance_id: {
				type: Sequelize.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			takeoffStance_id: {
				type: Sequelize.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			landingStance_id: {
				type: Sequelize.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Bases");
	},
};
