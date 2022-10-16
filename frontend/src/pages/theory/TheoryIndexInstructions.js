import React from "react";
import { useNavigate } from "react-router-dom";

const TheoryIndexInstructions = () => {
	const nav = useNavigate();
	return (
		<div className='text-center font-virgil text-xl text-zinc-300'>
			<div className='font-inter'>Above is the anatomy of a Combo</div>
			<div
				className='mb-6 text-base font-thin
			'>
				Click on an element to learn more!
			</div>
			<ul className='flex flex-col gap-3 font-light'>
				<li
					onClick={() => nav("setups")}
					className='rounded-xl border-2 border-zinc-500 p-2'>
					Setups
				</li>
				<li
					onClick={() => nav("stances")}
					className='rounded-xl border-2 border-zinc-500 p-2'>
					Stances
				</li>
				<li
					onClick={() => nav("transitions")}
					className='rounded-xl border-2 border-zinc-500 p-2'>
					Transitions
				</li>
				<li
					onClick={() => nav("tricks")}
					className='rounded-xl border-2 border-zinc-500 p-2'>
					Tricks
				</li>
			</ul>
		</div>
	);
};

export default TheoryIndexInstructions;
