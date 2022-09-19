import React from "react";
import useGetTricks from "../../api/useGetTricks";
import { FaCheck, FaCircle } from "react-icons/fa";
import ClaimedTricks from "./components/ClaimedTricks";

const ClaimTricks = ({ user_id }) => {
	const { data: tricks } = useGetTricks();
	return (
		<div className='no-scrollbar h-[60vh] w-full overflow-y-scroll font-inter'>
			<div className='text-center text-3xl font-bold'>ClaimTricks</div>
			<div>
				{tricks?.map((trick) => (
					<div className=' grid h-full w-[70vw] grid-cols-5 place-content-center justify-between p-2 odd:bg-zinc-700'>
						<div className='col-span-3 flex place-items-center'>
							{trick?.name}
						</div>
						<div className='col-span-1 flex place-items-center'>
							{trick?.type}
						</div>
						<div className='relative col-span-1 flex h-full place-content-end place-items-center gap-2'>
							<ClaimedTricks trick_id={trick.trick_id} user_id={user_id} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ClaimTricks;
