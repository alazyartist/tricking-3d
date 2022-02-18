import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorqueScene } from "../scenes/Scene";
import Loader from "../components/Loader";

function CanvasComponent() {
	return (
		<>
			<Canvas className='resize-detail min-h-[300px] min-w-[100px] resize-y md:min-h-screen md:resize-x'>
				<Suspense fallback={<Loader />}>
					<TorqueScene />
				</Suspense>
			</Canvas>
		</>
	);
}

export default CanvasComponent;
