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
				className='m-2.5 rounded-xl bg-[whitesmoke] p-3 hover:scale-105 hover:bg-[gainsboro]'
				onClick={playSwitch}>
				{animationAi + 1}
			</button>

			<button
				className='m-2.5 rounded-xl bg-[whitesmoke] p-3 hover:scale-105 hover:bg-[gainsboro]'
				onClick={animationSwitch}>
				{"Next Anim"}
			</button>
		</div>
	);
}
