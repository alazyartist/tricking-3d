import React from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import useComboMakerV2 from "../useComboMakerV2";

const Tricks = ({ setCurrentItem, filteredTricks }) => {
	return (
		<>
			<div
				className='rounded-xl bg-zinc-900 p-2'
				onClick={() =>
					setCurrentItem((s) => [
						...s,
						filteredTricks[Math.floor(Math.random() * filteredTricks.length)],
					])
				}>
				Random
			</div>
			<div className='no-scrollbar flex h-[60vh] w-[60vw] flex-col gap-3 overflow-y-auto rounded-xl p-2 peer-hover:bg-red-500'>
				<p className='place-self-end text-sm text-zinc-500'>
					{filteredTricks.length} Options
				</p>
				{filteredTricks.length &&
					filteredTricks.map((trick) => (
						<div key={trick.trick_id} className='rounded-xl  bg-zinc-800 p-2'>
							<div
								className='flex w-full justify-between'
								onClick={() => setCurrentItem((s) => [...s, trick])}>
								<div>{trick?.name}</div>
								<div className='text-zinc-500'>{trick?.type}</div>
							</div>
						</div>
					))}
			</div>
			<div className='absolute bottom-16 flex gap-2'>
				<MdOutlineArrowUpward />
				From Database
				<MdOutlineArrowUpward />
			</div>
		</>
	);
};

export default Tricks;
