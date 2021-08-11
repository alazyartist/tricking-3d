import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
} from "@react-three/drei";
import TorqueLogo from "./TorqueLogo";
import { Fred } from "./AnimatingTest";
import { useStore } from "./store";

export function TorqueScene(props) {
	const modelSelector = useStore((state) => state.modelValue);
	// const [trickCount, setTrickCount] = useState(props.trickCount);
	// const [currentAnimation, setCurrentAnimation] = useState(
	// 	props.currentAnimation
	// );
	// const [animationArray, setAnimationArray] = useState(props.animationArray);
	// //UseEffects
	// useEffect(() => {
	// 	setAnimationArray(props.animationArray);
	// }, [props.animationArray, animationArray, props]);

	// useEffect(() => {
	// 	setCurrentAnimation(props.currentAnimation);
	// 	console.log("Scene =" + currentAnimation);
	// }, [props.currentAnimation, currentAnimation, props]);

	// useEffect(() => {
	// 	setTrickCount(props.trickCount);
	// }, [props.trickCount, trickCount, props]);

	// // CallBack Funtions

	// const _setAnimationArray = useCallback(
	// 	(value) => {
	// 		setAnimationArray(value);
	// 		console.log("Received arr");
	// 	},
	// 	[setAnimationArray]
	// );

	// const _setCurrentAnimation = useCallback(
	// 	(value) => {
	// 		setCurrentAnimation(value);
	// 	},
	// 	[setCurrentAnimation]
	// );

	// const _setTrickCount = useCallback(
	// 	(value) => {
	// 		setTrickCount(value);
	// 		console.log("Trick Count_scene: " + trickCount);
	// 	},
	// 	[setTrickCount]
	// );
	//Scene Logic -- Switch Models to render: Fred or Torque Logo
	if (modelSelector) {
		return (
			<PerspectiveCamera position={[0, -2, -1]}>
				<Fred
				// handleAnimationArray={_setAnimationArray}
				// currentAnimation={currentAnimation}
				// handleCurrentAnimation={_setCurrentAnimation}
				// handleTrickCount={_setTrickCount}
				// trickCount={trickCount}
				// index={props.index}
				// model={props.model}
				// playing={props.playing}
				// scale={3}
				/>
				<ambientLight intensity={1} />
				<spotLight position={[0, -3, -3]} />
				<Environment preset='park' />
				<OrbitControls />
			</PerspectiveCamera>
		);
	} else {
		return (
			<PerspectiveCamera position={[0, -2, -1]}>
				<TorqueLogo model={props.model} scale={2} />
				<ambientLight intensity={1} />
				<spotLight position={[0, -3, -3]} />
				<Environment preset='park' />
				<OrbitControls />
			</PerspectiveCamera>
		);
	}
}
