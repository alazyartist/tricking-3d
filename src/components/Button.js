import React from "react";
import { useStore } from "../store/store";
//TODO: Change button into a Media player
//TODO: Add timescale slider
export default function Button() {
	const setIsPaused = useStore((state) => state.setIsPaused);
	const isPaused = useStore((state) => state.isPaused);

	return (
		<button
			className='rounded-xl bg-[whitesmoke] relative hover:bg-[gainsboro] hover:scale-105'
			onClick={setIsPaused}>
			{!isPaused ? "pause" : "play"}
		</button>
	);
}
