import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import useFollowCam from "../hooks/useFollowCam";
import useMediaController from "../hooks/useMediaController";

export default function Kerwood40({ ...props }) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF("/Kerwood.glb");
	const { actions, names, mixer } = useAnimations(animations, group);
	const hipsRef = useRef();
	useMediaController(actions, names, mixer);
	useFollowCam(hipsRef);
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
						ref={hipsRef}
						frustumCulled={false}
						geometry={nodes.remesh_6_combined_Remeshed.geometry}
						material={materials.remesh_6_combined_Bake}
						skeleton={nodes.remesh_6_combined_Remeshed.skeleton}
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("https://torquetricking.com/3d/Kerwood40.glb");
