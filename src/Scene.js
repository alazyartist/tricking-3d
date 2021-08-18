import React from "react";
import "./App.css";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
} from "@react-three/drei";
import TorqueLogo from "./TorqueLogo";
// import { Fred } from "./AnimatingTest";
import { Fred2 } from "./AnimatingTestIdle.js";
import { useStore } from "./store";

export function TorqueScene(props) {
	const modelSelector = useStore((state) => state.modelValue);
	//Scene Logic -- Switch Models to render: Fred or Torque Logo
	if (modelSelector) {
		return (
			<PerspectiveCamera>
				{/* <Fred position={[-1, 0, 0]} rotation={[0, 20, 0]} /> */}
				<Fred2 />

				<ambientLight intensity={0.2} />
				<spotLight intensity={4} position={[0, -3, -3]} />
				<Environment preset='park' />
				<OrbitControls />
			</PerspectiveCamera>
		);
	} else {
		return (
			<PerspectiveCamera position={[0, 0, 1]}>
				<TorqueLogo model={props.model} scale={2} />
				<ambientLight intensity={1} />
				<spotLight position={[0, -3, -3]} />
				<Environment preset='park' />
				<OrbitControls />
			</PerspectiveCamera>
		);
	}
}
