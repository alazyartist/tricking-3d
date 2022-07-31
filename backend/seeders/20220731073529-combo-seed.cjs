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
			{
				combo_id: uuidv4(),
				name: "Aerial>Pop",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "ch180swipe-wr180round",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "ch180swipe-wr180feint",
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
				name: "Cartwheel>!Cartwheel",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Cartwheel>Punch",
				creator: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				combo_id: uuidv4(),
				name: "Hook>Masterscoot",
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
