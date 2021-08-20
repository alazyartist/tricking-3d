import React from "react";
import "./App.css";
import { useStore } from "./store";

export default function AnimationSelectorButton(props) {
	// //AnimationSelector Button Return
	const arr = useStore((state) => state.animationsArray);
	const animationAi = useStore((state) => state.aI);
	const animationSwitch = useStore((state) => state.animationSelector);
	const playSwitch = useStore((state) => state.setIsPlaying);
	const currentAnimation = useStore(
		(state) => state.animationsArray[animationAi]
	);
	console.log(".....Selector.....");
	console.log(arr);
	console.log("..................");
	return (
		<div>
			<button className='Btn an1' onClick={playSwitch}>
				{currentAnimation}
			</button>

			<button className='Btn an2' onClick={animationSwitch}>
				{animationAi + 1}
			</button>
		</div>
	);
}
