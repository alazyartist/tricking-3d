"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert("Tricks", [
			{
				trick_id: uuidv4(),
				name: "Cork",
				stance_id: "BacksideComplete",
				takeoffStance_id: "BacksideComplete",
				landingStance_id: "BacksideComplete",
				base_id: "Gainer",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
