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
		await queryInterface.bulkInsert("Animations", [
			{
				animation_id: "43b1f2f6-813a-4523-836d-9649ea9b1c40",
				animationName: "ch180swipe-wr180feint",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "4575bfb1-33a8-4221-8723-7cef7874a606",
				animationName: "ch180swipe-wr180round",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "945c2d53-c063-451b-a2b8-44e279774667",
				animationName: "ch180swipe",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "0066f091-b0a2-42f7-b112-400f444787d8",
				animationName: "Aerial",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "942bbdb0-5cd8-475e-b327-64de97859be0",
				animationName: "Aerial>Pop",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "34f64fca-228b-4e99-8cf5-2e0ce0ed6645",
				animationName: "Backflip",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "fa8eeb9e-3acd-4d73-94bc-34e3f275b9e1",
				animationName: "Backflip 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "98707a8a-e4c7-4d2b-8614-583f498934af",
				animationName: "Backflip 03",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "93f7a823-aeb9-4760-9189-436ae3ec4a2b",
				animationName: "Backflip 04",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "7a69be00-5594-4b58-b6b0-95ddaf8de563",
				animationName: "Backhandspring",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "ecbe0d90-e1ab-422e-b117-21226141f1a6",
				animationName: "BKick",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "ebd8f94a-a098-439a-88f4-cd4179636fc2",
				animationName: "BKick 2",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "00b812fb-af28-4f75-a4e2-780cb275e3d8",
				animationName: "Btwist",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "c3f33aaa-1e5e-4019-81f3-8ecab32139ef",
				animationName: "Btwist2",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "aaf25ad9-ecb9-42c0-b189-191df9fece64",
				animationName: "Btwist3",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "647e7b94-a3ab-4702-82f8-d922f1f348f1",
				animationName: "c360h",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "6e4efe4d-b2a9-4b84-b05e-b2a4f300da03",
				animationName: "Cart>DoubleFull",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "c0debd90-3558-4064-af21-43fe8be19dc2",
				animationName: "Cart>DoubleFull 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "fef9f1a2-69ad-4bf2-a598-9d649833a8dd",
				animationName: "CartOff",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "768082d4-22b2-4466-9fd3-dc4b66e79820",
				animationName: "Cartwheel.hyper 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "be8d4d0d-2295-47ff-9106-55dcb1c1de3c",
				animationName: "Cartwheel.hyper",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "341449f3-95d4-4e46-b43e-3943bd496ee7",
				animationName: "Cartwheel.complete 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "21c961cb-298d-44b4-859a-32d00103d3cb",
				animationName: "Cartwheel.complete",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "61298185-4fd2-4cad-9a47-3732dfab0cb2",
				animationName: "Cartwheel.insidehyper",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "cb340de1-ee3e-4c38-a589-d79830322e24",
				animationName: "Cartwheel.mega",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "a66bb7ca-cb32-450f-86c7-2f00e8878bf4",
				animationName: "Cartwheel.mega 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "a9a118fb-89af-481e-b9a6-71300f209a5e",
				animationName: "Cartwheel.mega 03",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "b8e35731-7aac-4ab3-85dc-0763b449ce9b",
				animationName: "Cartwheel.semi",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "bf1688b3-fbd2-4dc1-b3c5-00727b7ee72f",
				animationName: "Cartwheel.semi 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "18168226-37a3-4292-b2d2-1e3e8e7e6bd9",
				animationName: "Cartwheel>!Cartwheel",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "6a425997-4828-4315-a169-75259d0c9c33",
				animationName: "Cartwheel>Punch",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "6d65d09b-6200-4dd6-81bd-ff1e8dfbf7b9",
				animationName: "Raiz-twist",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "4a665e71-b265-4db6-815d-01ff243a75a3",
				animationName: "Raiz-twist 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "063ecf40-59fe-43d0-8333-917649c3c53c",
				animationName: "CheatSetup",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "e3d6f4fd-d13c-48f0-9e5a-d7a71852766a",
				animationName: "CheatSetup 2",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "57d428e5-2f64-427a-81d6-f996778b5454",
				animationName: "CheatSetup 3",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "cdc231cd-18ed-47ca-a1f7-2d0807c87232",
				animationName: "CheatSetup 4",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "b230d781-d3a6-4d32-910e-44abe0497b45",
				animationName: "CheatSetup 5",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "65e7ed91-4d5d-4e03-a61f-58e75a733c95",
				animationName: "DoubleBtwist",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "eff90ead-2af6-4281-a35f-ff8b8357317c",
				animationName: "FlashKick",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "a9f8a3ee-93f5-4423-98bc-021eb4c73b27",
				animationName: "FlashKick 2",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "ba412fa4-b480-4bca-8a4b-41da53486612",
				animationName: "Hook>Masterscoot",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "fda5359e-8344-41f5-bbf2-49907e1b8b22",
				animationName: "Hook>wrap180Hook",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "0168dae4-e05a-435f-8e1d-9bc9ee971469",
				animationName: "Hook>wrap180Hook 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "833d5c49-9fa8-42a7-905c-f8099ac482eb",
				animationName: "Illusion-Twist",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "60ce0d7c-3bd0-474c-b9c3-2fbff4993edd",
				animationName: "Jstep",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "2fbec8de-2cc9-4b7d-9f7d-72627f1d53c4",
				animationName: "Jstep 2",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "49d13acf-36c8-4406-802e-1b03e0433007",
				animationName: "Jstep 3",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "3dabcc59-4d61-4b27-80e8-1330560986b8",
				animationName: "Jstep 4",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "7bc322f3-2122-4c49-aaef-92f27a987dc5",
				animationName: "Jstep5",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "93476d6d-0459-4268-b041-ed4683e7aad4",
				animationName: "Backflip 05",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "9e8d73ee-4911-4e57-b6bb-384ab9d3cd80",
				animationName: "Master-Scoot",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "fbfbe47f-be6a-44a0-902b-5dd68713dde4",
				animationName: "Master-Scoot 03",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "711c4f5a-cd31-46e3-b62a-f2cf062b824d",
				animationName: "Master-Scoot 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "40299bd7-d2ac-411f-b0d1-197eaa6dee19",
				animationName: "Reversao-Scissor 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "4b8826c1-c718-4355-a7c9-81495b871d5a",
				animationName: "Reversao-Scissor",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "d5051c16-097b-4ba0-9fb1-c8723435b75f",
				animationName: "Roundoff",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "6f2c012c-68b5-49fd-a715-a2fc2a7eb40d",
				animationName: "Roundoff.complete",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "cf50d747-81d2-4f7c-ad4c-55ac9aec3271",
				animationName: "Roundoff 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "1ee36871-c6ed-48ea-a159-263086d802cb",
				animationName: "Sailor Moon 03",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "fc95d70e-d777-46de-81dc-c0f0a7dac361",
				animationName: "Sailor Moon Scissor",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "742a0367-cbeb-4fc4-808c-158947351715",
				animationName: "Sailor Moon",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "da03df94-d4de-4a1b-88cd-3781aa251e74",
				animationName: "Sailor Moon 2",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "ab30a357-bb2b-43a4-a5da-5af431003eb9",
				animationName: "Scoot",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "68749219-33fd-42d5-8703-68d00c4d21b3",
				animationName: "Scoot 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "ce7cd34d-2cad-4331-ae06-20f8c90a5222",
				animationName: "Scoot 03",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "c5b83d6b-94b8-4697-8f34-65c779eb8ef3",
				animationName: "Scoot Valdez",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "2529def8-262a-466d-9cf7-143b8da4aa83",
				animationName: "Scoot Valdez 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "c4eff7b5-6a97-4c25-ad3b-7b8f9a3a55eb",
				animationName: "Spin Step",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "1e18e798-86cc-4373-85ac-16c397628bbe",
				animationName: "Spin Step 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "bc924753-5d18-46e0-b131-f747aad1a74e",
				animationName: "Standing Full",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "cf3acc61-0787-4c7f-b993-c1991af03872",
				animationName: "Standing Full 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "20f7c9ce-d2ec-4f5d-976b-9a7e05a46916",
				animationName: "ch180round",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "118c6ae8-e38b-4573-87e3-d566c893e33a",
				animationName: "Touchdown-Raiz>DoubleCork",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "08150b26-dddf-4f73-9cd4-a4380c541ff8",
				animationName: "Touchdown-Raiz>Valdez",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "b4e7453f-46e1-46bc-91a1-b65c6bae8e86",
				animationName: "Touchdown-Raiz>Valdez 02",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "7b76c07b-651c-4ea4-9c2c-bfab970af7c3",
				animationName: "Touchdown-Raiz>DoubleCork 2",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "96159fdc-e073-4cf6-93c8-2eeec2aab9e3",
				animationName: "WrapFull",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
			},
			{
				animation_id: "f7973309-4ee5-40a2-a85c-f8912564a5ec",
				animationName: "WrapFullSwing",
				skeleton: "CC3",
				fileName: "Kerwood.glb",
				model: "Kerwood",
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
