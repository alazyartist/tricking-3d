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
		await queryInterface.bulkInsert("Trick_Variations", [
			//Fulls

			{
				//DoubleLeg dleg
				trick_id: "5aa66c74-2f32-11ed-9dce-83cffac8c741",
				variation_id: 44,
			},
			{
				//dragonfly-Cork dragonfly
				trick_id: "ed832bc6-eae3-458d-8cfd-ragonflycork",
				variation_id: 9,
			},
			{
				//dragonfly-Cork fulltwist
				trick_id: "ed832bc6-eae3-458d-8cfd-ragonflycork",
				variation_id: 5,
			},
			{
				//rodeo-Cork grab right
				trick_id: "ed832bc6-eae3-458d-8cfc-26brodeocork",
				variation_id: 34,
			},
			{
				//rodeo-Cork fulltwist
				trick_id: "ed832bc6-eae3-458d-8cfc-26brodeocork",
				variation_id: 5,
			},
			{
				//Cork.hyper-hook latehook
				trick_id: "ed832bc6-eae3-458d-8cfc-orkhyperhook",
				variation_id: 22,
			},
			{
				//Cork.hyper-hook fulltwist
				trick_id: "ed832bc6-eae3-458d-8cfc-orkhyperhook",
				variation_id: 5,
			},
			{
				//Cork-shuriken shuriken
				trick_id: "ed832bc6-eae3-458d-8cfc-orkshuiriken",
				variation_id: 18,
			},
			{
				//Cork-shuriken fulltwist
				trick_id: "ed832bc6-eae3-458d-8cfc-orkshuiriken",
				variation_id: 5,
			},
			{
				//Cork.mega-round lateround
				trick_id: "ed832bc6-eae3-458d-8cfc-orkmegaround",
				variation_id: 15,
			},
			{
				//Cork.mega-round fultwist
				trick_id: "ed832bc6-eae3-458d-8cfc-orkmegaround",
				variation_id: 5,
			},
			{
				//cork-Round round
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkround",
				variation_id: 12,
			},
			{
				//cork-Round fulltwist
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkround",
				variation_id: 5,
			},
			{
				//cork-Swipe swipe
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkswipe",
				variation_id: 13,
			},
			{
				//cork-Swipe fultwist
				trick_id: "ed832bc6-eae3-458d-8cf2-26bcorkswipe",
				variation_id: 5,
			},
			{
				//reversao-Scissor scissor
				trick_id: "5aa66c92-2f32-11ed-9dcf-6fbfead50465",
				variation_id: 39,
			},
			{
				//snapu swipe
				trick_id: "5aa66cce-2f32-11ed-9dd1-9b9ecf2e2f6f",
				variation_id: 13,
			},
			{
				//snapu twist
				trick_id: "5aa66cce-2f32-11ed-9dd1-9b9ecf2e2f6f",
				variation_id: 7,
			},
			{
				//sailor-Raiz sailor
				trick_id: "5aa66cec-2f32-11ed-9dd2-4322700699cc",
				variation_id: 1,
			},
			{
				//sailor-Raiz-scissor scissor
				trick_id: "b4560032-693c-476b-8456-5a366b9a38fc",
				variation_id: 1,
			},
			{
				//sailor-Raiz-scissor scissor
				trick_id: "b4560032-693c-476b-8456-5a366b9a38fc",
				variation_id: 39,
			},
			{
				//touchdown-Raiz touchdown
				trick_id: "59a4c8a5-545a-4235-b8bf-75839161bb7e",
				variation_id: 4,
			},
			{
				//Raiz-twist twist
				trick_id: "5aa66d0a-2f32-11ed-9dd3-93cdc8b2c37a",
				variation_id: 7,
			},
			{
				//master-Scoot scoot
				trick_id: "e0ede2a5-199e-4228-bdff-e63102b31eb4",
				variation_id: 42,
			},
			{
				//master-Scoot scoot
				trick_id: "01ef8300-9bf3-4259-820f-e496baad9f9c",
				variation_id: 41,
			},
			{
				//Scoot-twist twist
				trick_id: "5aa66d28-2f32-11ed-9dd4-9b934527a4b6",
				variation_id: 7,
			},
			{
				//backhand-spring spring
				trick_id: "5aa667ce-2f32-11ed-9da6-736f01b7d747",
				variation_id: 43,
			},
			{
				//valdez touchdown
				trick_id: "5aa667ec-2f32-11ed-9da7-4f51ee4d4e65",
				variation_id: 4,
			},
			{
				//flashKick flashKick
				trick_id: "5aa6680a-2f32-11ed-9da8-ff5ae580713f",
				variation_id: 14,
			},
			{
				//wrapfull fulltwist
				trick_id: "5aa66828-2f32-11ed-9da9-ef8e18b02b8e",
				variation_id: 5,
			},
			{
				//full fulltwist
				trick_id: "5aa66846-2f32-11ed-9daa-33afc27d5451",
				variation_id: 5,
			},
			{
				//kick-full kick
				trick_id: "5aa66864-2f32-11ed-9dab-db57c179487d",
				variation_id: 10,
			},
			{
				//grazier-full grazier
				trick_id: "5aa66882-2f32-11ed-9dac-3ff96f415f9c",
				variation_id: 17,
			},
			{
				//full-swipe swipe
				trick_id: "43952992-ec8e-42f7-a2bd-46b4380ab585",
				variation_id: 13,
			},
			{
				//full-swipe fulltwist
				trick_id: "43952992-ec8e-42f7-a2bd-46b4380ab585",
				variation_id: 5,
			},
			{
				//full-snapu swipe
				trick_id: "5aa668a0-2f32-11ed-9dad-afc756f483ff",
				variation_id: 13,
			},
			{
				//full-snapu fulltwist
				trick_id: "5aa668a0-2f32-11ed-9dad-afc756f483ff",
				variation_id: 7,
			},
			{
				//full-shuriken shuriken
				trick_id: "5aa668be-2f32-11ed-9dae-371515401d9f",
				variation_id: 18,
			},
			{
				//full-shuriken fulltwist
				trick_id: "5aa668be-2f32-11ed-9dae-371515401d9f",
				variation_id: 5,
			},
			{
				//full-round round
				trick_id: "5aa668d2-2f32-11ed-9daf-372b62bde174",
				variation_id: 12,
			},
			{
				//full-round fulltwist
				trick_id: "5aa668d2-2f32-11ed-9daf-372b62bde174",
				variation_id: 5,
			},
			{
				//full-hyperhook latehook
				trick_id: "5aa668d2-2f32-11ed-9daf-372b62bde174",
				variation_id: 22,
			},
			{
				//full-hyperhook fulltwist
				trick_id: "5aa668d2-2f32-11ed-9daf-372b62bde174",
				variation_id: 5,
			},
			{
				//full-megaround lateround
				trick_id: "5aa6690e-2f32-11ed-9db1-97acfa387b06",
				variation_id: 15,
			},
			{
				//full-megaround fulltwist
				trick_id: "5aa6690e-2f32-11ed-9db1-97acfa387b06",
				variation_id: 5,
			},
			{
				//double-full fulltwist
				trick_id: "44d77d40-280f-4f6c-afe3-f1bbbb85f0b6",
				variation_id: 5,
			},
			{
				//double-full fulltwist
				trick_id: "44d77d40-280f-4f6c-afe3-f1bbbb85f0b6",
				variation_id: 5,
			},
			{
				//double-full-round fulltwist
				trick_id: "5aa6692c-2f32-11ed-9db2-ff62072b5665",
				variation_id: 5,
			},
			{
				//double-full-round fulltwist
				trick_id: "5aa6692c-2f32-11ed-9db2-ff62072b5665",
				variation_id: 5,
			},
			{
				//double-full-round round
				trick_id: "5aa6692c-2f32-11ed-9db2-ff62072b5665",
				variation_id: 12,
			},
			{
				//double-full-dleg fulltwist
				trick_id: "5aa6694a-2f32-11ed-9db3-df3e4bdcbcde",
				variation_id: 5,
			},
			{
				//double-full-dleg fulltwist
				trick_id: "5aa6694a-2f32-11ed-9db3-df3e4bdcbcde",
				variation_id: 5,
			},
			{
				//double-full-dleg dleg
				trick_id: "5aa6694a-2f32-11ed-9db3-df3e4bdcbcde",
				variation_id: 44,
			},
			{
				//triple-full fulltwist
				trick_id: "8211602c-596c-4ae2-b537-8e82de1900ba",
				variation_id: 5,
			},
			{
				//triple-full fulltwist
				trick_id: "8211602c-596c-4ae2-b537-8e82de1900ba",
				variation_id: 5,
			},
			{
				//triple-full fulltwist
				trick_id: "8211602c-596c-4ae2-b537-8e82de1900ba",
				variation_id: 5,
			},
			{
				//quad-full fulltwist
				trick_id: "5aa66968-2f32-11ed-9db4-1b8af129ab7f",
				variation_id: 5,
			},
			{
				//quad-full fulltwist
				trick_id: "5aa66968-2f32-11ed-9db4-1b8af129ab7f",
				variation_id: 5,
			},
			{
				//quad-full fulltwist
				trick_id: "5aa66968-2f32-11ed-9db4-1b8af129ab7f",
				variation_id: 5,
			},
			{
				//quad-full fulltwist
				trick_id: "5aa66968-2f32-11ed-9db4-1b8af129ab7f",
				variation_id: 5,
			},
			//Corks
			{
				//cork fulltwist
				trick_id: "0e178697-d368-4d0b-ba2d-0818b14e5f24",
				variation_id: 5,
			},
			{
				//cork-shuriken.hyper-hook fulltwist
				trick_id: "5aa66986-2f32-11ed-9db5-b7563e8e09cd",
				variation_id: 5,
			},
			{
				//cork-shuriken.hyper-hook shuriken
				trick_id: "5aa66986-2f32-11ed-9db5-b7563e8e09cd",
				variation_id: 18,
			},
			{
				//cork-shuriken.hyper-hook lateHook
				trick_id: "5aa66986-2f32-11ed-9db5-b7563e8e09cd",
				variation_id: 22,
			},
			{
				//cork-hyper-hook fulltwist
				trick_id: "5aa66986-2f32-11ed-9db5-b7563e8e09cd",
				variation_id: 5,
			},
			{
				//cork-hyper-hook lateHook
				trick_id: "5aa66986-2f32-11ed-9db5-b7563e8e09cd",
				variation_id: 22,
			},
			{
				//double-cork fulltwist
				trick_id: "1ded7e34-4e37-49a9-b725-ced643b9fe4c",
				variation_id: 5,
			},
			{
				//double-cork fulltwist
				trick_id: "1ded7e34-4e37-49a9-b725-ced643b9fe4c",
				variation_id: 5,
			},
			{
				//triple-cork fulltwist
				trick_id: "5aa669c2-2f32-11ed-9db7-4f46d4ed882c",
				variation_id: 5,
			},
			{
				//triple-cork fulltwist
				trick_id: "5aa669c2-2f32-11ed-9db7-4f46d4ed882c",
				variation_id: 5,
			},
			{
				//triple-cork fulltwist
				trick_id: "5aa669c2-2f32-11ed-9db7-4f46d4ed882c",
				variation_id: 5,
			},
			{
				//round-off cart
				trick_id: "5aa669e0-2f32-11ed-9db8-93708240e526",
				variation_id: 40,
			},
			{
				//cart-wheel cart
				trick_id: "0dba9a0f-3098-4369-a9d7-67ff00828b9d",
				variation_id: 40,
			},
			{
				//cart-off cart
				trick_id: "5aa669fe-2f32-11ed-9db9-5763ef1f142c",
				variation_id: 40,
			},
			{
				//cart-twist cart
				trick_id: "3ac9bfd7-e930-4466-9ffc-aa3ceb8c44ad",
				variation_id: 40,
			},
			{
				//cart-twist twist
				trick_id: "3ac9bfd7-e930-4466-9ffc-aa3ceb8c44ad",
				variation_id: 7,
			},
			{
				//Aerial-twist fulltwist
				trick_id: "5aa66a1c-2f32-11ed-9dba-eb156064bd8c",
				variation_id: 5,
			},
			{
				//nike nike
				trick_id: "5aa669a4-2f32-11ed-9db6-47e17ac1551b",
				variation_id: 45,
			},
			{
				//butterfly-twist fulltwist
				trick_id: "5aa66a58-2f32-11ed-9dbc-8b8e55acb6b4",
				variation_id: 5,
			},
			{
				//shurikenbutterfly-twist fulltwist
				trick_id: "5aa66a76-2f32-11ed-9dbd-13989aa6d688",
				variation_id: 5,
			},
			{
				//shurikenbutterfly-twist shuriken
				trick_id: "5aa66a76-2f32-11ed-9dbd-13989aa6d688",
				variation_id: 18,
			},
			{
				//double-butterfly-twist fulltwist
				trick_id: "5aa66a94-2f32-11ed-9dbe-335095ca4dda",
				variation_id: 5,
			},
			{
				//double-butterfly-twist fulltwist
				trick_id: "5aa66a94-2f32-11ed-9dbe-335095ca4dda",
				variation_id: 5,
			},
			{
				//triple-butterfly-twist fulltwist
				trick_id: "5aa66ab2-2f32-11ed-9dbf-cf4e9639bd33",
				variation_id: 5,
			},
			{
				//triple-butterfly-twist fulltwist
				trick_id: "5aa66ab2-2f32-11ed-9dbf-cf4e9639bd33",
				variation_id: 5,
			},
			{
				//triple-butterfly-twist fulltwist
				trick_id: "5aa66ab2-2f32-11ed-9dbf-cf4e9639bd33",
				variation_id: 5,
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
