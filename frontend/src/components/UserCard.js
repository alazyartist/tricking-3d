import React from "react";

function UserCard(props) {
	return (
		<>
			<div className='mx-2 flex w-[70vw] place-items-center justify-between rounded-xl bg-zinc-800 px-4'>
				<img src={props.src} className='m-2 h-20 w-20 rounded-full' />
				<div className='flex flex-col'>
					<div className='text-xl font-semibold'>{props.name}</div>
					<div className='text-xs'>{props.username}</div>
				</div>
			</div>
		</>
	);
}

export default UserCard;
