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
		await queryInterface.bulkInsert("Variations", [
			{
				variationType: "Touchdown",
				name: "Sailor",
				value: "Right",
				pos: "En,B",
			},
			{
				variationType: "Touchdown",
				name: "Venus",
				value: "Left",
				pos: "En,B",
			},
			{
				variationType: "Touchdown",
				name: "Broken",
				value: "Right",
				pos: "E,Ex",
			},
			{
				variationType: "Touchdown",
				name: "Touchdown",
				value: "Left",
				pos: "E,Ex",
			},
			{
				variationType: "Rotation",
				name: "FullTwist",
				value: "360",
				pos: "B,M,E",
			},
			{
				variationType: "Rotation",
				name: "FullUp",
				value: "360",
				pos: "En,B",
			},
			{
				variationType: "Rotation",
				name: "Twist",
				value: "360",
				pos: "M",
			},
			{
				variationType: "Rotation",
				name: "Gyro",
				value: "360",
				pos: "En,Ex",
			},
			{
				variationType: "Kick",
				name: "Dragonfly",
				value: "Round",
				pos: "En",
			},
			{
				variationType: "Kick",
				name: "Kick",
				value: "Round",
				pos: "B",
			},
			{
				variationType: "Kick",
				name: "Swipe",
				value: "Round",
				pos: "M",
			},
			{
				variationType: "Kick",
				name: "Round",
				value: "Round",
				pos: "E",
			},
			{
				variationType: "Kick",
				name: "Swipe",
				value: "Round",
				pos: "M,E",
			},
			{
				variationType: "Kick",
				name: "Flash",
				value: "Round",
				pos: "M,E",
			},
			{
				variationType: "Kick",
				name: "LateRound",
				value: "Round",
				pos: "Ex",
			},
			{
				variationType: "Kick",
				name: "Dragonfly",
				value: "Hook",
				pos: "En",
			},
			{
				variationType: "Kick",
				name: "Graizer",
				value: "Hook",
				pos: "B",
			},
			{
				variationType: "Kick",
				name: "Shuriken",
				value: "Hook",
				pos: "M",
			},
			{
				variationType: "Kick",
				name: "Hook",
				value: "Hook",
				pos: "E",
			},
			{
				variationType: "Kick",
				name: "Shuriken",
				value: "Hook",
				pos: "M,E",
			},
			{
				variationType: "Kick",
				name: "Flash",
				value: "Hook",
				pos: "M,E",
			},
			{
				variationType: "Kick",
				name: "LateHook",
				value: "Hook",
				pos: "Ex",
			},
			{
				variationType: "Shape",
				name: "IronMan",
				value: "IronMan",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "FigureFour",
				value: "FigureFour",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "X-Out",
				value: "X-Out",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "Tuck",
				value: "Tuck",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "Layout",
				value: "Layout",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "PeterPan",
				value: "PeterPan",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "DonutBoy",
				value: "DonutBoy",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "SuperMan",
				value: "SuperMan",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "Cowboy",
				value: "Cowboy",
				pos: "B,M,E",
			},
			{
				variationType: "Shape",
				name: "Sidewinder",
				value: "Sidewinder",
				pos: "B,M,E",
			},
			{
				variationType: "Grab",
				name: "Left",
				value: "Left",
				pos: "B,M,E",
			},
			{
				variationType: "Grab",
				name: "Right",
				value: "Right",
				pos: "B,M,E",
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
