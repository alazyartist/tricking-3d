import React, { useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";

const MakeNewTrickList = () => {
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
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className='flex place-content-center gap-2'>
				<input
					className='rounded-xl p-1 pl-2'
					onChange={(e) => {
						setName(e.target.value);
					}}
					placeholder={"name"}
					value={name}
					type={"text"}
				/>
				<button className='h-5 w-10 rounded-xl bg-red-500' />
			</form>
		</div>
	);
};

export default MakeNewTrickList;
