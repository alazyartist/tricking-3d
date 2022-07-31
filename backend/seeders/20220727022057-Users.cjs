"use strict";

const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
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
		const hash = await bcrypt.hash("test", 10);
		const hash2 = await bcrypt.hash("init", 10);
		await queryInterface.bulkInsert("Users", [
			{
				id: 1,
				username: "alazyartist",
				first_name: "Dylan",
				last_name: "James",
				email: "alazyartist@gmail.com",
				password: hash,
				uuid: "admin696-8c94-4ca7-b163-9alazyartist",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				id: 3,
				username: "TestUsername",
				first_name: "Tiesto",
				last_name: "Tester",
				email: "test@test.com",
				password: hash,
				uuid: uuid(),
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				id: 2,
				username: "Tohzt",
				first_name: "Steven",
				last_name: "French",
				email: "Steven.G.French@live.com",
				password: hash2,
				uuid: "admin696-8c94-4ca7-b163-969420Tohzt",
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
