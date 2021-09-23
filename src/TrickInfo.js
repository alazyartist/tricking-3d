import React from "react";
import { useStore } from "./store";
import { TrickInformation } from "./TrickInfoJson";

export default function TrickInfo() {
	const animationsArray = useStore((state) => state.animationsArray);
	const aI = useStore((state) => state.aI);
	console.log(TrickInformation.Backflip.toString());
	return (
		<div>
			<h2>{animationsArray[aI]}</h2>
			<text>{TrickInformation[animationsArray[aI]]?.toString()}</text>
		</div>
	);
}
