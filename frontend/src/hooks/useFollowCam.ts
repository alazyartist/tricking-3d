import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { Vector3 } from "three";
import { useStore } from "../store/store";
//useFollow for CC_Skeletons
export default function useFollowCam(hipsRef) {
  const isFollowCam = useStore((s) => s.isFollowCam);
  useFrame(({ camera, invalidate, get }) => {
    get();
    let { x, y, z } = hipsRef.current.position;
    let quat = hipsRef.current.quaternion;
    let posArr = [x, y, z];
    posArr = posArr.map((p) => p * 0.01);
    let vec = new Vector3(posArr[0], 0.5, posArr[2]);
    if (isFollowCam && hipsRef.current && camera) {
      camera.quaternion.slerp(quat, 0.01);
      camera.lookAt(vec);
      camera.updateProjectionMatrix();
    }
  });
  return;
}

//Frank uses different Skeleton
export function useFrankFollowCam(hipsRef) {
  const isFollowCam = useStore((s) => s.isFollowCam);
  useFrame(({ camera }) => {
    let { x, y, z } = hipsRef.current.position;
    let quat = hipsRef.current.quaternion;
    let posArr = [x, y, z];
    posArr = posArr.map((p) => p * 0.01);
    let vec = new Vector3(posArr[0], 0.5, posArr[1]);
    // console.log(camera);
    if (isFollowCam && hipsRef.current && camera) {
      camera.quaternion.slerp(quat, 0.1);
      camera.lookAt(vec);
      camera.updateProjectionMatrix();
    }
  });
  return;
}
