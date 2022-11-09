import React from "react";

const ProfileSessionInfo = ({ summary }) => {
	return (
		<div className=' '>
			<div className='sticky top-0 z-20 bg-zinc-800'>{summary?.name}</div>
			<div className='flex flex-col gap-1'>
				{summary?.SessionData.sort((a, b) => {
					if (a.SessionSource?.vidsrc < b.SessionSource?.vidsrc) return -1;
					if (a.SessionSource?.vidsrc > b.SessionSource?.vidsrc) return 1;
					if (a.clipStart > b.clipStart) return 1;
					if (a.clipStart < b.clipStart) return -1;
					return 0;
				}).map((d) => (
					<DataDetails key={d.id} d={d} />
				))}
			</div>
		</div>
	);
};

export default ProfileSessionInfo;

const DataDetails = ({ d }) => {
	console.log(d);
	return (
		<div className='flex justify-between'>
			<div>{d?.ClipLabel?.name}</div>
			<div>{d?.SessionSource?.vidsrc}</div>
			<div className='flex gap-2'>
				<div className='min-w-[48px] rounded-md bg-emerald-300 p-1 text-center text-zinc-800'>
					{d?.clipStart}
				</div>
				<div className='min-w-[48px] rounded-md bg-red-300 p-1 text-center text-zinc-800'>
					{d?.clipEnd}
				</div>
			</div>
		</div>
	);
};
