import React, { useEffect, useState } from "react";
import useApiCreds from "../../hooks/useApiCreds";
import { useStore } from "../../store/store";
import UserProfilePicById from "./UserProfilePicById";

const TrickInfoComments = ({ count }) => {
	const api = useApiCreds();
	const currentAnim = useStore((s) => s.currentAnim);
	const [comments, setComments] = useState();
	const getComments = () => {
		api
			.post("user/comments", {
				trick: currentAnim,
			})
			.then((resData) => {
				setComments(resData.data.comments);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getComments();
		console.log("RAN GET COMMENTS", comments);
	}, [count]);

	// useEffect(() => {
	// 	Array.isArray(comments) &&
	// 		comments.sort((a, b) => {
	// 			return (
	// 				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	// 			);
	// 		});
	// }, [comments]);

	return (
		<div className='absolute top-[40vh] h-[30vh] w-[95vw] overflow-auto rounded-xl bg-zinc-800 bg-opacity-60 p-4 pt-4'>
			<div>
				{comments?.map((comment) => (
					<div key={comment.interaction_id} className='flex gap-2'>
						<UserProfilePicById
							key={comment.interaction_id}
							id={comment.user_id}
						/>
						<div>{comment.content}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrickInfoComments;
