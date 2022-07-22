import React from "react";

const CapturedCard = ({ name, src, username }) => {
	return (
		<div className='flex place-items-center font-inter'>
			<img src={src} className='m-2 h-12 w-12 rounded-full' />
			<div className='m-2 flex flex-col pt-2'>
				<div className='text-lg font-semibold'>{name}</div>
				<div className='text-sm'>{username}</div>
			</div>
		</div>
	);
};

export default CapturedCard;
