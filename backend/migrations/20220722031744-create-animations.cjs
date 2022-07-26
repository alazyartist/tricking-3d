"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Animations", {
			animation_id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			animationName: {
				type: Sequelize.STRING,
			},
			trick_id: {
				type: Sequelize.UUID,
				references: { model: "Tricks", key: "trick_id" },
			},
			skeleton: {
				type: Sequelize.STRING,
			},
			fileName: {
				type: Sequelize.STRING,
			},
			model: {
				type: Sequelize.STRING,
			},
			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Animations");
	},
};
