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
import Loader from "../components/loaders/Loader";
import ModelLoader from "../components/loaders/ModelLoader";
import LoadActiveModel from "../components/media/ModelSelector";
import SceneBackground from "./SceneBackground";
// import { Outlet } from "react-router-dom";
// import Model from "../animations/KerwoodCC3Tpose";
export function HomeScene(props) {
	const light = useRef();
	const light2 = useRef();
	// useHelper(light2, SpotLightHelper, "red");
	// useHelper(light, SpotLightHelper, "cyan");
	return (
		<PerspectiveCamera position={[-1, -1, 2]}>
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
			{/* <OrbitControls /> */}
			{/* <gridHelper args={[10, 10, `black`, `gainsboro`]} position={[0, 0, 0]} /> */}
		</PerspectiveCamera>
	);
}
