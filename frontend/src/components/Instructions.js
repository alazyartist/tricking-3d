import React from "react";

function Instructions() {
	return (
		<div
			id='instructions-container'
			className='flex w-10/12 flex-col items-center
          justify-center rounded-md p-4 sm:w-6/12
          md:w-7/12 lg:w-6/12 xl:w-4/12'>
			<div className=' p-2 pt-0 font-inter text-3xl font-bold text-zinc-300'>
				Instructions
			</div>
			<ul className='flex list-disc flex-col space-y-2'>
				<li>
					<p className='text-xl'>Use ☝️ to look around with camera.</p>
				</li>
				<li>
					<p className='text-xl'>Use ✌️ to reposition camera.</p>
				</li>
				<li>
					<p className='text-xl'>
						Select the animations from the dropdown to choose a new animation.
					</p>
				</li>
				<li>
					<p className='text-xl'>SlowMo slows speed by 0.5.</p>
				</li>
				<li>
					<p className='text-xl'>Full speed resets speed to 1.</p>
				</li>
				<li>
					<p className='text-xl'>
						Reverse flips clip play direction - useful for isolating areas of a
						trick.
					</p>
				</li>
			</ul>
		</div>
	);
}

export default Instructions;
