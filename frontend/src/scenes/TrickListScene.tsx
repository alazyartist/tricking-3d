import React, { Suspense } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import ModelLoader from "../components/loaders/ModelLoader";
import TrickListModel from "../animations/TrickListModel";

function TrickListScene(props) {
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
      <spotLight color={"whitesmoke"} intensity={0.4} position={[0, 2, 5]} />
      <spotLight color={"whitesmoke"} intensity={0.04} position={[0, 2, -5]} />
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
