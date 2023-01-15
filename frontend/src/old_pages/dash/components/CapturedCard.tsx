import React, { useState } from "react";

/* Tricker Profile Icons - rendered in Catpures Page */
const CapturedCard = ({ name, src, username }) => {
	const [displayName, setDisplayName] = useState(false)

	return (
		<div className='
			flex flex-col place-items-center 
			bg-zinc-800
			w-[25vw] 
			border-zinc-900 border-b-4
			rounded-lg
			font-inter 
		'>

			{/* Profile Icon */}
			<img src={src} className=' h-12 w-12 rounded-full mt-2 lg:h-20 lg:w-20' />

			{/* Display Name */}
			<div className='flex align-middle text-xs mb-2'>{displayName ? name : username}</div>

		</div>
	);
};

export default CapturedCard;
