"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Bases", {
			base_id: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			trick_id: {
				type: Sequelize.UUID,
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

			takeoffStance: {
				type: Sequelize.STRING,
			},
			landingStance: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Bases");
	},
};
