import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { Vector3 } from "three";
import useMediaController from "./useMediaController";
import useFollowCam from "./useFollowCam";

export default function ComboMakerModel({ ...props }) {
	const group = useRef();
	const hipsRef = useRef();
	const { nodes, materials, animations } = useGLTF(
		"https://torquetricking.com/3d/KerwoodComboMaker.glb"
	);
	const { actions, names, mixer } = useAnimations(animations, group);
	useFollowCam(hipsRef);

	let anims = props.trick;
	let num = 0;
	let testArr = ["Wrapfull", "Doublecork", "Aerial", "Doublecork"];

	function playActions(i) {
		num = i;
		if (num === anims.length) {
			console.log("TooLong");
			// mixer.stopAllAction();
			num = 0;
			return num;
		}
		mixer.stopAllAction();
		actions[anims[i]]?.setLoop(THREE.LoopOnce, 1);
		actions[anims[i]].play();
		num++;
		// actions["Doublecork"].crossFadeFrom(actions["Btwist"], 20).play();
		return num;
	}
	mixer.addEventListener("finished", (e) => {
		console.log("Finished Playing", e);
		mixer.stopAllAction();
		playActions(num);
	});
	useEffect(() => {
		console.log(num);
	}, [num]);
	useEffect(() => {
		if (names.includes(props.trick[0])) {
			console.log("Names Includes", props.trick);
			playActions(0);
		} else {
			mixer.stopAllAction();
			// actions["Aerial"].play();
		}
	}, [props.trick, "finished"]);

	return (
		<group ref={group} {...props} dispose={null}>
			<group scale={0.01}>
				<group
					ref={hipsRef}
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
