import React from "react";
import { rotations } from "../../data/TricklistClass";
function Rotations() {
	return (
		<>
			<div className='text-zinc-300'>Rotations</div>
			<div className='text-zinc-300'>{rotations.half}</div>
			<div className='text-zinc-300'>{rotations.full}</div>
			<div className='text-zinc-300'>{rotations["1.5"]}</div>
			<div className='text-zinc-300'>{rotations.double}</div>
			<div className='text-zinc-300'>{rotations["2.5"]}</div>
			<div className='text-zinc-300'>{rotations.triple}</div>
			<div className='text-zinc-300'>{rotations["3.5"]}</div>
			<div className='text-zinc-300'>{rotations.quad}</div>
		</>
	);
}

export default Rotations;
