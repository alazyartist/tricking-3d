import VariationGrid from "@components/d3/VariationsGrid";
import { trpc } from "@utils/trpc";
import React from "react";
import { touchdowns } from "../../../data/trickDataModel/TrickObjects";
import { TouchdownsChart } from "./components/TouchdownsChart";
function Touchdowns() {
  const { data: touchdowns } = trpc.trick.getVariations.useQuery({
    type: "touchdown",
  });
  return (
    <div className="flex flex-col place-items-center text-zinc-300">
      <div className="py-2 text-2xl text-zinc-300">Touchdowns</div>
      <VariationGrid data={touchdowns} />
      {/* <TouchdownsChart className="h-fit w-[320px] md:w-[480px]" /> */}
      {/* {Object.keys(touchdowns).map((e, i) => (
				<div className='flex ' id={i}>
					<div className='pr-4'>{`${e}:`}</div>
					<div>{touchdowns[e]}</div>
				</div>
			))} */}
    </div>
  );
}

export default Touchdowns;
