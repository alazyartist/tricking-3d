import React, { useEffect, useState } from "react";
import {
	stanceArr,
	stances,
	transArr,
	TrickListArr,
	kickVariationsArr,
	rotations,
	touchdowns,
	grabs,
	shapes,
	Stance,
	Trick,
} from "../../data/TricklistClass";
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
console.log(newCombo);
function ComboMaker() {
	const [combo, setcombo] = useState();
	const [currentStance, setCurrentStance] = useState("BacksideComplete");
	const [currentDirection, setCurrentDirection] = useState("Backside");
	const [currentLeg, setCurrentLeg] = useState("Left");
	let newComboStateArr = newCombo;
	useEffect(
		() => {
			if (combo) {
				setcombo(combo);
				newCombo.push(combo);
			}

			if (combo instanceof Stance) {
				console.log("truly a stance", combo.getTrick());
				let comboTrick = combo.getTrick();
				let comboStance = comboTrick.getStance();
				setcombo(comboTrick);
				// newCombo.push(comboTrick);
				setCurrentStance(combo.name);
				setcombo(comboStance);
			}
			if (combo instanceof Trick) {
				console.log("truly a Trick", combo.getStance());
				let comboStance = combo.getStance();
				setCurrentStance(comboStance);
				// setcombo(comboStance);
				// newCombo.push(comboStance);
			}

			console.log("useeffect", newCombo);

			newComboStateArr = newCombo;
			setcombo("");
			// return newComboStateArr;
		},
		[combo, setcombo, newCombo, newComboStateArr, newCombo.length],
		currentStance
	);
	return (
		<div className='max-w-[80vw]'>
			<div className='flex flex-col place-content-center place-items-center py-4 text-zinc-300'>
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
				<div className='text-zinc-300'>{`${currentStance}`}</div>
				<div>{`${stances[currentStance].direction}`}</div>
				<div>{`${currentLeg}`}</div>

				<div id='comboState' className='flex flex-col p-2'>
					{newComboStateArr?.map((e, i) => (
						<>
							<div
								onClick={(e) => console.log(newComboStateArr[i])}
								className='flex w-fit flex-col bg-zinc-700 pr-1 text-zinc-300'>
								{/* <div>
								{Object.keys(e).map((q) => (
									<div key={e} className='text-white'>{`${e?.[q]}`}</div>
									{`${e?.landingStance || e?.name || e || "Nope"}`}
									))}
								</div> */}
								<div>{`${e?.name || e || "Nope"}`}</div>
								{/* <div>{`TS: ${e?.takeoffStance || "Pick Takeoff Stance"}`}</div>
								<div>{`LS: ${e?.landingStance || "Pick Landing Stance"}`}</div>
								<div>{`From: ${e?.fromLeg || "Choose A Leg"}`}</div>
								<div>{`To: ${e?.toLeg || "Choose A Leg"}`}</div>
								<div>{`Dir: ${e?.direction || "I have no direction"}`}</div>
								<div>{`Trick: ${e?.trick?.name || "Not a trick"}`}</div> */}
							</div>
						</>
					))}
				</div>
				<div>Transitions</div>
				<div
					id='transitionsArr'
					className='flex w-fit flex-row flex-wrap  place-content-center'>
					{transArr
						.filter((e) => e.fromLeg == stances[currentStance]?.leg)
						.map((e) => (
							<div
								className='w-fit bg-zinc-700 p-3 text-zinc-300'
								onClick={() => {
									setcombo(e);
									setCurrentLeg(e.toLeg);
								}}>
								<div>{`${e.name}`}</div>

								<div>{`To${e.toLeg}`}</div>
							</div>
						))}
				</div>
				<div>Tricks</div>
				<div
					id='tricklistArr'
					className='flex w-fit flex-row flex-wrap  place-content-center'>
					{TrickListArr.filter(
						(e) => e.takeoffStance == currentStance && e.fromLeg == currentLeg
					).map((e) => (
						<div
							className='w-fit bg-zinc-700 p-3 text-zinc-300'
							onClick={() => {
								setcombo(e);
								setCurrentLeg(e.toLeg);
							}}>{`${e.name}`}</div>
					))}
				</div>
				<div>Stances</div>
				<div
					id='stanceArr'
					className='flex w-fit flex-row flex-wrap  place-content-center'>
					{stanceArr
						.filter(
							(e) => e.leg == currentLeg
							// &&
							// e.direction == stances[currentStance]?.direction
						)
						.map((e) => (
							<div
								className='w-fit bg-zinc-700 p-3 text-zinc-300'
								onClick={() => setcombo(e)}>{`${e?.name || e}`}</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default ComboMaker;
