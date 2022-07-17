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
		await queryInterface.bulkInsert("Stances", [
			{
				stance_id: "Backside",
				name: "Backside",
				leg: "Both",
				direction: "Backwards",
				stanceRotation: 0,
			},
			{
				stance_id: "BacksideComplete",
				name: "BacksideComplete",
				leg: "Left",
				direction: "Backwards",
				stanceRotation: 0,
			},
			{
				stance_id: "BacksideHyper",
				name: "BacksideHyper",
				leg: "Right",
				direction: "Backwards",
				stanceRotation: 0,
			},
			{
				stance_id: "Inside",
				name: "Inside",
				leg: "Both",
				direction: "Inside",
				stanceRotation: 90,
			},
			{
				stance_id: "InsideHyper",
				name: "InsideHyper",
				leg: "Right",
				direction: "Inside",
				stanceRotation: 90,
			},
			{
				stance_id: "InsideMega",
				name: "InsideMega",
				leg: "Left",
				direction: "Inside",
				stanceRotation: 90,
			},
			{
				stance_id: "Frontside",
				name: "Frontside",
				leg: "Both",
				direction: "Forwards",
				stanceRotation: 180,
			},
			{
				stance_id: "FrontsideMega",
				name: "FrontsideMega",
				leg: "Left",
				direction: "Forwards",
				stanceRotation: 180,
			},
			{
				stance_id: "FrontsideSemi",
				name: "FrontsideSemi",
				leg: "Right",
				direction: "Forwards",
				stanceRotation: 180,
			},
			{
				stance_id: "Outside",
				name: "Outside",
				leg: "Both",
				direction: "Outside",
				stanceRotation: 270,
			},
			{
				stance_id: "OutsideSemi",
				name: "OutsideSemi",
				leg: "Right",
				direction: "Outside",
				stanceRotation: 270,
			},
			{
				stance_id: "OutsideComplete",
				name: "OutsideComplete",
				leg: "Left",
				direction: "Outside",
				stanceRotation: 270,
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
