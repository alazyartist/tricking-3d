import React from "react";
import { shapes } from "../../data/trickDataModel/TrickObjects";
function Shapes() {
	return (
		<div className='text-zinc-300'>
			{Object.keys(shapes).map((e, i) => (
				<div className='flex'>
					<div className='pr-4'>{`${e}:`}</div>
					<div>{shapes[e]}</div>
				</div>
			))}
		</div>
	);
}

export default Shapes;
