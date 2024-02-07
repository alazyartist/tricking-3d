import VariationGrid from "@components/d3/VariationsGrid";
import { trpc } from "@utils/trpc";
import React from "react";
import { ShapesChart } from "./components/ShapesChart";
function Shapes() {
  const { data: shapes } = trpc.trick.getVariations.useQuery({ type: "shape" });
  return (
    <div className="no-scrollbar overflow-y-scroll  text-zinc-300">
      <div className="py-2 text-2xl text-zinc-300">Shapes</div>
      {/* {shapes?.map((shape) => (
        <div key={shape.id} className="flex">
          <div className="pr-4">{shape.name}</div>
        </div>
      ))} */}
      <VariationGrid data={shapes} />
      {/* <ShapesChart className="h-fit w-[320px] md:w-[480px]" /> */}
      {/* {Object.keys(shapes).map((e, i) => (
				<div className='flex'>
					<div className='pr-4'>{`${e}:`}</div>
					<div>{shapes[e]}</div>
				</div>
			))} */}
    </div>
  );
}

export default Shapes;
