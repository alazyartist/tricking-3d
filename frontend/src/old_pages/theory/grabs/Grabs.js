import React from "react";
import { grabs } from "../../../data/trickDataModel/TrickObjects";
import { GrabsChart } from "./components/GrabsChart";

function Grabs() {
	return (
		<div className='text-zinc-300'>
			<GrabsChart className='h-fit w-[80vw]' />
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
