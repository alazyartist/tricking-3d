import React, { useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { FaArrowUp } from "react-icons/fa";
import { useUserStore } from "../../../store/userStore";
import { useStore } from "../../../store/store";

const Interact = ({ count, setCount }) => {
	const { userInfo, accessToken } = useUserStore();
	const currentAnim = useStore((s) => s.currentAnim);
	const { uuid } = userInfo;
	const api = useApiCreds();
	const [content, setContent] = useState();
	const handleSubmit = async (e) => {
		console.log(uuid);
		e.preventDefault();
		try {
			console.log("trying interact");
			const newInteract = await api.post("/user/interact", {
				accessToken: accessToken,
				uuid: uuid,
				type: currentAnim,
				content: content,
			});
			setContent("");
		} catch (err) {
			console.log(err);
		}
		setCount((count += 1));
	};

	return (
		<div className='fixed bottom-5  w-full'>
			<form
				onSubmit={handleSubmit}
				className='flex place-content-center gap-2 font-inter text-zinc-800'>
				<input
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
					className='z-[1020]
                    w-[80vw] rounded-xl p-1'
					type='text'
				/>
				<button
					type='submit'
					value='Submit'
					className='w-fit p-4 text-zinc-300 '>
					<FaArrowUp />
				</button>
			</form>
		</div>
	);
};

export default Interact;
