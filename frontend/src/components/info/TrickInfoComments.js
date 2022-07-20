import React, { useEffect, useState } from "react";
import useApiCreds from "../../hooks/useApiCreds";
import { useStore } from "../../store/store";

const TrickInfoComments = (count) => {
	const api = useApiCreds();
	const currentAnim = useStore((s) => s.currentAnim);
	const [comments, setComments] = useState();
	const getComments = async () => {
		try {
			const resData = await api.post("user/comments", {
				trick: currentAnim,
			});
			setComments(resData.data.comments);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		console.log("RAN GET COMMENTS", comments);
		getComments();
	}, [count]);

	return (
		<div className='h-[40vh] overflow-auto rounded-xl bg-zinc-800 bg-opacity-60 p-4 pt-4'>
			<div>
				{comments?.map((comment) => (
					<div className='flex gap-2'>
						<div>{comment.user_id}</div>
						<div>{comment.content}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrickInfoComments;
