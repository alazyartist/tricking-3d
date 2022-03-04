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
import { useFrame } from "@react-three/fiber";
import TorqueLogo from "../components/TorqueLogo";
import { Frank } from "../animations/Frank.js";
import { useStore } from "../store/store";
import { SpotLightHelper } from "three";
import Loader from "../components/Loader";
import ModelLoader from "../components/ModelLoader";
import Kerwood from "../animations/AlexKerwood";
import Model from "../animations/CC3Test";
// import Model from "../animations/KerwoodCC3Tpose";
export function TorqueScene(props) {
	const modelSelector = useStore((state) => state.modelValue);
	//Scene Logic -- Switch Models to render: Fred or Torque Logo
	const light = useRef();
	const light2 = useRef();
	useHelper(light2, SpotLightHelper, "red");
	useHelper(light, SpotLightHelper, "cyan");
	if (modelSelector) {
		return (
			<PerspectiveCamera position={[0, -2, 0]}>
				<Suspense fallback={<ModelLoader />}>
					{/* <Frank /> */}
					<Model />
					{/* <Kerwood /> */}
				</Suspense>

				{/* <Model /> */}
				<ambientLight intensity={1.2} />
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
				<gridHelper
					args={[10, 10, `black`, `gainsboro`]}
					position={[0, 0, 0]}
				/>
				<GizmoHelper alignment={"bottom-left"}>
					<GizmoViewport
						axisColors={["red", "green", "blue"]}
						labelColor='gainsboro'
					/>
				</GizmoHelper>
			</PerspectiveCamera>
		);
	} else {
		return (
			<PerspectiveCamera position={[0, -2, 1]}>
				<TorqueLogo model={props.model} scale={2} />
				<ambientLight intensity={1} />
				<spotLight position={[0, -3, -3]} />
				<Environment preset='park' />
				<OrbitControls />
			</PerspectiveCamera>
		);
	}
}
