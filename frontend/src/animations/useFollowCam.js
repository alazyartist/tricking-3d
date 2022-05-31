import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { Vector3 } from "three";
import { useStore } from "../store/store";

function useFollowCam(hipsRef) {
	const isFollowCam = useStore((s) => s.isFollowCam);
	useFrame(({ camera }) => {
		let { x, y, z } = hipsRef.current.position;
		let quat = hipsRef.current.quaternion;
		let posArr = [x, y, z];
		posArr = posArr.map((p) => p * 0.01);
		let vec = new Vector3(posArr[0], 0.5, posArr[1]);
		// console.log(camera);
		if (isFollowCam && hipsRef.current && camera) {
			camera.quaternion.set(quat, 0.1);
			camera.lookAt(vec, 1);
			camera.updateProjectionMatrix();
		}
	});
	return;
}

export default useFollowCam;
