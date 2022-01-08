import React, { useEffect } from "react";
import { useStore } from "./store";
import { TrickInformation } from "./TrickInfoJson";

export default function TrickInfo() {
	const animationsArray = useStore((state) => state.animationsArray);
	const aI = useStore((state) => state.aI);

	return (
		<div>
			<h2>{animationsArray[aI]}</h2>
			<p>{TrickInformation[animationsArray[aI]]?.toString()}</p>
		</div>
	);
}
