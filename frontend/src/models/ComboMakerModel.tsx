import React, { useRef, useEffect } from "react";
import { LoopOnce } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import useMediaController from "../hooks/useMediaController";
import useFollowCam from "../hooks/useFollowCam";
import { MyGLTF } from "types/mythree";
export default function ComboMakerModel({ ...props }) {
  const group = useRef();
  const hipsRef = useRef();
  const { nodes, materials, animations } = useGLTF("/Kerwood40.glb") as MyGLTF;
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

    actions[anims[i]].clampWhenFinished = true;
    actions[anims[i]]?.setLoop(LoopOnce, 1);
    actions[anims[i]].play();
    num++;
    // actions["Doublecork"].crossFadeFrom(actions["Btwist"], 20).play();
    return num;
  }
  mixer.addEventListener("finished", (e) => {
    console.log("Finished Playing", e);
    console.log(actions[anims[0]]);
    // mixer.stopAllAction();
    // playActions(num);
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
  }, [props.trick]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.01}>
        <group
          ref={hipsRef}
          name="Kerwood_LOD"
          position={[0, 99.67, 0.21]}
          rotation={[1.68, 0, 0]}
        >
          <primitive object={nodes.CC_Base_Pelvis} />
          <primitive object={nodes.CC_Base_Waist} />
          <skinnedMesh
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

// useGLTF.preload("/Kerwood40.glb");
