import React from "react";
import { stanceArr, transArr, TrickListArr } from "../data/TricklistClass";

function AnimationsNeeded() {
	const tricksCaptured = [
		"Backflip",
		"Gainer",
		"Webster",
		"Aerial",
		"Btwist",
		"Cork",
		"WrapFull",
		"Raiz",
		"Cartwheel",
		"Doublecork",
		"GainerSwitch",
		"Touchdown Raiz",
	];
	const total =
		TrickListArr.length +
		transArr.length +
		stanceArr.length -
		tricksCaptured.length;
	return (
		<div className='font-inter mt-14 flex h-[87vh] w-full flex-col place-items-center overflow-y-auto text-3xl text-zinc-300'>
			<div className=''>{total} Animations Needed</div>
			<div className='text-base'>
				<List
					arr={TrickListArr.filter((e) => !tricksCaptured.includes(e.name))}
				/>
				<List
					arr={transArr.filter((e) => !tricksCaptured.includes(e.name))}
					trans
				/>
				<List arr={stanceArr.filter((e) => !tricksCaptured.includes(e.name))} />
			</div>
		</div>
	);
}

function List(props) {
	return (
		<>
			{props.arr.map((e) => (
				<div className='flex place-items-center gap-2'>
					<input className='rounded-4xl pb-1' type='checkbox' />
					<div className='pb-1'>{e.name}</div>
					{props.trans && <div className='pb-1'>{e.fromLeg} to</div>}
					{props.trans && <div className='pb-1'>{e.toLeg}</div>}
				</div>
			))}
		</>
	);
}

export default AnimationsNeeded;
