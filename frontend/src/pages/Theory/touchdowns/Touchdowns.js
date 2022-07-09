import React from "react";
import { touchdowns } from "../../../data/trickDataModel/TrickObjects";
import { TouchdownsChart } from "./components/TouchdownsChart";
function Touchdowns() {
	return (
		<div className='flex flex-col place-items-center text-zinc-300'>
			<TouchdownsChart className='h-[20vh] w-[80vw]' />
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
