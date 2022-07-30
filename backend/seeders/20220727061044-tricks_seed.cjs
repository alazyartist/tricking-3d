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
			//BaseTricks
			//1
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "Backflip",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				trickType: "Invert",
			},
			//2
			{
				trick_id: uuidv4(),
				base_id: "InsideFlip",
				name: "InsideFlip",
				stance_id: "Inside",
				takeoffStance: "Inside",
				landingStance: "Inside",
				trickType: "Invert",
			},
			//3
			{
				trick_id: uuidv4(),
				base_id: "Frontflip",
				name: "Frontflip",
				stance_id: "Frontside",
				takeoffStance: "Frontside",
				landingStance: "Frontside",
				trickType: "Invert",
			},
			//4
			{
				trick_id: uuidv4(),
				base_id: "OutsideFlip",
				name: "OutsideFlip",
				stance_id: "Outside",
				takeoffStance: "Outside",
				landingStance: "Outside",
				trickType: "Invert",
			},
			//5
			{
				trick_id: uuidv4(),
				base_id: "Gainer",
				name: "Gainer",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideHyper",
				trickType: "Invert",
			},
			//6
			{
				trick_id: uuidv4(),
				base_id: "GainerR",
				name: "DSGainer",
				stance_id: "BacksideHyper",
				takeoffStance: "BacksideHyper",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},

			//7
			{
				trick_id: uuidv4(),
				base_id: "GMS",
				name: "GMS",
				stance_id: "InsideHyper",
				takeoffStance: "InsideHyper",
				landingStance: "InsideHyper",
				trickType: "Invert",
			},
			//8
			{
				trick_id: uuidv4(),
				base_id: "Aerial",
				name: "Aerial",
				stance_id: "InsideMega",
				takeoffStance: "InsideMega",
				landingStance: "InsideHyper",
				trickType: "Invert",
			},
			//9
			{
				trick_id: uuidv4(),
				base_id: "Webster",
				name: "Webster",
				stance_id: "FrontsideMega",
				takeoffStance: "FrontsideMega",
				landingStance: "FrontsideSemi",
				trickType: "Invert",
			},
			//10
			{
				trick_id: uuidv4(),
				base_id: "WebsterR",
				name: "DSWebster",
				stance_id: "FrontsideSemi",
				takeoffStance: "FrontsideSemi",
				landingStance: "FrontsideMega",
				trickType: "Invert",
			},
			//11
			{
				trick_id: uuidv4(),
				base_id: "Raiz",
				name: "Raiz",
				stance_id: "OutsideSemi",
				takeoffStance: "OutsideSemi",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			//12
			{
				trick_id: uuidv4(),
				base_id: "Lotus",
				name: "Lotus",
				stance_id: "OutsideComplete",
				takeoffStance: "OutsideComplete",
				landingStance: "OutsideComplete",
				trickType: "Invert",
			},
			//Fulls
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "Flashkick",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "Full",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "kick-Full",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "graizer-Full",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "Full-swipe",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "BacksideHyper",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "Full-shuriken",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "Full-round",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "Full.hyper-hook",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "BacksideHyper",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "Full.mega-round",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "FrontsideMega",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "double-Full",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "triple-Full",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Backflip",
				name: "quad-Full",
				stance_id: "Backside",
				takeoffStance: "Backside",
				landingStance: "Backside",
				trickType: "Invert",
			},
			//Corks
			{
				trick_id: uuidv4(),
				base_id: "Gainer",
				name: "Cork",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfd-ragonflycork",
				base_id: "Gainer",
				name: "dragonfly-Cork",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkswipe",
				base_id: "Gainer",
				name: "Cork-swipe",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideHyper",
				trickType: "Invert",
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkround",
				base_id: "Gainer",
				name: "Cork-round",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfc-orkmegaround",
				base_id: "Gainer",
				name: "Cork.mega-round",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "FrontsideMega",
				trickType: "Invert",
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfc-orkshuiriken",
				base_id: "Gainer",
				name: "Cork-shuriken",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfc-orkhyperhook",
				base_id: "Gainer",
				name: "Cork.hyper-hook",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideHyper",
				trickType: "Invert",
			},
			{
				trick_id: "ed832bc6-eae3-458d-8cfc-26brodeocork",
				base_id: "Gainer",
				name: "rodeo-Cork",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Gainer",
				name: "double-Cork",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				trickType: "Invert",
			},
			{
				trick_id: uuidv4(),
				base_id: "Gainer",
				name: "triple-Cork",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				trickType: "Invert",
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
		trickType: "Invert";
	},
};
