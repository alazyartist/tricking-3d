import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";
import api from "../../../api/api";
import Claimed from "./Claimed";

const TricklistbyIdDetails = ({ data }) => {
	const apiPrivate = useApiCreds();
	let updated = new Date(data?.updatedAt);
	updated = updated.toDateString();
	const [editing, setEditing] = useState(false);
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
				<div>{updated}</div>
				<div
					className={`${editing ? "text-red-500" : "text-zinc-300"}`}
					onClick={() => setEditing(!editing)}>
					Edit
				</div>
			</div>
			<div onClick={() => getCombosById()} className='flex'>
				Refresh List{" "}
			</div>
			{/* TricklistData shoul be [{},{}] */}
			{Array.isArray(tricklistData) &&
				tricklistData.map((listItem) => {
					return (
						<div
							key={listItem.combo_id + Math.floor(Math.random() * 1000)}
							className='flex place-items-center justify-between gap-2 rounded-xl bg-zinc-900  p-1'>
							<div>{listItem?.Combo?.name}</div>
							{editing && (
								<div
									onClick={() => deleteComboById(listItem)}
									className='h-8 w-8 place-items-end text-3xl text-red-500'>
									<AiOutlineClose />
								</div>
							)}
							{!editing && <Claimed combo={listItem} />}
						</div>
					);
				})}
		</>
	);
};

export default TricklistbyIdDetails;
