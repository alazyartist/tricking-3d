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
			//Fulls

			{
				//DoubleLeg pike
				trick_id: "5aa66c74-2f32-11ed-9dce-83cffac8c741",
				variation_id: 29,
			},
			{
				//dragonfly-Cork dragonfly
				trick_id: "ed832bc6-eae3-458d-8cfd-ragonflycork",
				variation_id: 9,
			},
			{
				//dragonfly-Cork fulltwist
				trick_id: "ed832bc6-eae3-458d-8cfd-ragonflycork",
				variation_id: 5,
			},
			{
				//rodeo-Cork grab right
				trick_id: "ed832bc6-eae3-458d-8cfc-26brodeocork",
				variation_id: 34,
			},
			{
				//rodeo-Cork fulltwist
				trick_id: "ed832bc6-eae3-458d-8cfc-26brodeocork",
				variation_id: 5,
			},
			{
				//Cork.hyper-hook latehook
				trick_id: "ed832bc6-eae3-458d-8cfc-orkhyperhook",
				variation_id: 22,
			},
			{
				//Cork.hyper-hook fulltwist
				trick_id: "ed832bc6-eae3-458d-8cfc-orkhyperhook",
				variation_id: 5,
			},
			{
				//Cork-shuriken shuriken
				trick_id: "ed832bc6-eae3-458d-8cfc-orkshuiriken",
				variation_id: 18,
			},
			{
				//Cork-shuriken fulltwist
				trick_id: "ed832bc6-eae3-458d-8cfc-orkshuiriken",
				variation_id: 5,
			},
			{
				//Cork.mega-round lateround
				trick_id: "ed832bc6-eae3-458d-8cfc-orkmegaround",
				variation_id: 15,
			},
			{
				//Cork.mega-round fultwist
				trick_id: "ed832bc6-eae3-458d-8cfc-orkmegaround",
				variation_id: 5,
			},
			{
				//cork-Round round
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkround",
				variation_id: 12,
			},
			{
				//cork-Round fulltwist
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkround",
				variation_id: 5,
			},
			{
				//cork-Swipe swipe
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkswipe",
				variation_id: 13,
			},
			{
				//cork-Swipe fultwist
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkswipe",
				variation_id: 5,
			},
			{
				//reversao-Scissor scissor
				trick_id: "5aa66c92-2f32-11ed-9dcf-6fbfead50465",
				variation_id: 39,
			},
			{
				//snapu swipe
				trick_id: "5aa66c92-2f32-11ed-9dcf-6fbfead50465",
				variation_id: 13,
			},
			{
				//snapu twist
				trick_id: "5aa66c92-2f32-11ed-9dcf-6fbfead50465",
				variation_id: 7,
			},
			{
				//sailor-Raiz sailor
				trick_id: "5aa66cec-2f32-11ed-9dd2-4322700699cc",
				variation_id: 1,
			},
			{
				//touchdown-Raiz touchdown
				trick_id: "59a4c8a5-545a-4235-b8bf-75839161bb7e",
				variation_id: 4,
			},
			{
				//Raiz-twist twist
				trick_id: "5aa66d0a-2f32-11ed-9dd3-93cdc8b2c37a",
				variation_id: 7,
			},
			{
				//master-Scoot scoot
				trick_id: "e0ede2a5-199e-4228-bdff-e63102b31eb4",
				variation_id: 42,
			},
			{
				//master-Scoot scoot
				trick_id: "01ef8300-9bf3-4259-820f-e496baad9f9c",
				variation_id: 41,
			},
			{
				//Scoot-twist twist
				trick_id: "5aa66d28-2f32-11ed-9dd4-9b934527a4b6",
				variation_id: 7,
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
