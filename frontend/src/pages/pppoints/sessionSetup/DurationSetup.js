import React from "react";

const DurationSetup = ({ setSessionTimer, sessionTimer }) => {
	return (
		<div className=' flex w-full place-content-center gap-2'>
			<div>Duration</div>
			{sessionTimer}s
			<select
				onChange={(e) => setSessionTimer(e.target.value)}
				className='w-fit bg-transparent'>
				<option className='bg-zinc-800 active:bg-zinc-500' value={15}>
					Test 15
				</option>
				<option className='bg-zinc-800 active:bg-zinc-500' value={60}>
					1 Minute
				</option>
				<option className='bg-zinc-800 active:bg-zinc-500' value={90}>
					1.5 Minutes
				</option>
				<option className='bg-zinc-800 active:bg-zinc-500' value={120}>
					2 Minutes
				</option>
				<option className='bg-zinc-800 active:bg-zinc-500' value={180}>
					3 Minutes
				</option>
				<option className='bg-zinc-800 active:bg-zinc-500' value={300}>
					5 Minutes
				</option>
				<option className='bg-zinc-800 active:bg-zinc-500' value={600}>
					10 Minutes
				</option>
			</select>
		</div>
	);
};

export default DurationSetup;
