import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircleHalf, BsDiamondHalf, BsSquareHalf } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { useComboMakerStore } from "../../../store/comboMakerStore";
import ArrayDisplay from "./ArrayDisplay";
import SetupsIcon from "./SetupsIcon";
import StancesIcon from "./StancesIcon";
import TransitionsIcon from "./TransitionsIcon";
import TricksIcon from "./TricksIcon";
const AddComboItem = ({
	isEmpty,
	filteredTricks,
	filteredStances,
	filteredTransitions,
	handleTrickAdd,
	handleStanceAdd,
	// f,
}) => {
	const [addTrick, setAddTrick] = useState(true);
	const [type, setType] = useState("Tricks");
	const array = useComboMakerStore((s) => s.array);
	const setArray = useComboMakerStore((s) => s.setArray);

	const handleAdd = (e) => {
		if (type === "Tricks") {
			handleTrickAdd(e);
		}
		if (type === "Transitions") {
			handleTrickAdd(e);
		}
		if (type === "Stances") {
			handleStanceAdd(e);
			setType("Tricks");
		}
	};

	useEffect(() => {
		if (type === "Tricks") {
			setArray(filteredTricks);
		}
		if (type === "Transitions") {
			setArray(filteredTransitions);
		}
		if (type === "Stances") {
			setArray(filteredStances);
		}
	}, [
		type,
		addTrick,
		setAddTrick,
		filteredTricks,
		filteredStances,
		filteredTransitions,
	]);
	return (
		<div className='flex flex-col'>
			{addTrick && (
				<>
					<div className='flex place-items-end rounded-xl bg-zinc-700 p-3'>
						<TricksIcon
							onClick={() => {
								setType("Tricks");
								// setAddTrick(!addTrick);
							}}
							className='h-16 w-32'
						/>
						<StancesIcon
							onClick={() => {
								setType("Stances");
								// setAddTrick(!addTrick);
							}}
							className='h-16 w-24'
						/>
						<TransitionsIcon
							onClick={() => {
								setType("Transitions");
								// setAddTrick(!addTrick);
							}}
							className='h-12 w-24'
						/>
					</div>
				</>
			)}
			{addTrick && (
				<ArrayDisplay
					bg
					startOpen
					isEmpty={isEmpty}
					name={type}
					arr={array}
					f={(e) => handleAdd(e)}
				/>
			)}
			<div
				onClick={() => {
					setType("");
					setAddTrick(!addTrick);
				}}
				className='absolute bottom-[22vh] flex h-8 w-8 place-content-center place-items-center place-self-center rounded-full bg-slate-700'>
				{/* <AiOutlinePlus className='h-9 w-9' /> */}
				<TiPlus className='h-9 w-9' />
			</div>
		</div>
	);
};

export default AddComboItem;
