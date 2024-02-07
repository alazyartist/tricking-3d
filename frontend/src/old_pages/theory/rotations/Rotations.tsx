import VariationGrid from "@components/d3/VariationsGrid";
import { trpc } from "@utils/trpc";
import React from "react";
import { rotations } from "../../../data/trickDataModel/TrickObjects";
import { RotationsChart } from "./components/RotationsChart";
function Rotations() {
  const { data: rotationVariations } = trpc.trick.getVariations.useQuery({
    type: "rotation",
  });
  return (
    <div className="pb-14 text-zinc-300">
      <div className="py-2 text-2xl text-zinc-300">Rotations</div>
      <VariationGrid data={rotationVariations} />
      {/* <RotationsChart className="h-fit w-[320px] md:w-[480px]" /> */}
      <div className=" w-full text-center text-xl font-bold">
        Unified Twisting
      </div>
      <div className="grid w-full grid-cols-2 place-content-center gap-2">
        {Object.keys(rotations).map((e, i) => (
          <>
            <div
              key={`${i}1`}
              className="place-self-end rounded-md bg-zinc-700 bg-opacity-40 p-2"
            >{`${e}:`}</div>
            <div
              key={`${i}2`}
              className="min-w-[40px] place-self-start rounded-md bg-zinc-700 bg-opacity-40 p-2 text-center"
            >
              {rotations[e]}
            </div>
          </>
        ))}
      </div>
      <div className="text-xl font-bold">Separated Twisting</div>
      <div>Early Twisting</div>
      <div>Late Twisting</div>
      <div>Pseudo Twisting</div>
    </div>
  );
}

export default Rotations;
