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
} from "../../data/TricklistClass";
function comboFactory() {
	for (let i = 0; i < arguments.length; i++) {
		// console.log(arguments[i]);
		let prevArg = arguments[i + 1];
		if (arguments[i].landingStance === prevArg.landingStance) {
			console.log(
				"is Valid",
				arguments[i].landingStance,
				prevArg.landingStance,
				arguments[i].name
			);
			i++;
		}
	}
}

let newCombo = [];
// comboFactory(...newCombo);
console.log(newCombo);
function ComboMaker() {
	const [combo, setcombo] = useState();
	let newComboStateArr = newCombo;
	useEffect(() => {
		if (combo) {
			setcombo(combo);
			newCombo.push(combo);
		}
		console.log("useeffect", newCombo);

		newComboStateArr = newCombo;
		setcombo("");
		// return newComboStateArr;
	}, [combo, setcombo, newCombo, newComboStateArr]);
	return (
		<div className='flex flex-col place-content-center place-items-center py-4 text-zinc-300'>
			<div className='text-2xl'>ComboMaker</div>
			<div className='text-sky-400'>ComboMakerhere</div>
			<div
				className='text-sky-400'
				onClick={() => {
					console.log("Reset");
					newCombo = [];
					console.log("newCombo", newCombo);
				}}>
				Reset
			</div>
			<div className='flex flex-row p-2'>
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
							<div>{`TS: ${
								e?.takeoffStance || e?.baseStance || e || "Nope"
							}`}</div>
							<div>{`LS: ${
								e?.landingStance || e?.baseStance || e || "Nope"
							}`}</div>
							<div>{`From: ${e?.fromLeg || e.leg || "Nope"}`}</div>
							<div>{`To: ${e?.toLeg || e.leg || "Nope"}`}</div>
						</div>
					</>
				))}
			</div>
			<div>Transitions</div>
			<div className='flex flex-row'>
				{transArr.map((e) => (
					<div
						className='w-fit bg-zinc-700 p-3 text-zinc-300'
						onClick={() => setcombo(e)}>{`${e.name}`}</div>
				))}
			</div>
			<div>Tricks</div>
			<div className='flex flex-row'>
				{TrickListArr.map((e) => (
					<div
						className='w-fit bg-zinc-700 p-3 text-zinc-300'
						onClick={() => setcombo(e)}>{`${e.name}`}</div>
				))}
			</div>
			<div>Stances</div>
			<div className='flex flex-row'>
				{stanceArr.map((e) => (
					<div
						className='w-fit bg-zinc-700 p-3 text-zinc-300'
						onClick={() => setcombo(e)}>{`${e?.name || e}`}</div>
				))}
			</div>
		</div>
	);
}

export default ComboMaker;
