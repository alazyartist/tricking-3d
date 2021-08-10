import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useState } from "react";
import { TorqueScene } from "./Scene";
import Button from "./Button";
import ModelSelector from "./ModelSelector";
// import Model from './TorqueLogo';
// import {OrbitControls,Environment,PerspectiveCamera} from '@react-three/drei';
import { useStore } from "./store";
import AnimationSelectorButton from "./AnimationSelector";

export function Home(props) {
	console.log("store start");
	console.log(useStore((state) => state.animationsArray));
	console.log("store end");
	//Initializing state of all props
	const [isPlaying, setIsPlaying] = useState(false);
	const [model, setModel] = useState(false);
	const [index, setIndex] = useState(0);
	const [trickCount, setTrickCount] = useState(1);
	const [currentAnimation, setCurrentAnimation] = useState(
		props.animationArray
	);
	const [animationArray, setAnimationArray] = useState();
	//Callback Functions
	const _setAnimationArray = useCallback((value) => {
		setAnimationArray(value);
	});
	const _setCurrentAnimation = useCallback(
		(value) => {
			setCurrentAnimation(value);
		},
		[setCurrentAnimation]
	);
	const _setTrickCount = useCallback(
		(value) => {
			setTrickCount(value);
			console.log("Trick Count: " + trickCount);
		},
		[setTrickCount]
	);
	const _setIndex = useCallback(
		(value) => {
			setIndex(value);
		},
		[setIndex]
	);

	const _setIsPlaying = useCallback(
		(value) => {
			setIsPlaying(value);
		},
		[setIsPlaying]
	);
	const _setModel = useCallback(
		(value) => {
			setModel(value);
		},
		[setModel]
	);
	//Console.log animations
	// console.log("Home =" + currentAnimation);
	// console.log(animationArray);

	//General Design Handled Here
	return (
		<div className='App'>
			<div className='App-header'>
				<div className='Canvas-container'>
					<Canvas>
						<Suspense fallback={null}>
							<TorqueScene
								handleAnimationArrray={_setAnimationArray}
								animationArray={animationArray}
								handleCurrentAnimation={_setCurrentAnimation}
								currentAnimation={currentAnimation}
								model={model}
								playing={isPlaying}
								index={index}
								trickCount={trickCount}
								handleTrickCount={_setTrickCount}
							/>
						</Suspense>
					</Canvas>
				</div>
				<h1>An Interactive 3d Learning Experience</h1>
				<div className='btn-container'>
					<AnimationSelectorButton
						handleAnimationArrray={_setAnimationArray}
						animationArray={animationArray}
						handleCurrentAnimation={_setCurrentAnimation}
						currentAnimation={currentAnimation}
						index={index}
						trickCount={trickCount}
						handleTrickCount={_setTrickCount}
						handleIndex={_setIndex}
					/>
					<ModelSelector model={model} handleModel={_setModel} />
					<Button isPlaying={isPlaying} handlePlaying={_setIsPlaying} />
				</div>
				<a
					className='App-link'
					href='https://torquetricking.com'
					target='_blank'
					rel='noopener noreferrer'>
					Powered By Torque
				</a>
			</div>
		</div>
	);
}
