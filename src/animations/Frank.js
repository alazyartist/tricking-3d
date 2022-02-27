/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import FrankAnim from "../data/Frank-SA.gltf";
import AnimsForFrank from "../data/Frank.gltf";

export function Frank({ ...props }) {
	const group = useRef();
	const { nodes, materials } = useGLTF(FrankAnim);
	const { animations } = useGLTF(AnimsForFrank);
	const { actions, names, mixer } = useAnimations(animations, group);

	//Use Store
	const aI = useStore((s) => s.aI);
	const bounce = useStore((s) => s.bounce);
	const currentAnim = useStore((s) => s.currentAnim);
	const end = useStore((s) => s.end);
	const isPaused = useStore((s) => s.isPaused);
	const isPlaying = useStore((s) => s.isPlaying);
	const loop = useStore((s) => s.loop);
	const setAnimationsArray = useStore((s) => s.updateAnimationArray);
	const setClipDuration = useStore((s) => s.setClipDuration);
	const setCurrentTime = useStore((s) => s.setCurrentTime);
	const start = useStore((s) => s.start);
	const timescale = useStore((s) => s.timescale);
	const trimToggle = useStore((s) => s.trimToggle);

	//Solves Problem with infinte renders of Animations Array and successfully passes to store
	useMemo(
		() => Promise.resolve(names).then((results) => setAnimationsArray(results)),
		[names, setAnimationsArray]
	);

	// Handle Animation Loop
	//bounce uE
	useEffect(() => {
		bounce
			? actions[currentAnim].setLoop(THREE.LoopPingPong)
			: actions[currentAnim].setLoop(THREE.LoopRepeat);
	}, [bounce, aI, actions, names, mixer, currentAnim]);

	//loop uE
	useEffect(() => {
		loop
			? actions[currentAnim].setLoop(THREE.LoopRepeat)
			: actions[currentAnim].setLoop(THREE.LoopOnce);
	}, [loop, aI, actions, names, mixer, currentAnim]);

	//Timescale (SlowMo, FullSpeed, Timeslider) uE
	useEffect(() => {
		actions[currentAnim].timeScale = timescale;
	}, [timescale, actions, mixer, currentAnim]);

	// Play Pause uE
	useEffect(() => {
		isPaused
			? (actions[currentAnim].timeScale = 0)
			: (actions[currentAnim].timeScale = timescale);
	}, [timescale, isPaused, aI, actions, names, currentAnim]);

	// Set Play Start uE
	useEffect(() => {
		isPlaying ? actions[currentAnim].play() : actions[currentAnim].play();
	}, [isPlaying, aI, actions, names, mixer, currentAnim, start, end]);

  // @TODO: Pull calculations out of useFrame()
  // Apply Clip Duration
	useFrame(() => {
		if (!trimToggle) {
			const duration = parseFloat(
				actions[currentAnim].getClip().duration.toFixed(2)
			);
			let startHere = parseFloat((start * duration).toFixed(2));
			let endHere = parseFloat((end * duration).toFixed(2));
			let current = parseFloat(actions[currentAnim].time);

			if (current.toFixed(1) >= endHere.toFixed(1)) {
				actions[currentAnim].time = startHere;
			}
		}
		setCurrentTime(actions[currentAnim].time);
		setClipDuration(actions[currentAnim].getClip().duration);
	});

	//Resets Animations Player on Change of CurrentAnim
	useEffect(() => {
		mixer.stopAllAction();
		actions[currentAnim].play();
	}, [currentAnim]);

	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
				<primitive object={nodes.mixamorig1Hips} />
				<skinnedMesh
					frustumCulled={false}
					geometry={nodes.Skin.geometry}
					material={materials.Ch36_Body}
					skeleton={nodes.Skin.skeleton}
				/>
			</group>
		</group>
	);
}

useGLTF.preload(FrankAnim);
useGLTF.preload(AnimsForFrank);
