import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircleHalf, BsDiamondHalf, BsSquareHalf } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { useComboMakerStore } from "../../../store/comboMakerStore";
import ArrayDisplay from "./ArrayDisplay";
const AddComboItem = ({
	isEmpty,
	filteredTricks,
	filteredStances,
	filteredTransitions,
	f,
}) => {
	const [addTrick, setAddTrick] = useState(true);
	const [type, setType] = useState();
	const array = useComboMakerStore((s) => s.array);
	const setArray = useComboMakerStore((s) => s.setArray);

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
	}, [type, addTrick, setAddTrick]);
	return (
		<div className='flex flex-col'>
			{!addTrick && (
				<ArrayDisplay
					bg
					startOpen
					isEmpty={isEmpty}
					name={type}
					arr={array}
					f={(e) => f(e)}
				/>
			)}
			{addTrick && (
				<>
					<div className='flex gap-2 rounded-xl bg-zinc-700 p-3'>
						<div>
							<BsCircleHalf
								onClick={() => {
									setType("Stances");
									setAddTrick(!addTrick);
								}}
								className='h-12 w-12'
							/>
							<p className='text-xs'>Stances</p>
						</div>
						<BsSquareHalf
							onClick={() => {
								setType("Transitions");
								setAddTrick(!addTrick);
							}}
							className='h-12 w-12'
						/>
						<BsDiamondHalf
							onClick={() => {
								setType("Tricks");
								setAddTrick(!addTrick);
							}}
							className='h-12 w-12'
						/>
					</div>
				</>
			)}
			<div
				onClick={() => {
					setType("");
					setAddTrick(!addTrick);
				}}
				className='absolute bottom-[14vh] flex h-8 w-8 place-content-center place-items-center place-self-center rounded-full bg-slate-700'>
				{/* <AiOutlinePlus className='h-9 w-9' /> */}
				<TiPlus className='h-9 w-9' />
			</div>
		</div>
	);
};

export default AddComboItem;
