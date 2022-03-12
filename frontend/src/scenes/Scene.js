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
import { SpotLightHelper } from "three";
import Loader from "../components/Loader";
import ModelLoader from "../components/ModelLoader";
import LoadActiveModel from "../components/ModelSelector";
import SceneBackground from "../animations/SceneBackground";
// import Model from "../animations/KerwoodCC3Tpose";
export function TorqueScene(props) {
	const light = useRef();
	const light2 = useRef();
	// useHelper(light2, SpotLightHelper, "red");
	// useHelper(light, SpotLightHelper, "cyan");
	return (
		<PerspectiveCamera position={[0, -2, 0]}>
			<Suspense fallback={<ModelLoader />}>
				<LoadActiveModel />
			</Suspense>
			<SceneBackground />
			{/* <Model /> */}
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
			<GizmoHelper alignment={"bottom-left"}>
				<GizmoViewport
					axisColors={["red", "green", "blue"]}
					labelColor='gainsboro'
				/>
			</GizmoHelper>
		</PerspectiveCamera>
	);
}
