import React, { useEffect, useState } from "react";
import { stanceArr, transArr, TrickListArr } from "../../data/TricklistClass";
import { stances } from "../../data/trickDataModel/TrickObjects";

import { Stance, Trick } from "../../data/trickDataModel/TrickClasses";
import Dropdown from "../Dropdown";
// function comboFactory() {
// 	for (let i = 0; i < arguments.length; i++) {
// 		// console.log(arguments[i]);
// 		let prevArg = arguments[i + 1];
// 		if (arguments[i].landingStance === prevArg.landingStance) {
// 			console.log(
// 				"is Valid",
// 				arguments[i].landingStance,
// 				prevArg.landingStance,
// 				arguments[i].name
// 			);
// 			i++;
// 		}
// 	}
// }

let newCombo = [];
// comboFactory(...newCombo);
// console.log(newCombo);
function ComboMaker() {
	const [combo, setcombo] = useState();
	const [currentStance, setCurrentStance] = useState("Backside");
	const [currentDirection, setCurrentDirection] = useState(
		stances[currentStance].direction
	);
	const [currentLeg, setCurrentLeg] = useState("Both");
	let newComboStateArr = newCombo;

	useEffect(() => {
		if (combo instanceof Stance) {
			// console.log("truly a stance", combo.getTrick());
			let comboTrick = combo.getTrick();
			let comboStance = comboTrick.getStance();
			let pivot = `to`;
			// setcombo(comboTrick);
			if (combo.direction !== currentDirection) {
				newCombo.push(pivot);
			}
			setCurrentStance(combo.name);
			setCurrentDirection(combo.direction);
			// setcombo(comboStance);
		}
		if (combo instanceof Trick) {
			// console.log("truly a Trick", combo.getStance());
			let comboStance = combo.getStance();
			setCurrentStance(comboStance);
			// setcombo(comboStance);
			// newCombo.push(comboStance);
		}

		// console.log("useeffect", newCombo);

		newComboStateArr = newCombo;
		setcombo("");
		// return newComboStateArr;
		if (combo) {
			setcombo(combo);
			newCombo.push(combo);
			setcombo("");
		}
	}, [
		combo,
		setcombo,
		newCombo,
		newComboStateArr,
		newCombo.length,
		currentStance,
	]);
	useEffect(() => {
		if (
			stances[currentStance].direction == currentDirection &&
			stances[currentStance].leg !== currentLeg
		) {
			console.log("Don'tMatch");
		}
	}, [currentStance, currentDirection, currentLeg]);

	let isEmpty =
		TrickListArr.filter(
			(e) => e.takeoffStance == currentStance && e.fromLeg == currentLeg
		).length == 0;
	return (
		<div className='max-w-[80vw]'>
			<div
				className='flex flex-col
			 place-content-center place-items-center py-4 text-zinc-300'>
				<div className='text-2xl'>ComboMaker</div>
				<div className='text-sky-400'>ComboMakerhere</div>
				<div
					className='text-sky-400'
					onClick={() => {
						console.log("Reset");
						newCombo = [];
						setcombo();
						setCurrentLeg("Left");
						setCurrentStance("BacksideComplete");
					}}>
					Reset
				</div>
				<div
					id='currentStance'
					className='text-zinc-300'>{`${currentStance}`}</div>
				<div>{`${stances[currentStance].direction}`}</div>
				<div>{`current direction: ${currentDirection}`}</div>
				<div key={currentLeg + 1}>{`current leg: ${currentLeg}`}</div>

				<div id='comboState' className='flex flex-col p-2'>
					{newComboStateArr?.map((e, i) => (
						<>
							<div
								key={e.name + i}
								onClick={(e) => console.log(newComboStateArr[i])}
								className='flex w-fit flex-col bg-zinc-700 pr-1 text-zinc-300'>
								<div>{`${e?.name || e || "Nope"}`}</div>
							</div>
						</>
					))}
				</div>
				<div className='flex flex-col '>
					<div>Transitions</div>
					<div
						id='transitionsArr'
						className='flex w-fit flex-row
						 flex-wrap  place-content-center'>
						{TrickListArr.filter(
							(e) => e.takeoffStance == currentStance && e.fromLeg == currentLeg
						).length !== 0 &&
							transArr
								.filter((e) => e.fromLeg == stances[currentStance]?.leg)
								.map((e, i) => (
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
						{isEmpty &&
							transArr
								.filter((e) => e.fromLeg == currentLeg)
								.map((e, i) => (
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
					<div
						onClick={() => console.log(stances[currentStance].getTrick().name)}>
						Tricks
					</div>
					<div
						id='tricklistArr'
						className='flex w-fit flex-row
						 flex-wrap  place-content-center'>
						{TrickListArr.filter(
							(e) => e.takeoffStance == currentStance && e.fromLeg == currentLeg
						).map((e, i) => (
							<div
								key={e.name}
								className='w-fit bg-zinc-700 p-3 text-zinc-300'
								onClick={() => {
									setcombo(e);
									setCurrentLeg(e.toLeg);
								}}>{`${e.name}`}</div>
						))}
					</div>
					<div>
						{TrickListArr.filter(
							(e) => e.takeoffStance == currentStance && e.fromLeg == currentLeg
						).length == 0 && "Select Valid Stance"}
					</div>
					<div>Stances</div>
					<div
						id='stanceArr'
						className='flex w-fit flex-row
						 flex-wrap  place-content-center'>
						{stanceArr
							.filter(
								// (e) => e.leg == stances[currentStance]?.getTrick().fromLeg
								(e) => e.style == stances[currentStance].getTrick().takeoffStyle
								// e.direction == stances[currentStance]?.direction
							)
							.map((e, i) => (
								<div
									key={e.name + i}
									className='w-fit bg-zinc-700 p-3 text-zinc-300'
									onClick={() => {
										setCurrentStance(
											stances[e] ? stances[e]?.name : currentStance
										);
										setCurrentLeg(e.getTrick().fromLeg);
										setcombo(e);
									}}>{`${e?.name || e}`}</div>
							))}
					</div>
					<div>
						{/* <Dropdown
							buttonName={currentStance}
							buttonMap={stanceArr.map((s) => s.name)}
							f={(e) => {
								setcombo(e);
								setCurrentStance(e);
								// navigate(`/3d/sandbox/${currentModel}/${e}`);
							}} */}
						{/* /> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ComboMaker;
