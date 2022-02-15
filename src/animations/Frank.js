/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useStore } from "../store/store";
import * as THREE from "three";

export function Frank({ ...props }) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF("/Frank.gltf");
	const { actions, names, mixer } = useAnimations(animations, group);

	//Use Store
	const aI = useStore((state) => state.aI);
	let isPlaying = useStore((state) => state.isPlaying);
	let isPaused = useStore((state) => state.isPaused);
	const setAnimationsArray = useStore((state) => state.updateAnimationArray);
	const timescale = useStore((state) => state.timescale);
	const loop = useStore((state) => state.loop);
	const bounce = useStore((state) => state.bounce);

	//Solves Problem with infinte renders of Animations Array and successfully passes to store
	useMemo(
		() => Promise.resolve(names).then((results) => setAnimationsArray(results)),
		[names, setAnimationsArray]
	);

	// Handle Animation Loop

	useEffect(() => {
		bounce
			? actions[names[aI]].setLoop(THREE.LoopPingPong)
			: actions[names[aI]].setLoop(THREE.LoopRepeat);
	}, [bounce, aI, actions, names, mixer]);
	useEffect(() => {
		loop
			? actions[names[aI]].setLoop(THREE.LoopRepeat)
			: actions[names[aI]].setLoop(THREE.LoopOnce);
	}, [loop, aI, actions, names, mixer]);
	useEffect(() => {
		actions[names[aI]].timeScale = timescale;
	}, [timescale, aI, actions, names, mixer]);
	useEffect(() => {
		mixer.stopAllAction();
		isPlaying ? actions[names[aI]].play() : actions[names[aI]].reset();
	}, [isPlaying, aI, actions, names, mixer]);
	useEffect(() => {
		isPaused
			? (actions[names[aI]].timeScale = 0)
			: (actions[names[aI]].timeScale = timescale);
	}, [timescale, isPaused, aI, actions, names]);

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

useGLTF.preload("/Frank.gltf");
