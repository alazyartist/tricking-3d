import React from "react";
import { touchdowns } from "../../data/trickDataModel/TrickObjects";
function Touchdowns() {
	return (
		<div className='text-zinc-300'>
			{Object.keys(touchdowns).map((e, i) => (
				<div className='flex' id={i}>
					<div className='pr-4'>{`${e}:`}</div>
					<div>{touchdowns[e]}</div>
				</div>
			))}
		</div>
	);
}

export default Touchdowns;
