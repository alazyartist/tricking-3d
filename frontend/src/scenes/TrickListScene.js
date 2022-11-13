import React, { Suspense, useEffect, useRef } from "react";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
	GizmoHelper,
	GizmoViewport,
	useHelper,
	Plane,
	Html,
} from "@react-three/drei";
import { SpotLightHelper } from "three";
import Loader from "../components/loaders/Loader";
import ModelLoader from "../components/loaders/ModelLoader";
import LoadActiveModel from "../components/media/ModelSelector";
import SceneBackground from "./SceneBackground";
import { Frank } from "../animations/Frank";
import TrickListModel from "../animations/TrickListModel";

// import Model from "../animations/KerwoodCC3Tpose";
function TrickListScene(props) {
	const light = useRef();
	const light2 = useRef();
	// useHelper(light2, SpotLightHelper, "red");
	// useHelper(light, SpotLightHelper, "cyan");
	return (
		<>
			{/* <PerspectiveCamera position={[-2, -1.25, 2.3]}> */}
			<Suspense fallback={<ModelLoader />}>
				<TrickListModel trick={props.trick} />
			</Suspense>
			<Html>{props.trick}</Html>
			{/* <SceneBackground /> */}
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
			<OrbitControls makeDefault />
			<gridHelper args={[10, 10, `black`, `gainsboro`]} position={[0, 0, 0]} />
			{/* <GizmoHelper alignment={"bottom-left"} margin={[60, 220]}>
				<GizmoViewport
					axisColors={["red", "green", "blue"]}
					labelColor='gainsboro'
				/>
			</GizmoHelper> */}
			{/* </PerspectiveCamera> */}
		</>
	);
}
export default TrickListScene;
