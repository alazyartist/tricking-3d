import React from "react";

function Instructions() {
	return (
		<div
			id='instructions-container'
			className='flex w-10/12 flex-col items-center
          justify-center gap-10 rounded-md p-10 sm:w-6/12
          md:w-7/12 lg:w-6/12 xl:w-4/12'>
			<div>
				<p id='instuctions-header' className='text-5xl font-medium'>
					Instructions
				</p>
			</div>
			<ol className='flex list-disc flex-col space-y-2'>
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
			</ol>
		</div>
	);
}

export default Instructions;
