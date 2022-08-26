import React from "react";
import Backgrounds from "./Backgrounds";

const Settings = ({ setActiveView }) => {
	return (
		<div
			className='no-scrollbar fixed top-[10vh] left-[10vw] flex h-[85vh] 
w-[80vw] flex-col items-center justify-center overflow-y-auto rounded-2xl 
py-6 font-inter text-zinc-300 sm:pr-6 md:pr-4
lg:pr-[5rem]
'>
			<div className='pb-4 font-inter text-3xl font-black'>
				MORE COMING SOON
			</div>
			<div className='flex flex-row gap-3 rounded-xl bg-zinc-900 p-2 text-xl font-bold'>
				<div className='text-zinc-300'>Background</div>
				<div className='text-zinc-600'>Lighting</div>
				<div className='text-zinc-600'>Model</div>
			</div>
			<div className='flex w-[50vw] flex-col place-content-center place-items-center rounded-xl bg-zinc-900 p-4'>
				<Backgrounds />
			</div>
		</div>
	);
};

export default Settings;
