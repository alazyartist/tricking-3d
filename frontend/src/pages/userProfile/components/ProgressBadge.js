import React from "react";

const ProgressBadge = () => {
	let circumference = 100;
	let percent = 10;
	let percentage = (circumference - percent) / 2;
	return (
		<div className='h-[40px] w-[40px] rounded-lg bg-zinc-900'>
			<div class=' relative top-1 left-0 flex items-center justify-center'>
				<svg class='h-[32px] w-[32px] -rotate-90 transform'>
					<circle
						cx='16'
						cy='16'
						r='14px'
						stroke='currentColor'
						stroke-width='3'
						fill='transparent'
						class='text-gray-700'
					/>

					<circle
						cx='16'
						cy='16'
						r='14px'
						stroke='currentColor'
						stroke-width='3'
						fill='transparent'
						stroke-dasharray={circumference}
						stroke-dashoffset={
							(circumference - percentage / 200) * circumference
						}
						class='text-blue-500 '
					/>
				</svg>
				<span class='absolute text-[12px]'>{percentage * 2}</span>
			</div>
		</div>
	);
};

export default ProgressBadge;
