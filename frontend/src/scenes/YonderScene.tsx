import React, { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";

import ModelLoader from "../components/loaders/ModelLoader";

// import Model from "../animations/KerwoodCC3Tpose";
export function YonderScene(props) {
  // useHelper(light2, SpotLightHelper, "red");
  // useHelper(light, SpotLightHelper, "cyan");
  return (
    // @ts-ignore
    <PerspectiveCamera makeDefault={false} position={[-2, -1.25, 2.3]}>
      <Suspense fallback={<ModelLoader />}>{/* <YonderSwitches /> */}</Suspense>
      <Html>{props.trick}</Html>
      {/* <SceneBackground /> */}
      {/* <Model /> */}
      <ambientLight intensity={0.3} />
      <spotLight color={"whitesmoke"} intensity={0.4} position={[0, 2, 5]} />
      <spotLight color={"whitesmoke"} intensity={0.04} position={[0, 2, -5]} />
      {/* <Environment preset='park' /> */}
      <OrbitControls />
      <gridHelper args={[10, 10, `black`, `gainsboro`]} position={[0, 0, 0]} />
      {/* <GizmoHelper alignment={"bottom-left"} margin={[60, 220]}>
				<GizmoViewport
					axisColors={["red", "green", "blue"]}
					labelColor='gainsboro'
				/>
			</GizmoHelper> */}
    </PerspectiveCamera>
  );
}
