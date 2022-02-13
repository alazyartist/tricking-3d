import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { TrickInformation } from "../data/TrickInfoJson";

export default function TrickInfo() {
	const animationsArray = useStore((state) => state.animationsArray);
	const aI = useStore((state) => state.aI);

	return (
		<div className='m-4 grid grid-flow-row gap-2 place-content-start justify-items-start text-black align-middle '>
			<h2 className='text-xxl font-mono '>{animationsArray[aI]}</h2>
			<p className='text-base font-mono'>
				{TrickInformation[animationsArray[aI]]?.toString()}
			</p>
		</div>
	);
}
