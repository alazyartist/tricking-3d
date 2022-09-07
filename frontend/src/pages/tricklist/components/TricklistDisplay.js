import React from "react";
import useGetTricklists from "../../../api/useTricklists";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useUserStore } from "../../../store/userStore";

const TricklistDisplay = ({
	displayOnly,
	profileuuid,
	setOpenView,
	setTricklist_id,
	open,
}) => {
	const userInfo = useUserStore((s) => s.userInfo);
	const { uuid: userUUID } = useUserStore((s) => s.userInfo);
	const handleListClick = (uuid) => {
		console.log("setOpenView", uuid);
		setTricklist_id(uuid);
		setOpenView(true);
	};
	console.log(userUUID);
	//const { data: lists } = useGetTricklists(profileuuid);
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
	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	// Local Functions
	const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
	const lerp = (start, end, amt) => (1-amt)*start+amt*end;


	// Set the drag hook and define component movement based on gesture data
	const bind = useDrag(({ currentTarget, first, last, dragging, down, movement: [mx, my] }) => {
		//setSpeedControl(first);
		//setSpeedControl(!last);
		if (dragging) {
			my = 0;
			//mx = clamp(mx,-drag_offset_limit,drag_offset_limit);
			//setTimescale(lerp(0.01,2,((mx+drag_offset_limit)/(drag_offset_limit*2))));
		}
		api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
	});
	return (
		!open && (
			<div
				id='TricklistDisplay-table'
				className='bg-black border-white place-content-center flex w-full p-2'>
				<table>
					<thead className='text-center text-xs font-semibold text-zinc-300'>
						<tr>
							<th className='bg-white'>name</th>
							{!displayOnly && <th className='px-2'>owner</th>}
							<th className=''>lastUpdated</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						{Array.isArray(lists) &&
								lists.length > 0 &&
								lists.map((item) => {
									let date = new Date(item?.updatedAt);
									date = date.toDateString().slice(3, date.length);
									return (
										<tr
											key={item.tricklist_id}
											onClick={() => handleListClick(item.tricklist_id)}>
											<td>{item.name}</td>
											{!displayOnly && <td>{item?.Owner?.username}</td>}
											<td>{date}</td>
										</tr>
									);
								})}
					</tbody>
				</table>
			</div>
		)
	);
};

export default TricklistDisplay;
