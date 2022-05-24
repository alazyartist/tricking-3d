import React from "react";
import { ReactComponent as LeftFoot } from "../../../data/ComboMakerSVG/Left.svg";
import { ReactComponent as RightFoot } from "../../../data/ComboMakerSVG/Right.svg";
import { ReactComponent as BothFoot } from "../../../data/ComboMakerSVG/Both.svg";
function TransitionButtons({ currentLeg }) {
	function whichLeg(toLeg) {
		switch (toLeg) {
			case "Left": {
				return <LeftFoot className=' w-20' />;
			}
			case "Right": {
				return <RightFoot className=' w-20' />;
			}
			case "Both": {
				return <BothFoot className=' w-20' />;
			}
		}
	}

	return (
		<div className='flex flex-col place-items-center  text-zinc-800'>
			{currentLeg && whichLeg(currentLeg)}
			{currentLeg}
		</div>
	);
}

export default TransitionButtons;
