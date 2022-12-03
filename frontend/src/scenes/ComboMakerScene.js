import React, { Suspense, useRef } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import ModelLoader from "../components/loaders/ModelLoader";
import ComboMakerModel from "../models/ComboMakerModel";

export function ComboMakerScene(props) {
  const light = useRef();
  const light2 = useRef();
  // useHelper(light2, SpotLightHelper, "red");
  // useHelper(light, SpotLightHelper, "cyan");
  return (
    <>
      {/* <PerspectiveCamera position={[-2, -1.25, 2.3]}> */}
      <Suspense fallback={<ModelLoader />}>
        <ComboMakerModel trick={props.trick} />
      </Suspense>
      <Html position={[2, 2, 0]}>{props.trick}</Html>
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
      <OrbitControls />
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
