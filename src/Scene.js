import React, { useEffect, useRef } from "react";
import "./App.css";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
	GizmoHelper,
	GizmoViewport,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import TorqueLogo from "./TorqueLogo";
// import { Fred } from "./AnimatingTest";
import { Fred2 } from "./AnimatingTestIdle.js";
import { useStore } from "./store";
export function TorqueScene(props) {
	const modelSelector = useStore((state) => state.modelValue);
	//Scene Logic -- Switch Models to render: Fred or Torque Logo
	const camRef = useRef();
	const fredRef = useStore((state) => state.position);
	// useFrame(() => {
	// 	console.log("fredRef" + fredRef);
	// });
	// useFrame(() => camRef.current.lookAt(fredRef.current.position));
	if (modelSelector) {
		return (
			<PerspectiveCamera ref={camRef} makeDefualt position={[0, -2, 0]}>
				{/* <Fred position={[-1, 0, 0]} rotation={[0, 20, 0]} /> */}
				<Fred2 ref={fredRef} />

				<ambientLight intensity={0.8} />
				<spotLight intensity={3} position={[0, -3, -3]} />
				<spotLight intensity={2} position={[0, 5, 5]} />
				<Environment preset='park' />
				<OrbitControls />
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
