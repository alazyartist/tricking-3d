import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useUserStore } from "../../../store/userStore";
import useAblyStore from "../../../hooks/useAblyStore";
const ably = useAblyStore.getState().ably;
const Feed = () => {
	const { uuid } = useUserStore((s) => s.userInfo);
	const [feedArr, updateFeedArr] = useState([]);
	const feedChannel = ably.channels.get("feed");

	ably.connection.once("connected", () => {
		const { tokenDetails } = ably.auth;
		console.log("Client connected to Ably using JWT", tokenDetails);
	});
	useEffect(() => {
		const subscribe = async () => {
			await feedChannel.subscribe("public", (m) => {
				console.log(m, feedArr);
				const newMessages = feedArr.slice(-4);
				newMessages.push(m);
				updateFeedArr(newMessages);
			});
		};
		subscribe();

		return () => feedChannel.unsubscribe();
	});
	return (
		<div className='flex h-20 flex-col p-2'>
			<div className='no-scrollbar flex h-fit flex-col overflow-y-scroll'>
				{feedArr?.map((mes) => (
					<div className='text-zinc-200' key={mes.id}>
						{mes?.data?.name}{" "}
						<span className='text-xs'> {mes?.data?.type} </span>
						{mes?.data?.owner}
					</div>
				))}
			</div>
			{/* <div className='flex gap-2'>
				<input
					type='text'
					onChange={(e) => setMessage(e.target.value)}
					value={message}
				/>
				<FaArrowUp
					className='h-7 w-7 text-emerald-300'
					onClick={() => handlePublish()}
				/>
			</div> */}
		</div>
	);
};

export default Feed;
