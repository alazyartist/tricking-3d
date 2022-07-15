"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Tricks", {
			trick_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
			},
			user_renamed: {
				type: Sequelize.STRING,
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
			variations_id: {
				type: Sequelize.INTEGER,
			},
			base_id: {
				type: Sequelize.INTEGER,
				references: { model: "Bases", key: "base_id" },
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
		await queryInterface.dropTable("Tricks");
	},
};
