import React from "react";

const TheoryIndexInstructions = () => {
	return (
		<div className='text-center font-virgil text-xl text-zinc-300'>
			<div className='font-inter'>Above is the anatomy of a Combo</div>
			<div
				className='mb-6 text-base font-thin
			'>
				Click on an element to learn more!
			</div>
			<ul className='flex flex-col gap-3 font-light'>
				<li className='rounded-xl border-2 border-zinc-500 p-2'>Setups</li>
				<li className='rounded-xl border-2 border-zinc-500 p-2'>Stances</li>
				<li className='rounded-xl border-2 border-zinc-500 p-2'>Transitions</li>
				<li className='rounded-xl border-2 border-zinc-500 p-2'>Tricks</li>
			</ul>
		</div>
	);
};

export default TheoryIndexInstructions;
