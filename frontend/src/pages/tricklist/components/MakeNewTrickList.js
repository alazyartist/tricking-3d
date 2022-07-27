import React, { useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";

const MakeNewTrickList = ({ setOpen, setCount, count }) => {
	const [name, setName] = useState("");
	const accessToken = useUserStore((s) => s.accessToken);
	const { uuid } = useUserStore((s) => s.userInfo);
	const apiPrivate = useApiCreds();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submit new Tricklist");
		apiPrivate
			.post("/tricklist", {
				accessToken: accessToken,
				uuid: uuid,
				name: name,
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => console.log(err));
		setOpen(false);
		setCount(count + 1);
	};
	const handleClick = (e) => {
		if (e.target.nodeName === "DIV") {
			setOpen(false);
		}
	};
	return (
		<div
			onClick={(e) => handleClick(e)}
			className='absolute top-0 h-full w-full bg-zinc-800 bg-opacity-40 backdrop-blur-xl'>
			<div className='absolute top-[50vh] w-full '>
				<form
					onSubmit={handleSubmit}
					className='flex place-content-center gap-2'>
					<input
						className='rounded-xl p-1 pl-2'
						onChange={(e) => {
							setName(e.target.value);
						}}
						placeholder={"name"}
						value={name}
						type={"text"}
					/>
					<button className=' w-fit rounded-xl bg-emerald-600 p-2 text-zinc-300'>
						Create
					</button>
				</form>
			</div>
		</div>
	);
};

export default MakeNewTrickList;
