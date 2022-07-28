import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";

const TricklistbyIdDetails = ({ data }) => {
	const apiPrivate = useApiCreds();
	let updated = new Date(data?.updatedAt);
	updated = updated.toDateString();
	const [listData, setListData] = useState([]);
	console.log("data", data);
	const getCombosById = () => {
		let tid = data.tricklist_id;
		apiPrivate
			.get(`/tricklist/user/tl/${tid}`)
			.then((response) => {
				console.log("TID ", response.data);
				setListData(response.data[0].TricklistCombos);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getCombosById();
	}, [data]);
	return (
		<>
			<div
				onChange={(e) => console.log(e)}
				// contentEditable='true'
				className='font-inter text-2xl font-bold text-zinc-300'>
				{data?.name}
			</div>
			<div id={"data-container"} className='flex gap-8 text-zinc-300'>
				<div className=''>{data?.Owner?.username}</div>
				<div className=''>{updated}</div>
			</div>
			<div onClick={() => getCombosById()} className='flex'>
				LIST ITEM GO HERE
			</div>
			{Array.isArray(listData) &&
				listData.map((listItem) => {
					console.log(listItem);
					return (
						<div className='flex flex-col gap-2'>
							<div>{listItem.name}</div>
							<div>{listItem.combo_id}</div>
							{listItem.ComboTricks.map((comboTrick) => (
								<div>{comboTrick.name}</div>
							))}
						</div>
					);
				})}
		</>
	);
};

export default TricklistbyIdDetails;
