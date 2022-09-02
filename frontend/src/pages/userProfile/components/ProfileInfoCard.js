import React from "react";

const ProfileInfoCard = ({ userInfo }) => {
	return (
		<div className='flex h-full flex-col'>
			<img
				src={
					userInfo?.profilePic
						? `/images/${userInfo?.uuid}/${userInfo?.profilePic}`
						: `/images/noimg.jpeg`
				}
				className='relative top-8 left-2 h-12 w-12 rounded-full'
			/>
			<div className='flex w-fit min-w-[35vw] max-w-[48vw] flex-col place-content-center place-items-start gap-2 rounded-xl bg-zinc-700 p-2 pt-2 text-sm'>
				<div className='pl-14 font-bold'>
					<div>{userInfo?.username}</div>
					<div className='text-center text-xs font-normal'>
						{(userInfo?.Profile &&
							`${userInfo?.Profile?.country} ${userInfo?.Profile?.state}`) ||
							"Location Unkown"}
					</div>
				</div>
				<div className='flex w-full justify-between'>
					<div>
						{userInfo?.Profile?.name ||
							userInfo?.first_name + " " + userInfo?.last_name}
					</div>
					<div className=''>{userInfo?.Profile?.age}</div>
				</div>
				<div>Level</div>
				{/* BIFW */}
				{userInfo?.Profile?.brands && (
					<div className='w-full rounded-md bg-zinc-800 p-2'>
						Brands I Fuck With
					</div>
				)}
				{/* Status */}
				<div className='w-full rounded-md bg-zinc-800 p-2'>
					{userInfo?.Profile?.status || "I'm New Here"}
				</div>
			</div>
		</div>
	);
};

export default ProfileInfoCard;
