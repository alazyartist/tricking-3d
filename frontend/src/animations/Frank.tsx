import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrankFollowCam } from "../hooks/useFollowCam";
import useMediaController from "../hooks/useMediaController";
import { MyGLTF } from "types/mythree";

export function Frank({ ...props }) {
  const group = useRef();
  //HipsRef attached to skeletons Hips
  const hipsRef = useRef();
  const { nodes, materials, animations } = useGLTF("/Frank2.glb") as MyGLTF;
  const { actions, names, mixer } = useAnimations(animations, group);

  useMediaController(actions, names, mixer);

  useFrankFollowCam(hipsRef);
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive ref={hipsRef} object={nodes.mixamorig1Hips} />
        <skinnedMesh
          // @ts-ignore
          frustumCulled={false}
          geometry={nodes.Skin.geometry}
          material={materials.Ch36_Body}
          skeleton={nodes.Skin.skeleton}
        />
      </group>
    </group>
  );
}

// useGLTF.preload("/Frank2.glb");

// FOLLOW CAMERA CODE 4 later
// let vecPos = new Vector3(
// 	posArr[0] + Math.PI * 2,
// 	posArr[2] + 2,
// 	posArr[1] + Math.PI * 2
// );
// camera.position.lerp(
// 	camera.position.set(vecPos.x, vecPos.y, vecPos.z),
// 	0.01
// );
