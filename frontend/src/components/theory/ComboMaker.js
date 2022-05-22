import React, { useEffect, useState } from "react";
import { stanceArr, transArr, TrickListArr } from "../../data/TricklistClass";
import { stances } from "../../data/trickDataModel/TrickObjects";

import {
	Stance,
	Transition,
	Trick,
} from "../../data/trickDataModel/TrickClasses";
import ArrayDisplay from "./comboMaker/ArrayDisplay";

let newCombo = [];
function ComboMaker() {
	const [combo, setcombo] = useState();
	const [isTrick, setIsTrick] = useState(false);
	const [currentStance, setCurrentStance] = useState("Frontside");
	const [currentDirection, setCurrentDirection] = useState(
		stances[currentStance].direction
	);
	const [currentLeg, setCurrentLeg] = useState("Both");
	const [isDelete, setIsDelete] = useState(false);
	useEffect(() => {
		if (combo instanceof Stance) {
			let comboTrick = combo.getTrick();
			let comboStance = comboTrick.getStance();
			let pivot = `Pivot to`;
			if (combo.direction !== currentDirection && newCombo.length && !isTrick) {
				newCombo.push(pivot);
			}
			setCurrentStance(combo.name);
			setCurrentDirection(combo.direction);
			setIsTrick(false);
		}
		if (combo instanceof Trick) {
			setCurrentStance(combo.getStance());
			setIsTrick(true);
		}
		if (combo instanceof Transition) {
			setIsTrick(false);
		}
		newCombo = newCombo;
		if (combo) {
			setcombo(combo);
			newCombo.push(combo);
			setcombo("");
		}
		if (newCombo[newCombo.length - 1] == "Pivot to") {
			setIsDelete(!isDelete);
		}
	}, [
		combo,
		setcombo,
		newCombo,
		isTrick,
		currentStance,
		isDelete,
		setIsDelete,
	]);
	useEffect(() => {
		if (
			stances[currentStance].direction == currentDirection &&
			stances[currentStance].leg !== currentLeg
		) {
			console.log("Don'tMatch");
		}
	}, [currentStance, currentDirection, currentLeg]);

	useEffect(() => {
		newCombo.pop();
		setcombo();
	}, [isDelete, setIsDelete]);

	const handleTrickAdd = (e) => {
		setcombo(e);
		setCurrentLeg(e.toLeg);
	};
	function handleStanceAdd(e) {
		setCurrentStance(stances[e] ? stances[e]?.name : currentStance);
		setCurrentLeg(e.getTrick().fromLeg);
		setcombo(e);
	}
	function resetTricklist() {
		newCombo = [];
		setcombo();
		setCurrentLeg("Left");
		setCurrentStance("BacksideComplete");
		setCurrentDirection("Backwards");
		setIsTrick(true);
	}
	function deleteLast() {
		setIsDelete(!isDelete);
		if (currentLeg !== newCombo[newCombo.length - 1]?.toLeg) {
			if (newCombo[newCombo.length - 1]?.toLeg) {
				setCurrentLeg(
					newCombo[newCombo.length - 2]?.toLeg ||
						newCombo[newCombo.length - 1]?.leg ||
						"Left"
				);
			}
		}
	}
	let filteredStances = stanceArr.filter(
		(e) =>
			(e.leg == currentLeg && !isTrick) ||
			(isTrick && e.landingStyle == stances[currentStance].landingStyle)
	);
	let filteredTricks = TrickListArr.filter(
		(e) => e.takeoffStance == currentStance && e.fromLeg == currentLeg
	);
	let isEmpty = filteredTricks.length == 0;
	let filteredTransitions = transArr.filter(
		(e) =>
			(!isEmpty && e.fromLeg == stances[currentStance]?.leg) ||
			(isEmpty && e.fromLeg == currentLeg)
	);
	return (
		<div className='max-w-[80vw]'>
			<div
				className='flex flex-col
			 place-content-center place-items-center py-4 text-zinc-300'>
				<div className='text-2xl'>ComboMaker</div>
				<div
					id='ResetButton'
					className='m-2 rounded-lg bg-rose-600 p-2 py-1 text-zinc-800'
					onClick={() => resetTricklist()}>
					Reset
				</div>
				<div
					id='deleteLastElement'
					className='m-2 rounded-lg bg-rose-600 p-2 py-1 text-zinc-800'
					onClick={() => deleteLast()}>
					Remove LastTrick
				</div>
				{/* CurrentState Display */}
				<div
					id='CurrentState'
					className='absolute top-3 right-3 rounded-md bg-sky-300 p-4 text-zinc-700'>
					<div id='CurrentStance'>{`Current Stance: ${currentStance}`}</div>
					<div>{`From: ${
						newCombo[newCombo.length - 2]?.name || "Pick another Trick"
					}`}</div>
					<div>{`To: ${
						newCombo[newCombo.length - 1]?.name || "Pick A Trick"
					}`}</div>
					<div>{`Current direction: ${currentDirection}`}</div>
					<div key={currentLeg + 1}>{`Current Leg: ${currentLeg}`}</div>
				</div>
				{/* Combo State Array */}
				<div id='comboStateArr' className='flex flex-row flex-wrap p-2'>
					{newCombo?.map((e, i) => (
						<>
							<div
								key={i + e}
								onClick={() => console.log(e.name)}
								className='flex w-fit flex-row bg-zinc-700 p-2 pr-1 text-zinc-300'>
								<div>{`${e?.name || e || "Nope"}`}</div>
							</div>
						</>
					))}
				</div>
				<div id='arrayContainer' className='flex flex-col '>
					<div id='debugControls'>
						{/* Transitions Array
					<div>Transitions</div>
					<div
						id='transitionsArr'
						className='flex w-fit flex-row
						 flex-wrap  place-content-center'>
						{filteredTransitions.map((e, i) => (
							<div
								key={e.name + i}
								className='w-fit bg-zinc-700 p-3 text-zinc-300'
								onClick={() => {
									setcombo(e);
									setCurrentLeg(e.toLeg);
								}}>
								<div className='text-xl'>{`${e.name}`}</div>

								<div className='text-sm'>{`To ${e.toLeg}`}</div>
							</div>
						))}
					</div>
					{/* Tricks Array 
					<div>Tricks</div>
					<div
						id='tricklistArr'
						className='flex w-fit flex-row
						 flex-wrap  place-content-center'>
						{filteredTricks.map((e, i) => (
							<div
								key={e.name + i}
								className='w-fit bg-zinc-700 p-3 text-zinc-300'
								onClick={() => {
									setcombo(e);
									setCurrentLeg(e.toLeg);
								}}>{`${e.name}`}</div>
						))}
						</div>
						<div>{isEmpty && "Select Valid Stance"}</div>
					{/* Stances Array 
					<div>Stances</div>
					<div
						id='stanceArr'
						className='flex w-fit flex-row
						 flex-wrap  place-content-center'>
						{filteredStances.map((e, i) => (
							<div
								key={i}
								className='w-fit bg-zinc-700 p-3 text-zinc-300'
								onClick={(event) => handleStanceAdd(e)}>{`${
								e?.name || e
							}`}</div>
						))}
					</div> */}
					</div>

					<div className='flex flex-row gap-4 py-2'>
						<ArrayDisplay
							name={"SelectTransition"}
							arr={filteredTransitions}
							f={(e) => handleTrickAdd(e)}></ArrayDisplay>
						<ArrayDisplay
							isEmpty={isEmpty}
							name={"SelectTrick"}
							arr={filteredTricks}
							f={(e) => handleTrickAdd(e)}></ArrayDisplay>
						<ArrayDisplay
							name={currentStance}
							arr={filteredStances}
							f={(e) => handleStanceAdd(e)}></ArrayDisplay>
					</div>
					<div className=' flex w-full place-content-center rounded bg-zinc-600'>
						Timeline
					</div>
				</div>
			</div>
		</div>
	);
}

export default ComboMaker;
