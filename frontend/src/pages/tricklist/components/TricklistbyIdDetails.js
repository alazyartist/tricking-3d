import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Claimed from "./Claimed";
import {
	useDeleteCombo,
	useGetTricklistDetailsById,
} from "../../../api/useTricklists.js";
import { useUserStore } from "../../../store/userStore";

const TricklistbyIdDetails = ({ tricklist_id, data }) => {
	const { uuid } = useUserStore((s) => s.userInfo);
	let updated = new Date(data?.updatedAt);
	updated = updated.toDateString();
	const [editing, setEditing] = useState(false);

	const { data: tricklistData } = useGetTricklistDetailsById(
		tricklist_id,
		uuid
	);
	const { mutate: deleteComboById } = useDeleteCombo();

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
			{/* TricklistData shoul be [{},{}] */}
			{Array.isArray(tricklistData) &&
				tricklistData.map((listItem) => {
					return (
						<div
							key={listItem.combo_id + Math.floor(Math.random() * 1000)}
							className='place-items-center flex justify-between gap-2 rounded-xl bg-zinc-900  p-1'>
							<div>{listItem?.Combo?.name}</div>
							{editing && (
								<div
									onClick={() => deleteComboById(listItem)}
									className='h-8 w-8 place-items-end text-3xl text-red-500'>
									<AiOutlineClose />
								</div>
							)}
							{!editing && (
								<Claimed
									user_id={uuid}
									combo_id={listItem?.combo_id}
									combo={listItem}
								/>
							)}
						</div>
					);
				})}
		</>
	);
};

export default TricklistbyIdDetails;
