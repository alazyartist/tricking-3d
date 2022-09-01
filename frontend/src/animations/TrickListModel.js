import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { Vector3 } from "three";

export default function TrickListModel({ ...props }) {
	const group = useRef();
	const hipsRef = useRef();
	const { nodes, materials, animations } = useGLTF("/Kerwood40.glb");
	const { actions, names, mixer } = useAnimations(animations, group);

	//Use Store
	const aI = useStore((s) => s.aI);
	const bounce = useStore((s) => s.bounce);
	let currentAnim = "";
	let isFollowCam = true;
	useEffect(() => {
		if (names.includes(props.trick)) {
			console.log("Names Includes", props.trick, "AnimName=", currentAnim);
			mixer.stopAllAction();
			actions[props.trick].play();
		} else {
			mixer.stopAllAction();
			actions["Aerial"].play();
		}
	}, [props.trick]);
	const camera = useThree((state) => state.camera);
	console.log(hipsRef.current?.position);
	let vec2 = new Vector3(0, 0, 0);
	useFrame(({ camera }) => {
		let pos;
		pos = hipsRef.current.position;
		let { x, y, z } = pos;
		let quat = hipsRef.current.quaternion;
		let posArr = [x, y, z];
		posArr = posArr.map((p) => p * 0.01);
		let vec = new Vector3(posArr[0], 0.5, posArr[2]);

		camera.quaternion.set(quat, 0.1);
		// console.log(vec);
		camera.lookAt(vec, 1);
		camera.updateProjectionMatrix();
	});

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

	return (
		<group ref={group} {...props} dispose={null}>
			<group scale={0.01}>
				<group
					name='Kerwood_LOD'
					position={[0, 99.67, 0.21]}
					rotation={[1.68, 0, 0]}>
					<primitive ref={hipsRef} object={nodes.CC_Base_Pelvis} />
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

useGLTF.preload("/Kerwood40.glb");
