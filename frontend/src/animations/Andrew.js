import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
// import Kerwood from "../data/AlexKerwood.gltf";

export default function Andrew({ ...props }) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(
		"https://torquetricking.com/3d/Andrew.glb"
	);
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
	const setSliderEnd = useStore((s) => s.setSliderEnd);
	const setSliderStart = useStore((s) => s.setSliderStart);
	const start = useStore((s) => s.start);
	const timescale = useStore((s) => s.timescale);
	const trimToggle = useStore((s) => s.trimToggle);
	const setCurrentAnim = useStore((s) => s.selectAnim);

	//Solves Problem with infinte renders of Animations Array and successfully passes to store
	useMemo(
		() =>
			Promise.resolve(names).then(
				(results) => setAnimationsArray(results),
				setCurrentAnim("Aerial GMS")
			),
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
			<group scale={0.01}>
				<group
					name='Andrew_no_beard'
					position={[0, 104.37, -0.07]}
					rotation={[1.68, 0, 0]}>
					<primitive object={nodes.CC_Base_Pelvis} />
					<primitive object={nodes.CC_Base_Waist} />
					<skinnedMesh
						frustumCulled={false}
						geometry={nodes.remesh_7_combined_Remeshed.geometry}
						material={materials.remesh_7_combined_Bake}
						skeleton={nodes.remesh_7_combined_Remeshed.skeleton}
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("https://torquetricking.com/3d/Andrew.glb");
