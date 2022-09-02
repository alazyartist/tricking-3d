import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useUpdateStatus } from "../api/useUpdateStatus";
import { useUserStore } from "../store/userStore";

const UpdateStatusInput = () => {
	const { mutate: updateStatus } = useUpdateStatus();
	const [status, setStatus] = useState();
	const uuid = useUserStore((s) => s.userInfo.uuid);
	const handleSubmit = async (e) => {
		e.preventDefault();
		updateStatus({ status, user_id: uuid });
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='flex place-content-center gap-2 font-inter text-zinc-800'>
			<input
				value={status}
				className='w-full rounded-xl'
				type={"text"}
				onChange={(e) => {
					setStatus(e.target.value);
				}}
			/>
			<button type='submit' value='Submit' className='w-fit p-4 text-zinc-300 '>
				<FaArrowUp />
			</button>
		</form>
	);
};

export default UpdateStatusInput;
