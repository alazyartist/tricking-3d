import React from "react";
import useGetTricklists from "../../../api/useTricklists";
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
	const { data: lists } = useGetTricklists(profileuuid);

	return (
		!open && (
			<div
				id='TricklistDisplay-table'
				className='place-content-center flex w-full p-2'>
				<table>
					<thead className='text-center text-xs font-semibold text-zinc-300'>
						<tr>
							<th className=''>name</th>
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
