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
		await queryInterface.bulkInsert("Bases", [
			{
				base_id: "Backflip",
				name: "Backflip",
				direction: "Backwards",
				fromLeg: "Both",
				toLeg: "Both",
				rotation: 0,
				stance_id: "Backside",
				takeoffStance_id: "Backside",
				landingStance_id: "Backside",
			},
			{
				base_id: "Frontflip",
				name: "Frontflip",
				direction: "Forwards",
				fromLeg: "Both",
				toLeg: "Both",
				rotation: 0,
				stance_id: "Frontside",
				takeoffStance_id: "Frontside",
				landingStance_id: "Frontside",
			},
			{
				base_id: "Insideflip",
				name: "Insideflip",
				direction: "Inside",
				fromLeg: "Both",
				toLeg: "Both",
				rotation: 0,
				stance_id: "Inside",
				takeoffStance_id: "Inside",
				landingStance_id: "Inside",
			},
			{
				base_id: "Outsideflip",
				name: "Outsideflip",
				direction: "Outside",
				fromLeg: "Both",
				toLeg: "Both",
				rotation: 0,
				stance_id: "Outside",
				takeoffStance_id: "Outside",
				landingStance_id: "Outside",
			},
			{
				base_id: "Gainer",
				name: "Gainer",
				direction: "Backwards",
				fromLeg: "Left",
				toLeg: "Right",
				rotation: 0,
				stance_id: "BacksideComplete",
				takeoffStance_id: "BacksideComplete",
				landingStance_id: "BacksideHyper",
			},
			{
				base_id: "GainerR",
				name: "GainerR",
				direction: "Forwards",
				fromLeg: "Right",
				toLeg: "Left",
				rotation: 0,
				stance_id: "BacksideHyper",
				takeoffStance_id: "BacksideHyper",
				landingStance_id: "BacksideComplete",
			},
			{
				base_id: "GMS",
				name: "GMS",
				direction: "Inside",
				fromLeg: "Right",
				toLeg: "Right",
				rotation: 0,
				stance_id: "InsideHyper",
				takeoffStance_id: "InsideHyper",
				landingStance_id: "InsideHyper",
			},
			{
				base_id: "Aerial",
				name: "Aerial",
				direction: "Inside",
				fromLeg: "Left",
				toLeg: "Right",
				rotation: 0,
				stance_id: "InsideMega",
				takeoffStance_id: "InsideMega",
				landingStance_id: "InsideHyper",
			},
			{
				base_id: "Webster",
				name: "Webster",
				direction: "Forwards",
				fromLeg: "Left",
				toLeg: "Right",
				rotation: 0,
				stance_id: "FrontsideMega",
				takeoffStance_id: "FrontsideMega",
				landingStance_id: "FrontsideSemi",
			},
			{
				base_id: "WebsterR",
				name: "WebsterR",
				direction: "Forwards",
				fromLeg: "Right",
				toLeg: "Left",
				rotation: 0,
				stance_id: "FrontsideSemi",
				takeoffStance_id: "FrontsideSemi",
				landingStance_id: "FrontsideMega",
			},
			{
				base_id: "Raiz",
				name: "Raiz",
				direction: "Outside",
				fromLeg: "Right",
				toLeg: "Right",
				rotation: 0,
				stance_id: "OutsideSemi",
				takeoffStance_id: "OutsideSemi",
				landingStance_id: "BacksideComplete",
			},
			{
				base_id: "Lotus",
				name: "Lotus",
				direction: "Outside",
				fromLeg: "Left",
				toLeg: "Left",
				rotation: 0,
				stance_id: "OutsideComplete",
				takeoffStance_id: "OutsideComplete",
				landingStance_id: "OutsideComplete",
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
		await queryInterface.bulkDelete("Bases", null);
	},
};
