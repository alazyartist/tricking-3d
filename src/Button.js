import React, { useEffect, useState } from "react";
import "./App.css";

export default function Button(props) {
	//Button logic for animation playing
	const [isPlaying, setIsPlaying] = useState(props.isPlaying);
	const toggle = () => {
		setIsPlaying(!props.isPlaying);
		console.log("isPlaying " + isPlaying);
	};

	//useEffect
	useEffect(() => {
		props.handlePlaying(isPlaying);
	}, [props.handlePlaying, isPlaying, props]);
	//Play Pause Button
	return (
		<button
			className='Btn'
			onClick={() => {
				toggle();
			}}>
			Play/Pause
		</button>
	);
}
