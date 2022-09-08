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
	//const userInfo = useUserStore((s) => s.userInfo);

	/* * Potential Types
	 * 
	 * Combo
	 * Trick
	 * Stance
	 * Variation
	 * Transition
	 *
	 * */
	const [mockedData, setMockedData] = useState(Data_Mock);
	const [trickListOpen, setTrickListOpen] = useState(true);
	const [trickListID, setTrickListID] = useState();
	const [comboListOpen, setComboListOpen] = useState(true);
	const [comboListID, setComboListID] = useState();
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

	const _toggleTrickList = (list) => {
		setTrickListOpen(!trickListOpen);
		if (trickListOpen) {
			let arr = [list];
			for (let i = 0; i < mockedData.length; i++) {
				if (mockedData[i].tricklist_id === list.tricklist_id) {
					// @TODO: Remove when data has type
					mockedData[i].type = "Combo";
					arr.push(mockedData[i]);
				}
			}
			setTrickListID(list.tricklist_id);
			setListArray(arr);
		}
		else {
			setListArray([
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
			}]);
		}
	};

	const _toggleComboList = (list) => {
		setComboListOpen(!comboListOpen);
		if (comboListOpen) {
			let arr = [listArray[0], list];
			for (let i = 0; i < mockedData.length; i++) {
				if (mockedData[i].tricklist_id === trickListID) {
					setComboListID(mockedData[i].Combo.combo_id)
					const comboCnt = mockedData[i].Combo.comboArray.length;
					for (let j = 0; j < comboCnt; j++) {
						// @TODO: Remove when data has type
						mockedData[i].Combo.comboArray[j].type = "Trick";
						arr.push(mockedData[i].Combo.comboArray[j]);
					}
					setListArray(arr);
					return;
				}
			}
		}
		else {
			setListArray([
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
			}]);
		}
	};

	const _listElementStyle = (type) => {
		let _style = "";
		switch(type) {
			default:
				_style = 'break-all w-full rounded-md bg-blue-200 p-2 font-inter text-sm font-semibold text-zinc-200';
				break;
			case "TrickList":
				_style = 'break-all w-full rounded-md bg-blue-500 p-2 font-inter text-sm font-semibold text-zinc-200';
				break;
			case "Combo":
				_style = 'break-all w-full rounded-md bg-green-500 p-2 font-inter text-sm font-semibold text-zinc-200';
				break;
			case "Trick":
				_style = 'break-all w-full rounded-md bg-red-500 p-2 font-inter text-sm font-semibold text-zinc-200';
				break;
		}
		return _style;
	}

	const handleListClick = (list) => {
		let type = list.type;
		switch (type) {
			default:
				console.log("handlListClick: Default Type")
				break;
			case "TrickList":
				_toggleTrickList(list);
				break;
			case "Combo":
				_toggleComboList(list);
				break;
			case "Trick":
				console.log("TOGGLE: Trick")
				break;
		}
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
									_style={_listElementStyle(item.type)}
									fn={() => handleListClick(item)}
									drag_offset={60}
									swipe_left={() => console.log(item.name, "- Swipe Left: Replace with function")}
									swipe_right={() => console.log(item.name, "- Swipe Right: Replace with function")}
								/>
							);
						}
						)
				}
			</div>
		)
	);
};

export default TricklistDisplay;
