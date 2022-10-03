import React, { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaCheck, FaSearch } from "react-icons/fa";
import { MdOutlineArrowUpward } from "react-icons/md";
import { stances } from "../../../data/trickDataModel/TrickObjects";
import { useComboMakerStore } from "../../../store/comboMakerStore";
import useComboMakerV2 from "../useComboMakerV2";

const Tricks = ({ allTricks, lastItem, setCurrentItem, filteredTricks }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchedItems, setSearchedItems] = useState();
	useEffect(() => {
		if (
			(allTricks !== undefined && !searchTerm) ||
			searchedItems?.length === 0
		) {
			setSearchedItems(allTricks);
		}
	}, [allTricks, searchedItems]);
	const handleFilter = (event) => {
		const searchTerm = event.target.value;
		const newFilter = allTricks.filter((value) => {
			return value.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
		setSearchTerm(searchTerm);
		setSearchedItems(newFilter);
	};

	return (
		<>
			<div
				className=' flex place-items-center gap-2 rounded-xl bg-zinc-900 p-2'
				onClick={() =>
					setCurrentItem((s) => [
						...s,
						filteredTricks[Math.floor(Math.random() * filteredTricks.length)],
					])
				}>
				<AiOutlinePlusSquare /> Random
			</div>
			<div
				onClick={() => document.getElementById("searchBar").focus()}
				className='flex place-content-center place-items-center gap-2 rounded-xl bg-zinc-800 p-2'>
				<FaSearch />
				<input
					id='searchBar'
					type={"text"}
					className={"bg-inherit text-xl"}
					value={searchTerm}
					onChange={handleFilter}
				/>
			</div>
			<div className='no-scrollbar flex h-[60vh] w-[60vw] max-w-[560px] flex-col gap-3 overflow-y-auto rounded-xl p-2 peer-hover:bg-red-500'>
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
				{searchedItems?.length &&
					searchedItems?.map((trick) => (
						<div
							key={trick.trick_id + Math.random().toString()}
							className='rounded-xl  bg-zinc-800 p-2'>
							<div
								className='flex w-full justify-between'
								onClick={() => setCurrentItem((s) => [...s, trick])}>
								<div>{trick?.name}</div>
								<div className='flex place-content-center place-items-center gap-2 text-zinc-500'>
									{trick?.type === "Transition" && trick?.fromLeg}
									{trick?.type}
									{trick?.defaultAnimation && (
										<FaCheck className='text-emerald-500' />
									)}
								</div>
							</div>
						</div>
					))}
			</div>
			{/* <div className='absolute bottom-16 flex gap-2'>
				<MdOutlineArrowUpward />
				From Database
				<MdOutlineArrowUpward />
			</div> */}
		</>
	);
};

export default Tricks;
