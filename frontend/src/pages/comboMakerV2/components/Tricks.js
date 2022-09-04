import React from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowUpward } from "react-icons/md";
import { stances } from "../../../data/trickDataModel/TrickObjects";
import { useComboMakerStore } from "../../../store/comboMakerStore";
import useComboMakerV2 from "../useComboMakerV2";

const Tricks = ({ lastItem, setCurrentItem, filteredTricks }) => {
	console.log(lastItem);
	return (
		<>
			<div
				className=' place-items-center flex gap-2 rounded-xl bg-zinc-900 p-2'
				onClick={() =>
					setCurrentItem((s) => [
						...s,
						filteredTricks[Math.floor(Math.random() * filteredTricks.length)],
					])
				}>
				<AiOutlinePlusSquare /> Random
			</div>
			<div className='no-scrollbar flex h-[60vh] w-[60vw] flex-col gap-3 overflow-y-auto rounded-xl p-2 peer-hover:bg-red-500'>
				{/* TODO Current Leg should go here-ish */}
				<p className='place-self-end text-sm text-zinc-500'>
					{
						stances[lastItem?.landingStance]?.leg
						// || lastItem?.toLeg
						// ||
						// lastItem?.leg
					}
				</p>
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
								<div className='place-content-center place-items-center flex gap-2 text-zinc-500'>
									{trick?.type}
									{trick?.defaultAnimation && (
										<FaCheck className='text-emerald-500' />
									)}
								</div>
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
