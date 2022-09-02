import React, { useState } from "react";

const CapturedCard = ({ name, src, username }) => {
	return (
		<div className='place-content-center place-items-center flex flex-col font-inter'>
			<img src={src} className='mt-2 h-12 w-12 rounded-full  lg:h-20 lg:w-20' />

			<div className='m-2 flex-col text-center '>
				<div className='text-md min-w-[60px] font-semibold'>{name}</div>
				<div className='text-xs'>{username}</div>
			</div>
		</div>
	);
};

export default CapturedCard;
