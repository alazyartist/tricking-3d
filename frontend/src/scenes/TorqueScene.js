import React, { Suspense, useEffect, useRef, useMemo } from "react";
import {
	OrbitControls,
	PerspectiveCamera,
	GizmoHelper,
	GizmoViewport,
} from "@react-three/drei";
import ModelLoader from "../components/loaders/ModelLoader";
import LoadActiveModel from "../components/media/ModelSelector";
import { useStore } from "../store/store";
import LoadActiveBackground from "../components/media/BackgroundSelector";
// import { useParams } from "react-router-dom";

export default function TorqueScene({ gizmoHelper }) {
	const { model, trick } = useParams();

	const setModel = useStore((s) => s.setModel);
	const setAnim = useStore((s) => s.selectAnim);

	useMemo(() => {
		model && setModel(model);
		trick && setAnim(trick);
	}, [model, trick]);

	const light = useRef();
	const light2 = useRef();
	const gizmoRef = useRef();
	const isFollowCam = useStore((s) => s.isFollowCam);
	useEffect(() => {}, [isFollowCam]);
	return (
		<>
			<PerspectiveCamera ref={gizmoRef} position={[0, -1, 0]}>
				<Suspense fallback={<ModelLoader />}>
					<LoadActiveModel />
				</Suspense>
				<Suspense fallback={<ModelLoader />}>
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
				<OrbitControls />
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
