import React from "react";

const Settings = ({ setActiveView }) => {
	return (
		<div
			className='no-scrollbar fixed top-[10vh] left-[10vw] flex h-[85vh] 
w-[80vw] flex-col items-center justify-center overflow-y-auto rounded-2xl 
py-6 font-inter text-zinc-300 sm:pr-6 md:pr-4
lg:pr-[5rem]
'>
			<div className='flex flex-row gap-3'>
				<div>Lighting</div>
				<div>Background</div>
				<div>Model</div>
			</div>
		</div>
	);
};

export default Settings;
