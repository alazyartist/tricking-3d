import React, { useEffect, useState } from "react";
import Ably from "ably/promises";
import { FaArrowUp } from "react-icons/fa";
const ably = new Ably.Realtime(
	"JGiS4w.Vg6zNA:TtwxohPIqL_TBzkPu0Gr0STE2cm6Ah-xfek0FkqY40s"
);
const Feed = () => {
	const [feedArr, updateFeedArr] = useState([]);
	const feedChannel = ably.channels.get("feed");

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
		<div className='flex flex-col p-2'>
			<div className='p-2 text-2xl text-zinc-300'>Feed</div>
			<div className='no-scrollbar flex h-fit flex-col overflow-y-scroll'>
				{feedArr?.map((mes) => (
					<div className='text-zinc-200' key={mes.id}>
						{mes?.data?.name} <span className='text-xs'> created by </span>
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
