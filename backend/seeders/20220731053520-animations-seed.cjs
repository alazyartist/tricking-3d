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
			// Andrew Animations
			{
				animation_id: "c03d3824-2a19-4145-b8f7-b0fb26ab3694",
				animationName: "Aerial>GMS",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "3b498177-fa56-45cb-a971-9c4063eb1194",
				animationName: "AppleJacks",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "ac42557b-1307-447e-aea5-3697ccba5f92",
				animationName: "Backflip",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "46b334e5-00fd-4ee3-8a9e-0e778ac02c05",
				animationName: "fs540hook",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "67905a6d-b496-4145-8be5-193f82f23117",
				animationName: "fs720round",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "cf0f6994-c25e-47ef-bd39-357b25bd3047",
				animationName: "fs720round 02",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "83529d81-f022-4e6b-a591-c5cb2b4c3da3",
				animationName: "Cart>DoubleFull",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "9b89b6b8-3b83-46f8-adfd-7b6467d868cd",
				animationName: "Cart>DoubleFull>Cork",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "583d6122-f204-4bd6-abb0-9c8be4fb2ed7",
				animationName: "Cart>DoubleFul-dleg",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "1eb251a1-f375-44df-abc5-58467f39aec8",
				animationName: "Cart>DoubleFull-round",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "99e8c676-6666-4343-8a3a-8eaf8b54b825",
				animationName: "Cart>DoubleFull>Swing",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "333e54bc-8a5c-4642-8b8a-54d86f46e1b6",
				animationName: "Cart>DoubleFull>Swing 2",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "4a589019-6fd9-4f4d-9ea9-1b08c9fd28d1",
				animationName: "Cart>DoubleFull>Swing 3",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "31c35d7a-6f97-4ade-8e6e-17ca9450cf5d",
				animationName: "Cart>Full-dleg-wist",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "f5409e3c-f939-4253-b8cb-ac44f6e45b08",
				animationName: "Cart>Full-snapu",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "9834d477-8731-4aa3-8e5d-0d797cf13e04",
				animationName: "Cart>Full-swipe",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "5441cd71-599b-426f-8fae-875027e7343b",
				animationName: "Cart>Triple",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "b2876162-df9d-46ac-9334-833ae1aa154f",
				animationName: "Cart>TripleFull 2",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "8018a5d0-9afb-4c2b-940d-6e31eec71f59",
				animationName: "ch720hook",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "0d6d97d3-cf71-472a-aab5-732f309bf328",
				animationName: "ch360doublehook",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "936bc568-cb0f-44cd-a9d4-322d96000436",
				animationName: "Cork-dleg",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "1f305d5a-315e-4166-9d3d-90762882cae0",
				animationName: "Cork>Cork-dleg",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "1d24eb51-5780-4cef-b621-0a25b4b0b0af",
				animationName: "Cork>RecoverSpin",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "4fa1969c-c3e5-4e6f-85e1-1306bae77ed8",
				animationName: "Cork-round",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "6af52c5f-0203-4680-a6fc-e6fd3a6c089d",
				animationName: "Cork-snapu",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "263115da-fc5a-48ba-9591-0e0ebd78b55f",
				animationName: "Cork>Cork",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "7592b5ff-e81b-4bec-a82b-c0809455cc70",
				animationName: "Cork>DoubleCork",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "e72fcc9c-f341-4e24-aed9-7295090c3bc0",
				animationName: "CorkX3",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "1e873ac4-bb5e-4e0a-9402-2932f79de464",
				animationName: "Dleg",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "9279d80f-e2dd-4647-a6d4-739770fa8c17",
				animationName: "Dleg 2",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "886d1044-0c70-46fd-b3df-ad8bafdd46e8",
				animationName: "Dub>s180Hook",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "1255c1f9-1d35-4856-87c9-f87b6a48568f",
				animationName: "DoubleBtwist>Aerial",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "64f4176a-05a2-45f2-aa67-b2b266e25230",
				animationName: "Dub>DubCork",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "de717f47-f8f5-4161-8f2f-b6c646d597c9",
				animationName: "Dub>Cork-snapu",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "7bd51715-78ba-4956-b510-4ae4fc5df2a5",
				animationName: "Dub>Cork-snapu 02",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "5377eeb3-a42f-4fea-921d-4a56b70b5fa9",
				animationName: "FlowySnapu Combo",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "ca02a966-3a77-43dc-a01e-f5b396a7e4c5",
				animationName: "GainerSwitchX3",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "3c005457-cc74-4a78-8cc9-99f2691f8bf8",
				animationName: "Gumbi",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "5526b34d-d5cd-4778-adbb-cff49a9c6a40",
				animationName: "Gumbi.insideHyper",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "95b1cb92-1b30-474b-8ee6-289ea6e85660",
				animationName: "Handspin",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "5b0854c9-991b-412f-a469-fc41f6a02714",
				animationName: "Helicoptero",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "e3664b02-96a0-4342-af49-e56d443111da",
				animationName: "Helicoptero 2",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "35fad1e4-3d64-45d9-80d1-72b17c083c72",
				animationName: "Hook>GMS",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "465d201d-6fa1-4402-b84e-4480229edaa1",
				animationName: "Hook>master-Scoot>Cork",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "61735468-7e49-427a-b719-b2412d681523",
				animationName: "Hook>master-Scoot>Cork 02",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "b46f9c1f-b176-4a31-89bf-d6152fe2a974",
				animationName: "HurricaneKick",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "6ba6eaf2-2f61-4d8c-b4ae-4c44197b16c8",
				animationName: "HurricaneKick 2",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "77cda611-70f8-4e36-a158-e43e21253640",
				animationName: "Jackknife",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "a9aad9f3-94d0-4a9c-8178-50c079f0711f",
				animationName: "Jackknife 2",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "59045577-682c-4063-9908-e7c14247699f",
				animationName: "Machines",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "0a221238-ce50-4255-9518-05ebb7fbebff",
				animationName: "master-scoot>Cork-shuriken-hyperhook",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "49267e62-f053-4500-8419-285731c1b645",
				animationName: "master-scoot>Cork-dleg",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "06209027-e030-4c6a-98e2-b21c5102238c",
				animationName: "Roundoff>Nike",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "0fda72dc-4059-4f26-a994-aba37e5c35c6",
				animationName: "Parafuso",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "f13b9a04-d2d0-4b3c-b754-7b3a63722074",
				animationName: "Parafuso>Hook>Dance",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "62dc91f0-28d5-4d1c-b4b6-7c77e4a31cca",
				animationName: "Parafuso-gyro",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "c06f9c43-40e8-4ee0-acba-bddcdb92ea25",
				animationName: "p180h>Cart-twist",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "2e2e040d-75cb-4a61-835f-8ef712627d60",
				animationName: "p180h>split",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "9434bfc4-c62e-4d1f-a885-ae9fac77ce12",
				animationName: "Reversao",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "4dc17e60-383a-4c5b-a787-9a66c1dab9e2",
				animationName: "Reversao 2",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "50505a6b-8ffc-4e63-8b05-bb0108ef98bc",
				animationName: "master-Scoot>DoubleCork",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "4033e0d7-6311-48c9-b03f-61f28ece3c9b",
				animationName: "Scoot>Dub",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "c1604863-d725-42e2-849e-7c4c333dbfb1",
				animationName: "Scoot-twist",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "9c525019-81f4-459f-a3b7-8483ff60ca68",
				animationName: "Sidekick",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "d29a2a5b-2dbc-4b05-b361-8991d6026b1e",
				animationName: "Sidekick 2",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "6bff8f98-c2f8-47d9-8af4-75fe1d3790ae",
				animationName: "Snapu",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "a1552757-f6fd-4eb1-a6a7-38d424dbf7fe",
				animationName: "Snapu>Ninja",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "82e57be5-6da7-470d-a61d-093e7f18c4e3",
				animationName: "Touchdown-Raiz>Cork-hyperhook",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "6011d082-a559-4c9b-9f1a-085004f45225",
				animationName: "Touchdown-Raiz>Cork-shuriken-hyperhook",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "f52e9c33-10dc-43d9-8cef-0fcb5ff05134",
				animationName: "Touchdown-Raiz>Cork-shuriken-hyperhook 02",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
			},
			{
				animation_id: "ecd86841-70f3-40e6-87e1-e5a7948c0c37",
				animationName: "Webster>Ninja",
				skeleton: "CC3",
				fileName: "Andrew.glb",
				model: "Andrew",
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
