import React from "react";
import { useStore } from "./store";
//TODO: Change button into a Media player
//TODO: Add timescale slider
export default function Button() {
	const setIsPaused = useStore((state) => state.setIsPaused);
	const isPaused = useStore((state) => state.isPaused);

	return (
		<button
			className='p-3 m-2.5 rounded-xl bg-[whitesmoke] relative hover:bg-[gainsboro] hover:scale-105'
			onClick={setIsPaused}>
			{!isPaused ? "pause" : "play"}
		</button>
	);
}
