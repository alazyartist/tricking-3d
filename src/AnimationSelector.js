import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { useStore } from "./store";

export default function AnimationSelectorButton(props) {
	// const [index, setIndex] = useState(props.index);
	// const [trickCount, setTrickCount] = useState(props.trickCount);
	// const [currentAnimation, setCurrentAnimation] = useState(
	// 	props.currentAnimation
	// );
	// const [animationArray, setAnimationArray] = useState(props.animationArray);
	// //Consle.Log PROPS
	// console.log(props);

	// //AnimationsArr[Index] Switch
	// const switchIndex = () => {
	// 	setIndex(index + 1);

	// 	if (index === props.trickCount) {
	// 		setIndex(0);
	// 	}
	// };
	// // Stop Animation function
	// const stopAnimation = (props) => {
	// 	props.currentAnimation.stop();
	// };
	// //UseEffect Functions
	// useEffect(() => {
	// 	setCurrentAnimation(props.animationArray);
	// }, [props.animationArray, animationArray, props]);
	// useEffect(() => {
	// 	setCurrentAnimation(currentAnimation);
	// }, [props.currentAnimation, currentAnimation, props]);
	// useEffect(() => {
	// 	props.handleIndex(index);
	// }, [props.handleIndex, index, props]);
	// useEffect(() => {
	// 	setTrickCount(props.trickCounter);
	// }, [props.handleTrickCount, trickCount, props]);

	// //AnimationSelector Button Return
	const arr = useStore((state) => state.animationsArray);
	const animationAi = useStore((state) => state.aI);
	const currentAnimation = useStore((state) => arr[animationAi]);
	const animationSwitch = useStore((state) => state.animationSelector);
	console.log(animationSwitch);
	console.log("arr " + arr.length);
	return (
		<div>
			<button
				className='Btn an1'
				onClick={(props) => {
					// switchIndex();
					console.log("button = " + currentAnimation);
				}}>
				{currentAnimation}
			</button>

			<button className='Btn an2' onClick={animationSwitch}>
				{animationAi + 1}
			</button>
		</div>
	);
}
