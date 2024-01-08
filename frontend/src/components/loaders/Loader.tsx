import React from "react";

import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress, loaded, item, total } = useProgress();
  return (
    <Html
      className="text-bold absolute left-0 top-0 flex h-full w-full flex-col place-content-center place-items-center justify-between gap-2 text-2xl text-zinc-400 md:text-3xl"
      center
    >
      <div className="flex flex-col justify-center">
        {progress.toFixed(2)}%{/* <div className='text-xs'>{item}</div> */}
      </div>
      <div className="flex w-full justify-center whitespace-nowrap p-1 text-center text-xs md:p-4">
        Loading Assets:
        {loaded} of {total}
      </div>
    </Html>
  );
}

export default Loader;
