import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import { useGLTF, useAnimations, Html } from "@react-three/drei";

export default function TrickListModel({ ...props }) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(
		"https://torquetricking.com/3d/Kerwood40.glb"
	);
	const { actions, names, mixer } = useAnimations(animations, group);

	//Use Store
	const aI = useStore((s) => s.aI);
	const bounce = useStore((s) => s.bounce);
	let currentAnim = "";
	useEffect(() => {
		if (names.includes(props.trick)) {
			console.log("Names Includes", props.trick, currentAnim);
			mixer.stopAllAction();
			actions[props.trick].play();
		} else {
			mixer.stopAllAction();
			actions["Aerial"].play();
		}
	}, [props.trick]);

	const end = useStore((s) => s.end);
	const isPaused = useStore((s) => s.isPaused);
	const isPlaying = useStore((s) => s.isPlaying);
	const loop = useStore((s) => s.loop);
	const setAnimationsArray = useStore((s) => s.updateAnimationArray);
	const setClipDuration = useStore((s) => s.setClipDuration);
	const setCurrentTime = useStore((s) => s.setCurrentTime);
	const setSliderEnd = useStore((s) => s.setSliderEnd);
	const setSliderStart = useStore((s) => s.setSliderStart);
	const start = useStore((s) => s.start);
	const timescale = useStore((s) => s.timescale);
	const trimToggle = useStore((s) => s.trimToggle);
	const setCurrentAnim = useStore((s) => s.selectAnim);
	const activeModel = useStore((s) => s.activeModel);
	const isScrubbing = useStore((s) => s.isScrubbing);

	// Scrub
	// useEffect(() => {
	// 	if (isScrubbing > 0) {
	// 		const duration = actions[currentAnim].getClip().duration.toFixed(2);
	// 		actions[currentAnim].time =
	// 			isScrubbing === 1 ? duration * start : duration * end;
	// 	}
	// }, [isScrubbing, start, end, actions, currentAnim]);

	// //Solves Problem with infinte renders of Animations Array and successfully passes to store
	// useMemo(
	// 	() => Promise.resolve(names).then((results) => setAnimationsArray(results)),
	// 	[names, setAnimationsArray]
	// );

	// // Handle Animation Loop
	// //bounce uE
	// useEffect(() => {
	// 	bounce
	// 		? actions[currentAnim].setLoop(THREE.LoopPingPong)
	// 		: actions[currentAnim].setLoop(THREE.LoopRepeat);
	// }, [bounce, aI, actions, names, mixer, currentAnim]);

	// //loop uE
	// useEffect(() => {
	// 	loop
	// 		? actions[currentAnim].setLoop(THREE.LoopRepeat)
	// 		: actions[currentAnim].setLoop(THREE.LoopOnce);
	// }, [loop, aI, actions, names, mixer, currentAnim]);

	// //Timescale (SlowMo, FullSpeed, Timeslider) uE
	// useEffect(() => {
	// 	actions[currentAnim].timeScale = timescale;
	// }, [timescale, actions, mixer, currentAnim]);

	// // Play Pause uE
	// useEffect(() => {
	// 	isPaused
	// 		? (actions[currentAnim].timeScale = 0)
	// 		: (actions[currentAnim].timeScale = timescale);
	// }, [timescale, isPaused, aI, actions, names, currentAnim]);

	// // Set Play Start uE
	// useEffect(() => {
	// 	isPlaying ? actions[currentAnim].play() : actions[currentAnim].play();
	// }, [isPlaying, aI, actions, names, mixer, currentAnim, start, end]);

	// useFrame(() => {
	// 	if (!trimToggle) {
	// 		const duration = parseFloat(
	// 			actions[currentAnim].getClip().duration.toFixed(2)
	// 		);
	// 		let startHere = parseFloat((start * duration).toFixed(2));
	// 		let endHere = parseFloat((end * duration).toFixed(2));
	// 		let current = parseFloat(actions[currentAnim].time);

	// 		if (current.toFixed(1) >= endHere.toFixed(1)) {
	// 			actions[currentAnim].time = startHere;
	// 		}
	// 	}
	// 	setCurrentTime(actions[currentAnim].time);
	// 	setClipDuration(actions[currentAnim].getClip().duration);
	// });

	// //Resets Animations Player on Change of CurrentAnim
	useEffect(() => {
		mixer.stopAllAction();
		// actions[currentAnim].play();
	}, [currentAnim, activeModel]);
	return (
		<group ref={group} {...props} dispose={null}>
			<group scale={0.01}>
				<group
					name='Kerwood_LOD'
					position={[0, 99.67, 0.21]}
					rotation={[1.68, 0, 0]}>
					<primitive object={nodes.CC_Base_Pelvis} />
					<primitive object={nodes.CC_Base_Waist} />
					<skinnedMesh
						frustumCulled={false}
						geometry={nodes.remesh_6_combined_Remeshed.geometry}
						material={materials.remesh_6_combined_Bake}
						skeleton={nodes.remesh_6_combined_Remeshed.skeleton}
					/>
					<Html>{props.trick}</Html>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("https://torquetricking.com/3d/Kerwood40.glb");
