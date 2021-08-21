import React from "react";
import "./App.css";
import { useStore } from "./store";

export default function Button() {
	const setIsPaused = useStore((state) => state.setIsPaused);
	const isPaused = useStore((state) => state.isPaused);

	return (
		<button className='Btn' onClick={setIsPaused}>
			{!isPaused ? "pause" : "play"}
		</button>
	);
}
