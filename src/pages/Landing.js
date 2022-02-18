import React from "react";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
} from "@react-three/drei";
import TorqueLogo from "../components/TorqueLogo";
import { useStore } from "../store/store";

function Landing(props) {
	return (
		<div>
			<PerspectiveCamera position={[0, -2, 1]}>
				<TorqueLogo model={props.model} scale={2} />
				<ambientLight intensity={1} />
				<spotLight position={[0, -3, -3]} />
				<Environment preset='park' />
				<OrbitControls />
			</PerspectiveCamera>
		</div>
	);
}
export default Landing;
