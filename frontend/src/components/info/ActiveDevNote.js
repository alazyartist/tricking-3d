import React from "react";

function ActiveDevNote() {
	return (
		<>
			<div
				id='notice-under-development'
				className='absolute bottom-[14vh] z-[2] text-xs font-semibold text-red-300 opacity-40'>
				<div className='flex w-screen '>
					<h1 className='w-full text-center'>
						Note: Under Active Development. <br />
						WILL BREAK OFTEN
					</h1>
				</div>
			</div>
		</>
	);
}

export default ActiveDevNote;
