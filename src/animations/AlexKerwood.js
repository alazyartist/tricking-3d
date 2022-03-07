import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import Kerwood from "../data/AlexKerwood.gltf";

export default function AlexKerwood({ ...props }) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(Kerwood);
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
				setCurrentAnim("Backflip")
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
					name='Alex_Kerwood_Animated'
					position={[0, 99.67, 0.21]}
					rotation={[1.68, 0, 0]}>
					<primitive object={nodes.CC_Base_Pelvis} />
					<primitive object={nodes.CC_Base_Waist} />
					<skinnedMesh
						geometry={nodes.CC_Base_Eye_1.geometry}
						material={materials.Std_Eye_R}
						skeleton={nodes.CC_Base_Eye_1.skeleton}
					/>
					<skinnedMesh
						geometry={nodes.CC_Base_Eye_2.geometry}
						material={materials.Std_Cornea_R}
						skeleton={nodes.CC_Base_Eye_2.skeleton}
					/>
					<skinnedMesh
						geometry={nodes.CC_Base_Eye_3.geometry}
						material={materials.Std_Eye_L}
						skeleton={nodes.CC_Base_Eye_3.skeleton}
					/>
					<skinnedMesh
						geometry={nodes.CC_Base_Eye_4.geometry}
						material={materials.Std_Cornea_L}
						skeleton={nodes.CC_Base_Eye_4.skeleton}
					/>
					<skinnedMesh
						geometry={nodes.CC_Base_Teeth_1.geometry}
						material={materials.Std_Upper_Teeth}
						skeleton={nodes.CC_Base_Teeth_1.skeleton}
					/>
					<skinnedMesh
						geometry={nodes.CC_Base_Teeth_2.geometry}
						material={materials.Std_Lower_Teeth}
						skeleton={nodes.CC_Base_Teeth_2.skeleton}
					/>
					<skinnedMesh
						geometry={nodes.Tank_Top.geometry}
						material={materials.Tank_top}
						skeleton={nodes.Tank_Top.skeleton}
					/>
					<skinnedMesh
						geometry={nodes.Warrior_trousers.geometry}
						material={materials.Warrior_trousers}
						skeleton={nodes.Warrior_trousers.skeleton}
					/>
					<skinnedMesh
						name='CC_Base_Body_1'
						geometry={nodes.CC_Base_Body_1.geometry}
						material={materials.Std_Skin_Head}
						skeleton={nodes.CC_Base_Body_1.skeleton}
						morphTargetDictionary={nodes.CC_Base_Body_1.morphTargetDictionary}
						morphTargetInfluences={nodes.CC_Base_Body_1.morphTargetInfluences}
					/>
					<skinnedMesh
						name='CC_Base_Body_2'
						geometry={nodes.CC_Base_Body_2.geometry}
						material={materials.Std_Skin_Body}
						skeleton={nodes.CC_Base_Body_2.skeleton}
						morphTargetDictionary={nodes.CC_Base_Body_2.morphTargetDictionary}
						morphTargetInfluences={nodes.CC_Base_Body_2.morphTargetInfluences}
					/>
					<skinnedMesh
						name='CC_Base_Body_3'
						geometry={nodes.CC_Base_Body_3.geometry}
						material={materials.Std_Skin_Arm}
						skeleton={nodes.CC_Base_Body_3.skeleton}
						morphTargetDictionary={nodes.CC_Base_Body_3.morphTargetDictionary}
						morphTargetInfluences={nodes.CC_Base_Body_3.morphTargetInfluences}
					/>
					<skinnedMesh
						name='CC_Base_Body_4'
						geometry={nodes.CC_Base_Body_4.geometry}
						material={materials.Std_Skin_Leg}
						skeleton={nodes.CC_Base_Body_4.skeleton}
						morphTargetDictionary={nodes.CC_Base_Body_4.morphTargetDictionary}
						morphTargetInfluences={nodes.CC_Base_Body_4.morphTargetInfluences}
					/>
					<skinnedMesh
						name='CC_Base_Body_5'
						geometry={nodes.CC_Base_Body_5.geometry}
						material={materials.Std_Nails}
						skeleton={nodes.CC_Base_Body_5.skeleton}
						morphTargetDictionary={nodes.CC_Base_Body_5.morphTargetDictionary}
						morphTargetInfluences={nodes.CC_Base_Body_5.morphTargetInfluences}
					/>
					<skinnedMesh
						name='CC_Base_Body_6'
						geometry={nodes.CC_Base_Body_6.geometry}
						material={materials.Std_Eyelash}
						skeleton={nodes.CC_Base_Body_6.skeleton}
						morphTargetDictionary={nodes.CC_Base_Body_6.morphTargetDictionary}
						morphTargetInfluences={nodes.CC_Base_Body_6.morphTargetInfluences}
					/>
					<skinnedMesh
						name='CC_Base_EyeOcclusion_1'
						geometry={nodes.CC_Base_EyeOcclusion_1.geometry}
						material={materials.Std_Eye_Occlusion_R}
						skeleton={nodes.CC_Base_EyeOcclusion_1.skeleton}
						morphTargetDictionary={
							nodes.CC_Base_EyeOcclusion_1.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.CC_Base_EyeOcclusion_1.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name='CC_Base_EyeOcclusion_2'
						geometry={nodes.CC_Base_EyeOcclusion_2.geometry}
						material={materials.Std_Eye_Occlusion_L}
						skeleton={nodes.CC_Base_EyeOcclusion_2.skeleton}
						morphTargetDictionary={
							nodes.CC_Base_EyeOcclusion_2.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.CC_Base_EyeOcclusion_2.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name='CC_Base_TearLine_1'
						geometry={nodes.CC_Base_TearLine_1.geometry}
						material={materials.Std_Tearline_R}
						skeleton={nodes.CC_Base_TearLine_1.skeleton}
						morphTargetDictionary={
							nodes.CC_Base_TearLine_1.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.CC_Base_TearLine_1.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name='CC_Base_TearLine_2'
						geometry={nodes.CC_Base_TearLine_2.geometry}
						material={materials.Std_Tearline_L}
						skeleton={nodes.CC_Base_TearLine_2.skeleton}
						morphTargetDictionary={
							nodes.CC_Base_TearLine_2.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.CC_Base_TearLine_2.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name='CC_Base_Tongue'
						geometry={nodes.CC_Base_Tongue.geometry}
						material={materials.Std_Tongue}
						skeleton={nodes.CC_Base_Tongue.skeleton}
						morphTargetDictionary={nodes.CC_Base_Tongue.morphTargetDictionary}
						morphTargetInfluences={nodes.CC_Base_Tongue.morphTargetInfluences}
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/AlexKerwood.gltf");
