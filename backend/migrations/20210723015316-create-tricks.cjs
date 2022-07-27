"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Tricks", {
			trick_id: {
				allowNull: false,
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			base_id: {
				type: Sequelize.STRING,
				references: { model: "Bases", key: "base_id" },
			},
			name: {
				type: Sequelize.STRING,
			},
			stance_id: {
				type: Sequelize.STRING,
			},
			takeoffStance: {
				type: Sequelize.STRING,
			},
			landingStance: {
				type: Sequelize.STRING,
			},
			defaultAnimation: {
				type: Sequelize.UUID,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Tricks");
	},
};
