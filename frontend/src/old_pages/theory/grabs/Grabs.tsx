import VariationGrid from "@components/d3/VariationsGrid";
import { trpc } from "@utils/trpc";
import React from "react";
import { grabs } from "../../../data/trickDataModel/TrickObjects";
import { GrabsChart } from "./components/GrabsChart";

function Grabs() {
  const { data: grabs } = trpc.trick.getVariations.useQuery({ type: "grab" });
  return (
    <div className="text-zinc-300">
      <div className="py-2 text-2xl text-zinc-300">Grabs</div>
      {/* {grabs?.map((grab) => (
        <div key={grab.id} className="flex">
          <div className="pr-4">{grab.name}</div>
        </div> */}
      {/* ))} */}
      <VariationGrid data={grabs} />
      {/* <GrabsChart className="h-fit w-[320px] md:w-[480px]" /> */}
      {/* {Object.keys(grabs).map((e, i) => (
				<div className='flex' id={i}>
					<div className='pr-4'>{`${e}:`}</div>
					<div>{grabs[e]}</div>
				</div>
			))} */}
    </div>
  );
}

export default Grabs;
