import React, { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaCheck, FaSearch } from "react-icons/fa";
import { MdOutlineArrowUpward } from "react-icons/md";
import { stances } from "../../../data/trickDataModel/TrickObjects";
import { useComboMakerStore } from "../../../store/comboMakerStore";
import useComboMakerV2, { getStanceLeg } from "../useComboMakerV2";

const Tricks = ({ allTricks, lastItem, setCurrentItem, filteredTricks }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchedItems, setSearchedItems] = useState();
	const [typedItems, setTypedItems] = useState();
	const [activeTypes, setActiveTypes] = useState(["All"]);
	useEffect(() => {
		if (
			(allTricks !== undefined && !searchTerm) ||
			searchedItems?.length === 0
		) {
			setSearchedItems(allTricks);
		}
		console.log(activeTypes);
	}, [allTricks, searchedItems]);
	useEffect(() => {
		typeFilter(searchedItems);
	}, [activeTypes, searchedItems, allTricks, filteredTricks]);
	const typeFilter = (arr) => {
		if (activeTypes.length) {
			if (activeTypes?.includes("All")) return setTypedItems(searchedItems);
			activeTypes?.map((type) => {
				let temp = arr?.filter((value) => {
					console.log(value.type);
					return value.type.toLowerCase().includes(type.toLowerCase());
				});
				console.log(temp);
				setTypedItems(temp);
			});
		}
	};
	const handleFilter = (event) => {
		const searchTerm = event.target.value;
		const newFilter = allTricks.filter((value) => {
			return value.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
		setSearchTerm(searchTerm);
		setSearchedItems(newFilter);
	};
	const handleAddType = (type) => {
		if (activeTypes?.includes(type)) {
			console.log("already in there");

			return;
		} else {
			console.log("adding");
			setActiveTypes([type]);
		}
	};
	const addRandomItem = () => {
		let rndTrick = filteredTricks.filter((ft) => ft.type === "Trick")[
			Math.floor(Math.random() * filteredTricks.length)
		];
		let rndTransition = filteredTricks.filter((ft) => ft.type === "Transition")[
			Math.floor(Math.random() * filteredTricks.length)
		];
		let rndStance = filteredTricks.filter((ft) => ft.type === "Stance")[
			Math.floor(Math.random() * filteredTricks.length)
		];
		if (lastItem?.type === "Trick") {
			return Math.random() > 0.5 ? rndStance : rndTransition;
		} else if (lastItem?.type === "Transition") {
			return Math.random() > 0.5 ? rndStance : rndTrick;
		} else if (lastItem?.type === "Stance") {
			return Math.random() > 0.5 ? rndTrick : rndTransition;
		} else {
			return rndTrick;
		}
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

			<div className='no-scrollbar flex h-[100vh] w-[80vw] max-w-[560px] flex-col gap-1 overflow-y-auto rounded-xl p-2 peer-hover:bg-red-500'>
				{/* TODO Current Leg should go here-ish */}
				<div className='flex w-full justify-between gap-3 pt-2 text-[0.6rem] font-bold'>
					<div
						onClick={() => handleAddType("All")}
						className={`flex h-10 w-20 place-content-center place-items-center rounded-xl p-2 ${
							activeTypes[0] === "All" ? "neumorphicIn" : "neumorphic"
						}`}>
						All
					</div>
					<div
						onClick={() => handleAddType("Trick")}
						className={`flex h-10 w-20 place-content-center place-items-center rounded-xl p-2 ${
							activeTypes[0] === "Trick" ? "neumorphicIn" : "neumorphic"
						}`}>
						Tricks
					</div>
					<div
						onClick={() => handleAddType("Transition")}
						className={`flex h-10 w-20 place-content-center place-items-center rounded-xl p-2 ${
							activeTypes[0] === "Transition" ? "neumorphicIn" : "neumorphic"
						}`}>
						Transitions
					</div>
					<div
						onClick={() => handleAddType("Stance")}
						className={`flex h-10 w-20 place-content-center place-items-center rounded-xl p-2 ${
							activeTypes[0] === "Stance" ? "neumorphicIn" : "neumorphic"
						}`}>
						Stances
					</div>
				</div>
				<p className='place-self-end text-sm text-zinc-500'>
					{lastItem?.name}
					{
						getStanceLeg(lastItem?.landingStance)
						// || lastItem?.toLeg
						// ||
						// lastItem?.leg
					}
				</p>
				<p className='place-self-end text-sm text-zinc-500'>
					{filteredTricks.length} Options
				</p>
				{typedItems?.length > 0 &&
					typedItems?.map((trick) => (
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
