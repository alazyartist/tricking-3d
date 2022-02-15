import React, { useEffect, useRef } from "react";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
	GizmoHelper,
	GizmoViewport,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import TorqueLogo from "../components/TorqueLogo";
import { Frank } from "../animations/Frank.js";
import { useStore } from "../store/store";
export function TorqueScene(props) {
	const modelSelector = useStore((state) => state.modelValue);
	//Scene Logic -- Switch Models to render: Fred or Torque Logo

	if (modelSelector) {
		return (
			<PerspectiveCamera makeDefualt position={[0, -2, 0]}>
				<Frank />

				<ambientLight intensity={0.4} />
				<spotLight intensity={2} position={[0, -3, 3]} />
				<spotLight intensity={2} position={[0, 5, 5]} />
				<Environment preset='park' />
				<OrbitControls />
				<gridHelper args={[10, 10, `white`, `gray`]} position={[0, 0, 0]} />
				<GizmoHelper alignment={"bottom-left"}>
					<GizmoViewport
						axisColors={["red", "green", "blue"]}
						labelColor='white'
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
