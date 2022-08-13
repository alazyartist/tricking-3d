import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useUserStore } from "../../../store/userStore";
import { useStore } from "../../../store/store";
import { useInteraction } from "../../../api/useInteractions";
import useGetTricks from "../../../api/useGetTricks";

const Interact = () => {
	const { userInfo, accessToken } = useUserStore();
	const currentAnim = useStore((s) => s.currentAnim);
	const { uuid } = userInfo;
	const [content, setContent] = useState();
	const trick_id = useStore((s) => s.trick_id);
	const setTrick_id = useStore((s) => s.setTrick_id);
	const { mutate: comment } = useInteraction();
	const { data: tricks } = useGetTricks();
	const handleSubmit = async (e) => {
		console.log(uuid);
		e.preventDefault();
		try {
			console.log("trying interact");
			comment({
				accessToken: accessToken,
				uuid: uuid,
				trick_id: trick_id,
				type: "comment",
				content: content,
			});
			// const newInteract = await apiPrivate.post("/user/interact", {
			// });
			setContent("");
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		let tid =
			tricks?.length &&
			tricks.filter((trick) =>
				trick.name.toLowerCase().includes(currentAnim.toLowerCase())
			)[0]?.trick_id;
		setTrick_id(tid);
		console.log(tricks);
		console.log(
			tricks?.length &&
				tricks.filter(
					(trick) => trick.name.toLowerCase() === currentAnim.toLowerCase()
				)
		);
		console.log(tid);
	}, [tricks, currentAnim]);
	useEffect(() => {
		console.log(trick_id);
	}, [trick_id]);

	return (
		trick_id && (
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
		)
	);
};

export default Interact;
