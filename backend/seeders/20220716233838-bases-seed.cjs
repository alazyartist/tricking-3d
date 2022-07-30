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
				takeoffStance: "Backside",
				landingStance: "Backside",
			},
			{
				base_id: "Frontflip",
				name: "Frontflip",
				direction: "Forwards",
				fromLeg: "Both",
				toLeg: "Both",
				rotation: 0,
				stance_id: "Frontside",
				takeoffStance: "Frontside",
				landingStance: "Frontside",
			},
			{
				base_id: "Insideflip",
				name: "Insideflip",
				direction: "Inside",
				fromLeg: "Both",
				toLeg: "Both",
				rotation: 0,
				stance_id: "Inside",
				takeoffStance: "Inside",
				landingStance: "Inside",
			},
			{
				base_id: "Outsideflip",
				name: "Outsideflip",
				direction: "Outside",
				fromLeg: "Both",
				toLeg: "Both",
				rotation: 0,
				stance_id: "Outside",
				takeoffStance: "Outside",
				landingStance: "Outside",
			},
			{
				base_id: "Gainer",
				name: "Gainer",
				direction: "Backwards",
				fromLeg: "Left",
				toLeg: "Right",
				rotation: 0,
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideHyper",
			},
			{
				base_id: "GainerR",
				name: "GainerR",
				direction: "Backwards",
				fromLeg: "Right",
				toLeg: "Left",
				rotation: 0,
				stance_id: "BacksideHyper",
				takeoffStance: "BacksideHyper",
				landingStance: "BacksideComplete",
			},
			{
				base_id: "GMS",
				name: "GMS",
				direction: "Inside",
				fromLeg: "Right",
				toLeg: "Right",
				rotation: 0,
				stance_id: "InsideHyper",
				takeoffStance: "InsideHyper",
				landingStance: "InsideHyper",
			},
			{
				base_id: "Aerial",
				name: "Aerial",
				direction: "Inside",
				fromLeg: "Left",
				toLeg: "Right",
				rotation: 0,
				stance_id: "InsideMega",
				takeoffStance: "InsideMega",
				landingStance: "InsideHyper",
			},
			{
				base_id: "Webster",
				name: "Webster",
				direction: "Forwards",
				fromLeg: "Left",
				toLeg: "Right",
				rotation: 0,
				stance_id: "FrontsideMega",
				takeoffStance: "FrontsideMega",
				landingStance: "FrontsideSemi",
			},
			{
				base_id: "WebsterR",
				name: "WebsterR",
				direction: "Forwards",
				fromLeg: "Right",
				toLeg: "Left",
				rotation: 0,
				stance_id: "FrontsideSemi",
				takeoffStance: "FrontsideSemi",
				landingStance: "FrontsideMega",
			},
			{
				base_id: "Raiz",
				name: "Raiz",
				direction: "Outside",
				fromLeg: "Right",
				toLeg: "Right",
				rotation: 0,
				stance_id: "OutsideSemi",
				takeoffStance: "OutsideSemi",
				landingStance: "BacksideComplete",
			},
			{
				base_id: "Lotus",
				name: "Lotus",
				direction: "Outside",
				fromLeg: "Left",
				toLeg: "Left",
				rotation: 0,
				stance_id: "OutsideComplete",
				takeoffStance: "OutsideComplete",
				landingStance: "OutsideComplete",
			},
			{
				base_id: "Hook",
				name: "Hook",
				direction: "Backwards",
				fromLeg: "Right",
				toLeg: "Right",
				rotation: 0,
				stance_id: "BacksideHyper",
				takeoffStance: "BacksideHyper",
				landingStance: "BacksideHyper",
			},
			{
				base_id: "Round",
				name: "Round",
				direction: "Forwards",
				fromLeg: "Left",
				toLeg: "Left",
				rotation: 0,
				stance_id: "FrontsideMega",
				takeoffStance: "FrontsideMega",
				landingStance: "FrontsideMega",
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
