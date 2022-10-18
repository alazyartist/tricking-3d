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
		await queryInterface.bulkInsert("Tricks", [
			//cork-dleg
			{
				trick_id: "34f64fca-228b-4e99-8cf5-2e0ccorkdleg",
				base_id: "Gainer",
				name: "Cork-dleg",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "Backside",
				trickType: "Invert",
				defaultAnimation: "936bc568-cb0f-44cd-a9d4-322d96000436",
			},
			{
				trick_id: "34f64fca-228b-4e99-8cf5-2e0corksnapu",
				base_id: "Gainer",
				name: "Cork-snapu",
				stance_id: "BacksideComplete",
				takeoffStance: "BacksideComplete",
				landingStance: "BacksideComplete",
				trickType: "Invert",
				defaultAnimation: "6af52c5f-0203-4680-a6fc-e6fd3a6c089d",
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
