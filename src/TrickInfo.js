import React, { useEffect } from "react";
import { useStore } from "./store";
import { TrickInformation } from "./TrickInfoJson";

export default function TrickInfo() {
	const animationsArray = useStore((state) => state.animationsArray);
	const aI = useStore((state) => state.aI);
	console.log(TrickInformation[animationsArray[aI]]);
	let activeAnim = animationsArray[aI];
	console.log(TrickInformation[animationsArray[aI]]?.toString());
	useEffect(() => {
		// animationsArray;
	});

	return (
		<div>
			<h2>{animationsArray[aI]}</h2>
			<text>{TrickInformation[animationsArray[aI]]?.toString()}</text>
		</div>
	);
}
