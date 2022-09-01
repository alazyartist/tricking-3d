import React from "react";
import { useUserStore } from "../../../store/userStore";

const ProfileInfoCard = ({ userInfo }) => {
	const { profilePic, uuid, username } = useUserStore((s) => s.userInfo);
	return (
		<div className='flex h-full flex-col'>
			<img
				src={
					profilePic ? `/images/${uuid}/${profilePic}` : `./images/noimg.jpeg`
				}
				className='relative top-8 left-2 h-12 w-12 rounded-full'
			/>
			<div className='flex w-fit min-w-[35vw] max-w-[48vw] flex-col place-content-center place-items-center rounded-xl bg-zinc-700 p-2 pt-2 text-sm'>
				<div className='pl-12'>{username}</div>
				<div>{userInfo?.Profile?.age}</div>
				<div>{userInfo?.Profile?.name}</div>
				<div>{userInfo?.Profile?.country + "," + userInfo?.Profile?.state}</div>
				<div>{userInfo?.Profile?.status}</div>
			</div>
		</div>
	);
};

export default ProfileInfoCard;
