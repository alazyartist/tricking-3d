import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../../api/api";

const TricklistbyIdDetails = ({ data }) => {
	const apiPrivate = useApiCreds();
	let updated = new Date(data?.updatedAt);
	updated = updated.toDateString();
	const [tricklistData, setTrickListData] = useState([]);
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
	const deleteComboById = (selectedListItem) => {
		apiPrivate
			.delete(
				`/tricklist/user/${selectedListItem.tricklist_id}/${selectedListItem.combo_id}/${selectedListItem.id}`
			)
			.then((datum) => console.log(datum))
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
					return (
						<div key={listItem.combo_id} className='flex gap-2'>
							<div>
								{listItem.combo_id.substring(listItem.combo_id.length - 5)}
							</div>
							{listItem?.Combo?.name}
							<div
								onClick={() => deleteComboById(listItem)}
								className='h-4 w-4 text-red-500'>
								<AiOutlineClose />
							</div>
						</div>
					);
				})}
		</>
	);
};

export default TricklistbyIdDetails;
