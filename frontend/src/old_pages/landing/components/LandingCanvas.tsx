import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import TorqueScene from "@scenes/TorqueScene";
const LandingCanvas = () => {
  return (
    <Canvas className="rounded-md bg-zinc-900 md:min-h-[400px]">
      <Suspense>
        <TorqueScene />
      </Suspense>
    </Canvas>
  );
};

export default LandingCanvas;
