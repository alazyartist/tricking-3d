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
				trick_id: "ed832bc6-eae3-458d-8cfd-ragonflycork",
				variation_id: 9,
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfc-26brodeocork",
				variation_id: 34,
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfc-orkhyperhook",

				variation_id: 22,
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfc-orkshuiriken",
				variation_id: 18,
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfc-orkmegaround",
				variation_id: 15,
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkround",
				variation_id: 12,
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkswipe",
				variation_id: 13,
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
