"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Bases", {
			base_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
				type: Sequelize.INTEGER,
				references: { model: "Stances", key: "stance_id" },
			},
			takeoffStance_id: {
				type: Sequelize.INTEGER,
				references: { model: "Stances", key: "stance_id" },
			},
			landingStance_id: {
				type: Sequelize.INTEGER,
				references: { model: "Stances", key: "stance_id" },
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
		await queryInterface.dropTable("Bases");
	},
};
