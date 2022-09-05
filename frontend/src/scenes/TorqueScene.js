import React, { Suspense, useEffect, useRef } from "react";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
	GizmoHelper,
	GizmoViewport,
	useHelper,
	Plane,
} from "@react-three/drei";
import Loader from "../components/loaders/Loader";
import ModelLoader from "../components/loaders/ModelLoader";
import LoadActiveModel from "../components/media/ModelSelector";
import { useStore } from "../store/store";
import { useFrame, useThree } from "@react-three/fiber";
import LoadActiveBackground from "../components/media/BackgroundSelector";
// import Model from "../animations/KerwoodCC3Tpose";
export function TorqueScene({ gizmoHelper }) {
	const light = useRef();
	const light2 = useRef();
	const gizmoRef = useRef();
	const isFollowCam = useStore((s) => s.isFollowCam);
	useEffect(() => {}, [isFollowCam]);
	// useHelper(light, SpotLightHelper, "cyan");
	return (
		<>
			<PerspectiveCamera ref={gizmoRef} position={[0, -1, 0]}>
				<Suspense fallback={<ModelLoader />}>
					<LoadActiveModel />
					<LoadActiveBackground />
				</Suspense>
				<ambientLight intensity={0.3} />
				<spotLight
					ref={light2}
					color={"whitesmoke"}
					intensity={0.4}
					position={[0, 2, 5]}
				/>
				<spotLight
					ref={light}
					color={"whitesmoke"}
					intensity={0.04}
					position={[0, 2, -5]}
				/>
				{/* <Environment preset='park' /> */}
				<OrbitControls />
				{/* <gridHelper args={[10, 10, `black`, `gainsboro`]} position={[0, 0, 0]} /> */}
				{gizmoHelper && (
					<GizmoHelper alignment={"bottom-left"} margin={[60, 220]}>
						<GizmoViewport
							axisColors={["red", "green", "blue"]}
							labelColor='gainsboro'
						/>
					</GizmoHelper>
				)}
			</PerspectiveCamera>
		</>
	);
}
