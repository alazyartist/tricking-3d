import React from "react";
import { Html, useProgress } from "@react-three/drei";

function ModelLoader() {
  const { progress, loaded, item, total } = useProgress();
  return (
    <Html
      className="absolute text-xl font-bold text-zinc-300 md:text-5xl"
      center
    >
      <div className="flex flex-col">
        {progress.toFixed(3)}%
        <div className="p-1 md:p-4">
          {/* TODO <TPose /> */}
          <div className="text-sm">Model Being Prepared</div>
          <br /> {loaded} of {total}
        </div>
        {/* <div className='text-xs'>{item}</div> */}
      </div>
    </Html>
  );
}

export default ModelLoader;
