"use strict";

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
		await queryInterface.bulkInsert("Trick_Variations", [
			{
				variation_id: 2,
				trick_id: "ed832bc6-eae3-458d-8cf2-26b5b531d96c",
			},
			{
				variation_id: 6,
				trick_id: "ed832bc6-eae3-458d-8cf2-26b5b531d96c",
			},
			{
				variation_id: 21,
				trick_id: "ed832bc6-eae3-458d-8cf2-26b5b531d96c",
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
