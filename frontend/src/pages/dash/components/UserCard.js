import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import { useUserStore } from "../../../store/userStore";
import UpdateUserInfoForm from "../../../components/info/UpdateUserInfoForm";
import UpdateProfilePic from "../../../components/info/UpdateProfilePic";
function UserCard(props) {
	const userInfo = useUserStore((s) => s.userInfo);
	const [editingPhoto, setEditingPhoto] = useState(false);
	const [editing, setEditing] = useState(false);
	const editMenu = useTransition(editing, {
		from: { opacity: 0, top: "-40vw" },
		enter: { opacity: 1, top: "0" },
		leave: { opacity: 0, top: "-40vw" },
		reverse: editing,
		delay: 100,
		config: { durration: 1200, tension: 280, friction: 40 },
		// onRest: () => setediting(!editing),
	});

	return (
		<>
			<div className='mx-2 flex w-[70vw] place-items-center justify-between rounded-xl bg-zinc-800 px-4 sm:w-[50vw] md:w-[40vw] lg:w-[25vw] lg:place-self-start xl:w-[20vw]'>
				<div className='flex flex-col place-items-center'>
					<img src={props.src} className='m-2 h-20 w-20 rounded-full' />
					{props.edit && (
						<div
							onClick={() => {
								setEditing(!editing);
							}}
							className='flex place-self-center text-xs'>
							Edit Info
						</div>
					)}
				</div>

				<div className='flex flex-col'>
					<div className='text-xl font-semibold'>
						{userInfo.first_name + " " + userInfo.last_name}
					</div>
					<div className='text-xs'>{userInfo.username}</div>
				</div>
			</div>
			{/* {editing && (
				<div className='mt-4 h-10 w-[70vw] rounded-xl bg-zinc-800'>
					<UpdateUserInfoForm />
				</div>
			)} */}
			{editMenu(
				(styles, editing) =>
					editing && (
						<animated.div
							className='relative mt-4 h-10 w-[70vw] rounded-xl'
							style={styles}>
							<UpdateProfilePic />
							<UpdateUserInfoForm />
						</animated.div>
					)
			)}
		</>
	);
}

export default UserCard;
