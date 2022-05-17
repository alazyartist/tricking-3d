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
let newCombo = [];
function TrickMaker() {
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
		<div className='flex flex-col place-content-center place-items-center py-4'>
			<div className='text-2xl'>TrickMaker</div>
			<div className='text-sky-400'>Trickmakerhere</div>
			<div className='flex flex-row p-2'>
				{newComboStateArr?.map((e, i) => (
					<>
						<div
							onClick={(e) => console.log(newComboStateArr[i])}
							className='flex w-fit flex-col bg-zinc-700 pr-1 text-zinc-300'>
							<div>{`${e?.name?.name || e?.name || e || "Nope"}`}</div>
							{`${e.pos || e.rotaions || e}`}

							{/* <div>
								{Object.keys(e).map((q) => (
									<div key={e} className='text-white'>{`${e?.[q]}`}</div>
								))}
							</div> */}
						</div>
					</>
				))}
			</div>
			<div>Variations-Kicks</div>
			<div className='flex flex-row'>
				{kickVariationsArr.map((e) => (
					<div
						className='w-fit bg-zinc-700 p-3 text-zinc-300'
						onClick={() => setcombo(e)}>{`${e?.name || e}`}</div>
				))}
			</div>
			<div>Variations-rotations</div>
			<div className='flex flex-row'>
				{Object.keys(rotations).map((e) => (
					<div
						className='w-fit bg-zinc-700 p-3 text-zinc-300'
						onClick={() => setcombo(e)}>{`${rotations[e]?.name || e}`}</div>
				))}
			</div>
			<div>Variations-touchdowns</div>
			<div className='flex flex-row'>
				{Object.keys(touchdowns).map((e) => (
					<div
						className='w-fit bg-zinc-700 p-3 text-zinc-300'
						onClick={() => setcombo(e)}>{`${touchdowns[e]?.name || e}`}</div>
				))}
			</div>
			<div>Variations-grabs</div>
			<div className='flex flex-row'>
				{Object.keys(grabs).map((e) => (
					<div
						className='w-fit bg-zinc-700 p-3 text-zinc-300'
						onClick={() => setcombo(e)}>{`${grabs[e]?.name || e}`}</div>
				))}
			</div>
			<div>Variations-shapes</div>
			<div className='flex flex-row'>
				{Object.keys(shapes).map((e) => (
					<div
						className='w-fit bg-zinc-700 p-3 text-zinc-300'
						onClick={() => setcombo(e)}>{`${shapes[e]?.name || e}`}</div>
				))}
			</div>
		</div>
	);
}

export default TrickMaker;
