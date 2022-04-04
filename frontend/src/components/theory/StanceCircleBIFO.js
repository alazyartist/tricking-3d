import React from "react";

function StanceCircleBIFO() {
	return (
		<div
			id='stance-circle'
			className='grid h-[40vh] w-[40vh] rotate-45 grid-cols-2 overflow-hidden rounded-full bg-sky-400 opacity-25'>
			<div
				onClick={(e) => {
					console.log(e.target.firstChild.data);
				}}
				className='flex  place-content-center place-items-center bg-sky-400 p-6 text-right font-inter font-bold text-zinc-800'>
				<p className='rotate-[-45deg] text-center'>Backside</p>
			</div>
			<div
				onClick={(e) => {
					console.log(e.target.firstChild.data);
				}}
				className='flex  place-content-center place-items-center bg-lime-300 p-6'>
				<p className='rotate-[-45deg] text-center'>Outside</p>
			</div>
			<div
				onClick={(e) => {
					console.log(e.target.firstChild.data);
				}}
				className='flex place-content-center place-items-center  bg-emerald-300 p-6'>
				<p className='rotate-[-45deg] text-center'>Inside</p>
			</div>
			<div
				onClick={(e) => {
					console.log(e.target.firstChild.data);
				}}
				className='flex place-content-center place-items-center bg-teal-500 p-6 text-center'>
				<p className='rotate-[-45deg] text-center'>Frontside</p>
			</div>
		</div>
	);
}

export default StanceCircleBIFO;
