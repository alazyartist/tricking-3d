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
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					user_name: "alazyartist",
					first_name: "Dylan",
					last_name: "James",
					email: "alazyartist@gmail.com",
					password: 5000,
					account_created: new Date(),
				},
				{
					user_name: "fred",
					first_name: "fred",
					last_name: "James",
					email: "test@gmail.com",
					password: 5000,
					account_created: new Date(),
				},
				{
					user_name: "frank",
					first_name: "frank",
					last_name: "James",
					email: "test2@gmail.com",
					password: 5000,
					account_created: new Date(),
				},
			],
			{}
		);
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
