import React from "react";
import { ShapesChart } from "./components/ShapesChart";
function Shapes() {
  return (
    <div className="text-zinc-300">
      <ShapesChart className="h-fit w-[90vw]" />
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
