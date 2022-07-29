import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";

const TricklistbyIdDetails = ({ data }) => {
	const apiPrivate = useApiCreds();
	let updated = new Date(data?.updatedAt);
	updated = updated.toDateString();
	const [tricklistData, setTrickListData] = useState([]);
	console.log("data", data);
	const getCombosById = () => {
		let tid = data.tricklist_id;
		apiPrivate
			.get(`/tricklist/user/tl/${tid}`)
			.then((response) => {
				console.log("TID ", response.data);
				setTrickListData(response.data);
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
			{/* TricklistData shoul be [{},{}] */}
			{Array.isArray(tricklistData) &&
				tricklistData.map((listItem) => {
					console.log("li", listItem);
					return (
						<div className='flex flex-col gap-2'>
							<div>{listItem.combo_id}</div>
							{listItem?.Combo?.name}
						</div>
					);
				})}
		</>
	);
};

export default TricklistbyIdDetails;
