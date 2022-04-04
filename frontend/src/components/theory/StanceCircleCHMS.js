import React from "react";

function StanceCircleCHMS() {
	return (
		<div
			onClick={(e) => {
				console.log(e);
			}}
			id='stance-circle'
			className='grid h-[40vh] w-[40vh] grid-cols-2 overflow-hidden rounded-full bg-sky-400'>
			<div
				onClick={(e) => {
					console.log(e.target.firstChild.data);
				}}
				className='flex place-content-end place-items-end bg-sky-300 p-6 text-right font-inter font-bold text-zinc-800'>
				Hyper
			</div>
			<div
				onClick={(e) => {
					console.log(e.target.firstChild.data);
				}}
				className='flex place-items-end bg-teal-300 p-6'>
				Complete
			</div>
			<div
				onClick={(e) => {
					console.log(e.target.firstChild.data);
				}}
				className='flex place-content-end bg-emerald-500 p-6'>
				Mega
			</div>
			<div
				onClick={(e) => {
					console.log(e.target.firstChild.data);
				}}
				className='bg-teal-500 p-6'>
				Semi
			</div>
		</div>
	);
}

export default StanceCircleCHMS;
