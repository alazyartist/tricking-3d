import React, { useState } from "react";
import useGetTricklists from "../../../api/useTricklists";
import TrickList_Component from "./trickList_Component";
import { useUserStore } from "../../../store/userStore";
import Data_Mock from "../../../data/trickList_mock";

const TricklistDisplay = ({
	displayOnly,
	profileuuid,
	setOpenView,
	setTricklist_id,
	open,
}) => {
	// @TODO: Uncomment for actual data
	//const { data: lists } = useGetTricklists(profileuuid);
	//const { uuid: userUUID } = useUserStore((s) => s.userInfo);

	/* * Potential Types
	 * 
	 * Combo
	 * Trick
	 * Stance
	 * Variation
	 * Transition
	 *
	 * */
	const [listArray, setListArray] = useState(
		[
			{
				"type": "TrickList",
				"tricklist_id": "dc48fd5c-5c26-43ff-aabe-2e2a86fc05a0",
				"name": "TrickList 01",
				"owner": "3e5a2019-593e-490d-b301-91d76b5381de",
				"createdAt": "2022-09-05T22:21:44.000Z",
				"updatedAt": "2022-09-05T22:21:44.000Z",
				"Owner": {
					"username": "TestUsername"
				}
			},
			{
				"type": "TrickList",
				"tricklist_id": "f579d784-16b9-4613-be8e-77bd4dbd5a56",
				"name": "TrickList 02",
				"owner": "3e5a2019-593e-490d-b301-91d76b5381de",
				"createdAt": "2022-09-05T10:59:44.000Z",
				"updatedAt": "2022-09-05T10:59:44.000Z",
				"Owner": {
					"username": "TestUsername"
				}
			}
		]
	);
	const [mockedData, setMockedData] = useState(Data_Mock);
	const userInfo = useUserStore((s) => s.userInfo);


	const handleListClick = (list) => {
		let arr = [list];
		for (let i = 0; i < mockedData.length; i++) {
			if (mockedData[i].tricklist_id === list.tricklist_id) {
				mockedData[i].type = "Combo";
				arr.push(mockedData[i]);
			}
		}
		setListArray(arr);
		console.log(arr);
	};

	return (
		!open && (
			<div 
				id="trickList_Container"
				className='
				bg-blue-800 border-white 
				w-full 
				flex flex-col gap-[2px]
				place-content-center
				'
			>
				{/* TRICKLIST HEADER */}
				<div id="trickList_Header"
					className="flex flex-row items-center justify-around">
					<button>Header</button>
					<button>Info</button>
					<button>Here</button>
				</div>
				{
					/* TRICKLIST CLICKABLE */
					Array.isArray(listArray) &&
						listArray.length > 0 &&
						listArray.map((item) => {
							let date = new Date(item?.updatedAt);
							date = date.toDateString().slice(3, date.length);
							let _key = item.tricklist_id;
							if (item.combo_id) _key = item.combo_id;

							return (
								<TrickList_Component
									key={_key}
									data={item}
									date={date}
									fn={() => handleListClick(item)}
									drag_offset={60}
									swipe_left={() => console.log(item.name, "- Swipe Left: Replace with function")}
									swipe_right={() => console.log(item.name, "- Swipe Right: Replace with function")}
								/>
								/*
								<TrickList_Component
									key={_key}
									type={item.type}
									name={item.name}
									date={date}
									fn={() => handleListClick(item)}
									drag_offset={60}
									swipe_left={() => console.log(item.name, "- Swipe Left: Replace with function")}
									swipe_right={() => console.log(item.name, "- Swipe Right: Replace with function")}
								/>
								*/
							);
						}
						)
				}
			</div>
		)
	);
};

export default TricklistDisplay;
