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
				id: 1,
				variationType: "Touchdown",
				name: "Sailor",
				value: "Right",
				pos: "En,B",
			},
			{
				id: 2,
				variationType: "Touchdown",
				name: "Venus",
				value: "Left",
				pos: "En,B",
			},
			{
				id: 3,
				variationType: "Touchdown",
				name: "Broken",
				value: "Right",
				pos: "E,Ex",
			},
			{
				id: 4,
				variationType: "Touchdown",
				name: "Touchdown",
				value: "Left",
				pos: "E,Ex",
			},

			{
				id: 9,
				variationType: "Kick",
				name: "Dragonfly",
				value: "Round",
				pos: "En",
			},
			{
				id: 10,
				variationType: "Kick",
				name: "Kick",
				value: "Round",
				pos: "B",
			},
			{
				id: 11,
				variationType: "Kick",
				name: "Swipe",
				value: "Round",
				pos: "M",
			},
			{
				id: 12,
				variationType: "Kick",
				name: "Round",
				value: "Round",
				pos: "E",
			},
			{
				id: 13,
				variationType: "Kick",
				name: "Swipe",
				value: "Round",
				pos: "M,E",
			},
			{
				id: 14,
				variationType: "Kick",
				name: "Flash",
				value: "Round",
				pos: "M,E",
			},
			{
				id: 15,
				variationType: "Kick",
				name: "LateRound",
				value: "Round",
				pos: "Ex",
			},
			{
				id: 16,
				variationType: "Kick",
				name: "Dragonfly",
				value: "Hook",
				pos: "En",
			},
			{
				id: 17,
				variationType: "Kick",
				name: "Graizer",
				value: "Hook",
				pos: "B",
			},
			{
				id: 18,
				variationType: "Kick",
				name: "Shuriken",
				value: "Hook",
				pos: "M",
			},
			{
				id: 19,
				variationType: "Kick",
				name: "Hook",
				value: "Hook",
				pos: "E",
			},
			{
				id: 20,
				variationType: "Kick",
				name: "Shuriken",
				value: "Hook",
				pos: "M,E",
			},
			{
				id: 21,
				variationType: "Kick",
				name: "Flash",
				value: "Hook",
				pos: "M,E",
			},
			{
				id: 22,
				variationType: "Kick",
				name: "LateHook",
				value: "Hook",
				pos: "Ex",
			},
			{
				id: 23,
				variationType: "Shape",
				name: "IronMan",
				value: "IronMan",
				pos: "B,M,E",
			},
			{
				id: 24,
				variationType: "Shape",
				name: "FigureFour",
				value: "FigureFour",
				pos: "B,M,E",
			},
			{
				id: 25,
				variationType: "Shape",
				name: "X-Out",
				value: "X-Out",
				pos: "B,M,E",
			},
			{
				id: 26,
				variationType: "Shape",
				name: "Tuck",
				value: "Tuck",
				pos: "B,M,E",
			},
			{
				id: 27,
				variationType: "Shape",
				name: "Layout",
				value: "Layout",
				pos: "B,M,E",
			},
			{
				id: 28,
				variationType: "Shape",
				name: "PeterPan",
				value: "PeterPan",
				pos: "B,M,E",
			},
			{
				id: 29,
				variationType: "Shape",
				name: "Pike",
				value: "Pike",
				pos: "B,M,E",
			},
			{
				id: 30,
				variationType: "Shape",
				name: "SuperMan",
				value: "SuperMan",
				pos: "B,M,E",
			},
			{
				id: 31,
				variationType: "Shape",
				name: "Cowboy",
				value: "Cowboy",
				pos: "B,M,E",
			},
			{
				id: 32,
				variationType: "Shape",
				name: "Sidewinder",
				value: "Sidewinder",
				pos: "B,M,E",
			},
			{
				id: 33,
				variationType: "Grab",
				name: "Left",
				value: "Left",
				pos: "B,M,E",
			},
			{
				id: 34,
				variationType: "Grab",
				name: "Right",
				value: "Right",
				pos: "B,M,E",
			},
			{
				id: 5,
				variationType: "Rotation",
				name: "FullTwist",
				value: "360",
				pos: "B,M,E",
			},
			{
				id: 6,
				variationType: "Rotation",
				name: "FullUp",
				value: "360",
				pos: "En,B",
			},
			{
				id: 7,
				variationType: "Rotation",
				name: "Twist",
				value: "360",
				pos: "M",
			},
			{
				id: 8,
				variationType: "Rotation",
				name: "Gyro",
				value: "360",
				pos: "En,Ex",
			},
			{
				id: 35,
				variationType: "Rotation",
				name: "halfTwist",
				value: "180",
				pos: "B,M,E",
			},
			{
				id: 36,
				variationType: "Rotation",
				name: "halfUp",
				value: "180",
				pos: "En,B",
			},
			{
				id: 37,
				variationType: "Rotation",
				name: "halfTwist",
				value: "180",
				pos: "M",
			},
			{
				id: 38,
				variationType: "Rotation",
				name: "halfGyro",
				value: "180",
				pos: "En,Ex",
			},
			{
				id: 39,
				variationType: "Kick",
				name: "Scissor",
				value: "Round",
				pos: "E",
			},
			{
				id: 40,
				variationType: "Touchdown",
				name: "Cart",
				value: "Left->Right",
				pos: "M",
			},
			{
				id: 41,
				variationType: "Touchdown",
				name: "Gumbi",
				value: "Right->Left",
				pos: "M",
			},
			{
				id: 42,
				variationType: "Touchdown",
				name: "master",
				value: "Both",
				pos: "M",
			},
			{
				id: 43,
				variationType: "Touchdown",
				name: "spring",
				value: "Both",
				pos: "M",
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
