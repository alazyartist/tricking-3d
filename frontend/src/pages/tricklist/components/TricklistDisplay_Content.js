import React from "react";
import useGetTricklists from "../../../api/useTricklists";
import TrickList_Component from "./trickList_Component";
import { useUserStore } from "../../../store/userStore";

const TricklistDisplay = ({
	displayOnly,
	profileuuid,
	setOpenView,
	setTricklist_id,
	open,
}) => {
	// @TODO: Uncomment for actual data
	//const { data: lists } = useGetTricklists(profileuuid);
	const userInfo = useUserStore((s) => s.userInfo);
	const { uuid: userUUID } = useUserStore((s) => s.userInfo);
	const handleListClick = (uuid) => {
		setTricklist_id(uuid);
		setOpenView(true);
	};
	// @TODO: Delete for actual data
	const lists = [
		{
			"tricklist_id": "bb26447d-2b5c-4eb2-bd4b-4359d7e7b52c",
			"name": "another",
			"owner": "3e5a2019-593e-490d-b301-91d76b5381de",
			"createdAt": "2022-09-05T22:21:44.000Z",
			"updatedAt": "2022-09-05T22:21:44.000Z",
			"Owner": {
				"username": "TestUsername"
			}
		},
		{
			"tricklist_id": "f579d784-16b9-4613-be8e-77bd4dbd5a56",
			"name": "test list",
			"owner": "3e5a2019-593e-490d-b301-91d76b5381de",
			"createdAt": "2022-09-05T10:59:44.000Z",
			"updatedAt": "2022-09-05T10:59:44.000Z",
			"Owner": {
				"username": "TestUsername"
			}
		}
	];
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
					Array.isArray(lists) &&
						lists.length > 0 &&
						lists.map((item) => {
							let date = new Date(item?.updatedAt);
							date = date.toDateString().slice(3, date.length);
							return (
								<TrickList_Component
									key={item.tricklist_id}
									name={item.name}
									date={date}
									click={() => {
										handleListClick(item.tricklist_id);
									}}
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
