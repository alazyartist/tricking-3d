import React from "react";
import { grabs } from "../../data/trickDataModel/TrickObjects";

function Grabs() {
	return (
		<div className='text-zinc-300'>
			{Object.keys(grabs).map((e, i) => (
				<div className='flex' id={i}>
					<div className='pr-4'>{`${e}:`}</div>
					<div>{grabs[e]}</div>
				</div>
			))}
		</div>
	);
}

export default Grabs;
