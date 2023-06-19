import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import useMediaController from "../hooks/useMediaController";
import useFollowCam from "../hooks/useFollowCam";
// import Kerwood from "../data/AlexKerwood.gltf";
import type { MyGLTF } from "types/mythree";

export default function AlexKerwood({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/AlexKerwood.gltf"
  ) as MyGLTF;
  const { actions, names, mixer } = useAnimations(animations, group);
  const hipsRef = useRef();
  useMediaController(actions, names, mixer);
  useFollowCam(hipsRef);
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.01}>
        <group
          name="Alex_Kerwood_Animated"
          position={[0, 99.67, 0.21]}
          rotation={[1.68, 0, 0]}
        >
          <primitive ref={hipsRef} object={nodes.CC_Base_Pelvis} />
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
            name="CC_Base_Body_1"
            geometry={nodes.CC_Base_Body_1.geometry}
            material={materials.Std_Skin_Head}
            skeleton={nodes.CC_Base_Body_1.skeleton}
            morphTargetDictionary={nodes.CC_Base_Body_1.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Body_1.morphTargetInfluences}
          />
          <skinnedMesh
            name="CC_Base_Body_2"
            geometry={nodes.CC_Base_Body_2.geometry}
            material={materials.Std_Skin_Body}
            skeleton={nodes.CC_Base_Body_2.skeleton}
            morphTargetDictionary={nodes.CC_Base_Body_2.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Body_2.morphTargetInfluences}
          />
          <skinnedMesh
            name="CC_Base_Body_3"
            geometry={nodes.CC_Base_Body_3.geometry}
            material={materials.Std_Skin_Arm}
            skeleton={nodes.CC_Base_Body_3.skeleton}
            morphTargetDictionary={nodes.CC_Base_Body_3.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Body_3.morphTargetInfluences}
          />
          <skinnedMesh
            name="CC_Base_Body_4"
            geometry={nodes.CC_Base_Body_4.geometry}
            material={materials.Std_Skin_Leg}
            skeleton={nodes.CC_Base_Body_4.skeleton}
            morphTargetDictionary={nodes.CC_Base_Body_4.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Body_4.morphTargetInfluences}
          />
          <skinnedMesh
            name="CC_Base_Body_5"
            geometry={nodes.CC_Base_Body_5.geometry}
            material={materials.Std_Nails}
            skeleton={nodes.CC_Base_Body_5.skeleton}
            morphTargetDictionary={nodes.CC_Base_Body_5.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Body_5.morphTargetInfluences}
          />
          <skinnedMesh
            name="CC_Base_Body_6"
            geometry={nodes.CC_Base_Body_6.geometry}
            material={materials.Std_Eyelash}
            skeleton={nodes.CC_Base_Body_6.skeleton}
            morphTargetDictionary={nodes.CC_Base_Body_6.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Body_6.morphTargetInfluences}
          />
          <skinnedMesh
            name="CC_Base_EyeOcclusion_1"
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
            name="CC_Base_EyeOcclusion_2"
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
            name="CC_Base_TearLine_1"
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
            name="CC_Base_TearLine_2"
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
            name="CC_Base_Tongue"
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

// useGLTF.preload("/AlexKerwood.gltf");
