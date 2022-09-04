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
		await queryInterface.bulkInsert("Combos", [
			//Kerwood Combos
			{
				combo_id: uuidv4(),
				name: "Aerial>Pop",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "942bbdb0-5cd8-475e-b327-64de97859be0",
			},
			{
				combo_id: uuidv4(),
				name: "ch180swipe-wr180round",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "4575bfb1-33a8-4221-8723-7cef7874a606",
			},
			{
				combo_id: uuidv4(),
				name: "ch180swipe-wr180feint",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "43b1f2f6-813a-4523-836d-9649ea9b1c40",
			},
			{
				combo_id: uuidv4(),
				name: "Cart>DoubleFull",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "6e4efe4d-b2a9-4b84-b05e-b2a4f300da03",
			},
			{
				combo_id: uuidv4(),
				name: "Cartwheel>!Cartwheel",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "18168226-37a3-4292-b2d2-1e3e8e7e6bd9",
			},
			{
				combo_id: uuidv4(),
				name: "Cartwheel>Punch",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "6a425997-4828-4315-a169-75259d0c9c33",
			},
			{
				combo_id: uuidv4(),
				name: "Hook>Masterscoot",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "ba412fa4-b480-4bca-8a4b-41da53486612",
			},
			{
				combo_id: uuidv4(),
				name: "Hook>wrap180Hook",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "fda5359e-8344-41f5-bbf2-49907e1b8b22",
			},
			{
				combo_id: uuidv4(),
				name: "Touchdown-Raiz>DoubleCork",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "118c6ae8-e38b-4573-87e3-d566c893e33a",
			},
			{
				combo_id: uuidv4(),
				name: "Touchdown-Raiz>Valdez",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				defaultAnimation: "08150b26-dddf-4f73-9cd4-a4380c541ff8",
			},
			//Andrew Combos
			{
				combo_id: uuidv4(),
				name: "Aerial>GMS",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>DoubleFull",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>DoubleFull>Cork",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>DoubleFull-dleg",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>DoubleFull-round",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>Full-snapu",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>Full-swipe",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>triple-Full",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cork>Cork-dleg",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cork>Cork",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cork>DoubleCork",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "CorkX3",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>Dub>s180Hook",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "DoubleBtwist>Aerial",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>Dub>DubCork",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cart>Dub>Cork-snapu",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "GainerSwitchX3",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Hook>GMS",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Hook>master-Scoot>Cork",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "master-Scoot>Cork-shuriken-hyperhook",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "master-Scoot>Cork-dleg",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "RoundOff>Nike",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "p180Hook>Cart-twist",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "master-scoot>DoubleCork",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Scoot>Dub",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Touchdown-Raiz>Cork-hyperhook",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Touchdown-Raiz>Cork-shuriken-hyperhook",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
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
