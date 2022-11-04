import React from "react";

const ProfileInfoCard = ({ userInfo }) => {
	return (
		<div className='flex h-full w-[92vw] max-w-[800px] flex-col place-items-start'>
			<div className='relative mt-6 flex w-full flex-row justify-between gap-2 rounded-xl bg-zinc-700 p-2 pt-2 text-sm '>
				<img
					alt='user profile'
					src={
						userInfo?.profilePic
							? `/images/${userInfo?.uuid}/${userInfo?.profilePic}`
							: `/images/noimg.jpeg`
					}
					className='absolute top-[-1.5rem] left-2 h-12 w-12 rounded-full'
				/>
				<div className='flex flex-col gap-2 place-self-start'>
					<div className='w-fit pt-[1.5rem] font-bold'>
						<div className='w-[100%] text-left'>{userInfo?.username}</div>
						<div className='text-left text-xs font-normal'>
							<div>
								{(userInfo?.Profile?.country &&
									`${userInfo?.Profile?.country} ${userInfo?.Profile?.state}`) ||
									"Location Unkown"}
							</div>
							<div>{userInfo?.Profile?.city}</div>
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
					<div className='w-fit flex-grow-0 border-2 border-zinc-300 p-[2px] px-[6px]'>
						4
					</div>
					{/* BIFW */}
					{userInfo?.Profile?.brands && (
						<div className='w-full rounded-md bg-zinc-800 p-2'>
							Brands I Fuck With
						</div>
					)}
					{/* Status */}
					{/* <div className='w-full rounded-md bg-zinc-800 p-2'>
					{userInfo?.Profile?.status || "I'm New Here"}
				</div> */}
				</div>
				<div
					id='badgeContainer'
					className='neumorphicIn grid h-full min-h-[150px] w-[200px] grid-cols-5 grid-rows-2 rounded-lg p-3'>
					{/* Badge Goes Here */}
					<div className='h-8 w-8 rounded-lg bg-zinc-900' />
				</div>
			</div>
		</div>
	);
};

export default ProfileInfoCard;
