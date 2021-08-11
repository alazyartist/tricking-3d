import React, { useEffect, useState } from "react";
import "./App.css";
import { useStore } from "./store";

export default function Button(props) {
	const isPlaying = useStore((state) => state.isPlaying);
	const setIsPlaying = useStore((state) => state.setIsPlaying);
	//Button logic for animation playing
	// const [isPlaying, setIsPlaying] = useState(props.isPlaying);
	// const toggle = () => {
	// 	setIsPlaying(!props.isPlaying);
	// 	console.log("isPlaying " + isPlaying);
	// };

	// //useEffect
	// useEffect(() => {
	// 	props.handlePlaying(isPlaying);
	// }, [props.handlePlaying, isPlaying, props]);
	//Play Pause Button
	return (
		<button className='Btn' onClick={setIsPlaying}>
			Play/Pause
		</button>
	);
}
