import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import useMediaController from "../hooks/useMediaController";
import useFollowCam from "../hooks/useFollowCam";
// import Kerwood from "../data/AlexKerwood.gltf";

export default function Andrew({ ...props }) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF("/Andrew.glb");
	const { actions, names, mixer } = useAnimations(animations, group);
	const hipsRef = useRef();
	useMediaController(actions, names, mixer);
	useFollowCam(hipsRef);
	return (
		<group ref={group} {...props} dispose={null}>
			<group scale={0.01}>
				<group
					ref={hipsRef}
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

// useGLTF.preload("/Andrew.glb");
