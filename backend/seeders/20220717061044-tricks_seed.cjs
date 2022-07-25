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
				base_id: "Backflip",
				name: "Backflip",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				trick_id: uuidv4(),
				base_id: "Gainer",
				name: "Gainer",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideHyper",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				trick_id: uuidv4(),
				base_id: "Gainer",
				name: "Cork",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
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
