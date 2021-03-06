import React from "react";
import { rotations } from "../../../data/trickDataModel/TrickObjects";
import { RotationsChart } from "./components/RotationsChart";
function Rotations() {
	return (
		<div className='text-zinc-300'>
			<RotationsChart className='h-[20vh] w-[80vw]' />
			<div className='text-zinc-300'>Rotations</div>
			<div className='text-xl font-bold'>Unified Twisting</div>
			{/* {Object.keys(rotations).map((e, i) => (
				<div className='flex' id={i}>
					<div className='pr-4'>{`${e}:`}</div>
					<div>{rotations[e]}</div>
				</div>
			))} */}
			<div className='text-xl font-bold'>Separated Twisting</div>
			<div>Early Twisting</div>
			<div>Late Twisting</div>
			<div>Pseudo Twisting</div>
		</div>
	);
}

export default Rotations;
