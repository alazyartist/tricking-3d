import React, { useRef, useEffect, useMemo } from "react";
import {
  GroupProps,
  PrimitiveProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useStore } from "../store/store";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { Vector3 } from "three";
import useMediaController from "hooks/useMediaController";
import useFollowCam from "hooks/useFollowCam";
import { MyGLTF } from "types/mythree";

export default function TrickListModel({ ...props }) {
  const group = useRef<GroupProps>();
  const hipsRef = useRef<PrimitiveProps>();
  const { nodes, materials, animations } = useGLTF("/Kerwood40.glb") as MyGLTF;
  //@ts-ignore
  const { actions, names, mixer } = useAnimations(animations, group);
  useMediaController(actions, names, mixer);
  useFollowCam(hipsRef);
  return (
    //@ts-ignore
    <group ref={group} {...props} dispose={null}>
      <group scale={0.01}>
        <group
          name="Kerwood_LOD"
          position={[0, 99.67, 0.21]}
          rotation={[1.68, 0, 0]}
        >
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

// useGLTF.preload("/Kerwood40.glb");
