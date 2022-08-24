import React, { useEffect, useState } from "react";
import {
	useDeleteInteraction,
	useGetInteractions,
} from "../../api/useInteractions";
import { useStore } from "../../store/store";
import { useUserStore } from "../../store/userStore";
import UserProfilePicById from "./UserProfilePicById";

const TrickInfoComments = () => {
	const { userInfo } = useUserStore();
	const currentAnim = useStore((s) => s.currentAnim);
	const trick_id = useStore((s) => s.trick_id);
	console.log(userInfo);

	const { data: comments } = useGetInteractions(trick_id);
	const { mutate: deleteComment } = useDeleteInteraction();
	useEffect(() => {
		console.log(comments);
	}, [comments]);

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
