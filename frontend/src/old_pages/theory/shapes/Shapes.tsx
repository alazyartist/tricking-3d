import React from "react";
import { ShapesChart } from "./components/ShapesChart";
function Shapes() {
  return (
    <div className="text-zinc-300">
      <div className="py-2 text-2xl text-zinc-300">Shapes</div>

      <ShapesChart className="h-fit w-[320px] md:w-[480px]" />
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
