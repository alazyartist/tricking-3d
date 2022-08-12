import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useGetTricklists from "../../../api/useGetTricklists";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";

const TricklistDisplay = ({ count, setOpenView, setTricklist_id }) => {
	const queryClient = useQueryClient();
	const userInfo = useUserStore((s) => s.userInfo);
	const [lists, setLists] = useState([]);
	const accessToken = useUserStore((s) => s.accessToken);
	const apiPrivate = useApiCreds();

	const handleListClick = (uuid) => {
		console.log("setOpenView", uuid);
		setTricklist_id(uuid);
		setOpenView(true);
	};
	const { data } = useGetTricklists();
	// const queryInfo = queryClient.getQueryData({ queryKey: "userInfo" });
	useEffect(() => {
		if (data) {
			setLists(data);
		} else {
			console.log("no-data");
			// setLists(userInfo?.MyTricklists);
		}
		console.log(data);
	}, [data, userInfo]);
	return (
		<div>
			<table>
				<thead className=' text-center text-lg font-semibold text-zinc-300'>
					<th className='px-2'>tricklist_id</th>
					<th className='px-2'>name</th>
					<th className='px-2'>owner</th>
					<th className='px-2'>lastUpdated</th>
				</thead>
				<tbody className='text-center'>
					{Array.isArray(lists) &&
						lists.map((item) => (
							<tr onClick={() => handleListClick(item.tricklist_id)}>
								<td>
									{item.tricklist_id.substring(item.tricklist_id.length - 4)}
								</td>
								<td>{item.name}</td>
								<td>{item?.Owner?.username}</td>
								<td>
									{Number(
										(Date.now() - new Date(item.updatedAt)) / 1000 / 60
									).toFixed(0)}{" "}
									min
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default TricklistDisplay;
