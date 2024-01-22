import React from "react";
import { grabs } from "../../../data/trickDataModel/TrickObjects";
import { GrabsChart } from "./components/GrabsChart";

function Grabs() {
  return (
    <div className="text-zinc-300">
      <div className="py-2 text-2xl text-zinc-300">Grabs</div>

      <GrabsChart className="h-fit w-[320px] md:w-[480px]" />
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
