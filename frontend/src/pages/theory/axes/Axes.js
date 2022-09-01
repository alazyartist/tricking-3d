import React from "react";
import AxesSketch from "./components/AxesSketch";

const Axes = () => {
	return (
		<div className='flex place-content-center text-zinc-300'>
			<div>Axes</div>
			<AxesSketch className='h-80 w-80' />
		</div>
	);
};

export default Axes;
