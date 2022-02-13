import React from "react";
import { useStore } from "../store/store";

export default function AnimationSelectorButton(props) {
	// //AnimationSelector Button Return
	const animationAi = useStore((state) => state.aI);
	const animationSwitch = useStore((state) => state.animationSelector);
	const playSwitch = useStore((state) => state.setIsPlaying);
	const currentAnimation = useStore(
		(state) => state.animationsArray[animationAi]
	);
	// console.log(
	// 	"animation selector " +
	// 		console.log(useStore((state) => state.animationsArray))
	// );
	return (
		<div>
			<button
				className='p-3 m-2.5 rounded-xl bg-[whitesmoke] relative hover:bg-[gainsboro] hover:scale-105'
				onClick={playSwitch}>
				{currentAnimation}
			</button>

			<button
				className='p-3 m-2.5 rounded-xl bg-[whitesmoke] relative hover:bg-[gainsboro] hover:scale-105'
				onClick={animationSwitch}>
				{animationAi + 1}
			</button>
		</div>
	);
}
