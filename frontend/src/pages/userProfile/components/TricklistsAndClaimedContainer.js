import React from "react";

const TricklistsAndClamiedContainer = ({ MyTricklists }) => {
	return (
		<>
			<div className='flex w-[80vw] place-content-center place-items-center gap-2'>
				<div className='w-full rounded-t-md bg-zinc-700 p-2'>Tricklists</div>
				<div className='w-full rounded-t-md bg-zinc-700 p-2'>Claimed</div>
			</div>
			<div className='flex h-[37vh] w-[80vw] flex-col place-content-center place-items-center bg-zinc-700'>
				{(MyTricklists?.length &&
					MyTricklists?.map((list) => <div>{list?.name}</div>)) ||
					"No Tricklists to Display"}
			</div>
		</>
	);
};

export default TricklistsAndClamiedContainer;
