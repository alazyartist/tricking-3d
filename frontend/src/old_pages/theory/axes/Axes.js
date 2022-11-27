import React from "react";
import AxesSketch from "./components/AxesSketch";

const Axes = () => {
	return (
		<div className='flex flex-col place-content-center place-items-center text-zinc-300'>
			<div>Axes</div>
			<AxesSketch className='h-80 w-80' />
			<div className='w-[80%] text-sm font-light'>
				Each of the base flips can be manipulated on these axes. 0 is the axis
				of the pure flips 45 is the axis cork 90 is the axis of the btwist
			</div>
		</div>
	);
};

export default Axes;
