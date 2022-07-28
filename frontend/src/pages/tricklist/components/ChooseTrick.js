import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";

const ChooseTrick = ({ setOpen, open, tricklist_id }) => {
	const userInfo = useUserStore((s) => s.userInfo);
	const apiPrivate = useApiCreds();
	const [cname, setCname] = useState("");
	const addComboDB = async () => {
		try {
			apiPrivate.post("/combo/add", {
				tricklist_id: tricklist_id,
				uuid: userInfo.uuid,
				name: cname,
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {}, []);
	const handleClick = (e) => {
		if (e.target.id === "addItemBackground") {
			setOpen(false);
		}
	};
	return (
		<div
			onClick={(e) => handleClick(e)}
			id='addItemBackground'
			className='absolute top-0 left-0 flex h-full w-full place-content-center place-items-center bg-zinc-800 bg-opacity-40 backdrop-blur-md'>
			<div className='flex flex-col'>
				<div>ChooseTrick</div>
				<div>viewAllTricks</div>
				<div>{tricklist_id}</div>
				<input
					onChange={(e) => setCname(e.target.value)}
					type={"text"}
					value={cname}
				/>
				<div
					onClick={() => addComboDB()}
					className='w-full rounded-xl bg-sky-400'>
					Add Item
				</div>
			</div>
		</div>
	);
};

export default ChooseTrick;
