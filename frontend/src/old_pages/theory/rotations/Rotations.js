import React from "react";
import { rotations } from "../../../data/trickDataModel/TrickObjects";
import { RotationsChart } from "./components/RotationsChart";
function Rotations() {
  return (
    <div className="text-zinc-300">
      <div className="py-2 text-2xl text-zinc-300">Rotations</div>

      <RotationsChart className="h-fit w-[480px]" />
      <div className="text-xl font-bold">Unified Twisting</div>
      {/* {Object.keys(rotations).map((e, i) => (
				<div className='flex' id={i}>
					<div className='pr-4'>{`${e}:`}</div>
					<div>{rotations[e]}</div>
				</div>
			))} */}
      <div className="text-xl font-bold">Separated Twisting</div>
      <div>Early Twisting</div>
      <div>Late Twisting</div>
      <div>Pseudo Twisting</div>
    </div>
  );
}

export default Rotations;
