import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import TorqueScene from "@scenes/TorqueScene";
const LandingCanvas = () => {
  return (
    <Canvas className="h-full w-full rounded-md bg-zinc-900">
      <Suspense>
        <TorqueScene />
      </Suspense>
    </Canvas>
  );
};

export default LandingCanvas;
