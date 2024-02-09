import { whichLeg } from "@old_pages/comboMaker/components/ArrayDisplay";
import { trpc } from "@utils/trpc";
import React, { useEffect, useRef } from "react";
import * as terms from "../../../data//Glossary.json";
import * as d3 from "d3";

const StancesV0 = () => {
  const { data: stances } = trpc.trick.findAllStances.useQuery();
  return (
    <>
      <div className="h-full w-[80vw] grid-cols-3 place-content-center place-items-center gap-2 rounded-xl bg-zinc-800 bg-opacity-70 text-zinc-300">
        <div>Stances</div>
        <StanceSvg stances={stances} />
        {/* <div className="flex h-full w-full flex-col place-content-center place-items-center gap-2">
          {stances?.map((stance) => (
            <div
              key={stance.stance_id}
              className={
                "w-fit min-w-[125px] rounded-md bg-zinc-600 bg-opacity-40 p-2"
              }
            >
              <div>{stance.name}</div>
              <div>{whichLeg(stance.leg)}</div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default StancesV0;

const StanceSvg = ({ stances }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const piGen = d3
      .pie()
      .startAngle(0)
      .endAngle(2 * Math.PI)
      .value(1);

    const instructions = piGen(stances);

    svg
      .selectAll("path")
      .data(instructions)
      .join("path")
      .transition()
      .attrTween("d", (d) => {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return piGen(d as unknown as d3.DefaultArcObject);
        };
      });
  });
  return <svg ref={svgRef} width="400" height="200" />;
};
