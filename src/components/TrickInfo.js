import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { TrickInformation } from "../data/TrickInfoJson";

export default function TrickInfo() {
	const animationsArray = useStore((state) => state.animationsArray);
	const aI = useStore((state) => state.aI);

	return (
		<div className='m-4 grid grid-flow-row place-content-start justify-items-start gap-2 align-middle text-slate-300 '>
			<h2 className='text-xxl font-mono '>{animationsArray[aI]}</h2>
			<p className='font-mono text-base'>
				{TrickInformation[animationsArray[aI]]?.toString()}
			</p>
		</div>
	);
}
