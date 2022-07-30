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

			skeleton: {
				type: Sequelize.STRING,
			},
			fileName: {
				type: Sequelize.STRING,
			},
			model: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Animations");
	},
};
