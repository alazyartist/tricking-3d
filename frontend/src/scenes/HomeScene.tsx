import React, { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import ModelLoader from "../components/loaders/ModelLoader";
import LoadActiveModel from "../components/media/ModelSelector";
import SceneBackground from "./SceneBackground";
export function HomeScene(props) {
  return (
    // @ts-ignore
    <PerspectiveCamera position={[-1, -1, 2]}>
      <Suspense fallback={<ModelLoader />}>
        <LoadActiveModel />
      </Suspense>
      <SceneBackground />
      {/* <Model /> */}
      <ambientLight intensity={0.3} />
      <spotLight color={"whitesmoke"} intensity={0.4} position={[0, 2, 5]} />
      <spotLight color={"whitesmoke"} intensity={0.04} position={[0, 2, -5]} />
      {/* <Environment preset='park' /> */}
      {/* <OrbitControls /> */}
      {/* <gridHelper args={[10, 10, `black`, `gainsboro`]} position={[0, 0, 0]} /> */}
    </PerspectiveCamera>
  );
}
