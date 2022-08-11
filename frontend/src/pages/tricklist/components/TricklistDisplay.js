import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";

const TricklistDisplay = ({ count, setOpenView, setTricklist_id }) => {
	const accessToken = useUserStore((s) => s.accessToken);
	const userInfo = useUserStore((s) => s.userInfo);
	const apiPrivate = useApiCreds();
	const [lists, setLists] = useState([]);
	// const getUserTricklists = async () => {
	// 	apiPrivate
	// 		.post("/tricklist/user", {
	// 			accessToken: accessToken,
	// 			uuid: userInfo.uuid,
	// 		})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setLists(res.data);
	// 		})
	// 		.catch((err) => console.log(err));
	// };
	const handleListClick = (uuid) => {
		console.log("setOpenView", uuid);
		setTricklist_id(uuid);
		setOpenView(true);
	};
	useEffect(() => {
		// getUserTricklists();
		setLists(userInfo?.MyTricklists);
		console.log(userInfo?.MyTricklists);
	}, []);
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
