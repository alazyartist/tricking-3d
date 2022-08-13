import React, { useEffect, useState } from "react";
import {
	useDeleteInteraction,
	useGetInteractions,
} from "../../api/useInteractions";
import useApiCreds from "../../hooks/useApiCreds";
import { useStore } from "../../store/store";
import { useUserStore } from "../../store/userStore";
import UserProfilePicById from "./UserProfilePicById";

const TrickInfoComments = ({ count }) => {
	const apiPrivate = useApiCreds();
	const { userInfo } = useUserStore();
	const currentAnim = useStore((s) => s.currentAnim);
	const trick_id = useStore((s) => s.trick_id);
	// const [comments, setComments] = useState();
	console.log(userInfo);
	// const getComments = () => {
	// 	apiPrivate
	// 		.post("user/comments", {
	// 			trick: currentAnim,
	// 		})
	// 		.then((resData) => {
	// 			setComments(resData.data.comments);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	const { data: comments } = useGetInteractions(trick_id);
	const { mutate: deleteComment } = useDeleteInteraction();
	useEffect(() => {
		console.log(comments);
	}, [comments]);
	// const deleteComment = (iid) => {
	// 	console.log(iid);

	// 	// apiPrivate
	// 	// 	.post("user/comments/delete", {
	// 	// 		interaction_id: iid,
	// 	// 	})
	// 	// 	.then(() => {
	// 	// 		// getComments();
	// 	// 	});
	// };
	// useEffect(() => {
	// 	getComments();
	// 	console.log("RAN GET COMMENTS", comments);
	// }, [count]);

	// useEffect(() => {
	// 	Array.isArray(comments) &&
	// 		comments.sort((a, b) => {
	// 			return (
	// 				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	// 			);
	// 		});
	// }, [comments]);

	return (
		trick_id && (
			<div className='absolute top-[40vh] h-[30vh] w-[95vw] overflow-auto rounded-xl bg-zinc-800 bg-opacity-60 p-4 pt-4'>
				<div>
					{Array.isArray(comments) &&
						comments?.length &&
						comments?.map((comment) => (
							<div key={comment.interaction_id} className='flex gap-2'>
								<UserProfilePicById
									key={comment.interaction_id}
									id={comment.user_id}
								/>
								<div>{comment.content}</div>
								{userInfo.id === comment.user_id && (
									<p
										className='self-center text-xs text-zinc-400'
										onClick={() => deleteComment(comment.interaction_id)}>
										delete
									</p>
								)}
							</div>
						))}
				</div>
			</div>
		)
	);
};

export default TrickInfoComments;
