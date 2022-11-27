import React from "react";
import { ReactComponent as LeftFoot } from "../../../data/ComboMakerSVG/Left.svg";
import { ReactComponent as RightFoot } from "../../../data/ComboMakerSVG/Right.svg";
import { ReactComponent as BothFoot } from "../../../data/ComboMakerSVG/Both.svg";
function TransitionButtons({ noText, currentLeg, f }) {
	function whichLeg(toLeg) {
		switch (toLeg) {
			case "Left": {
				return <LeftFoot className=' w-10' />;
			}
			case "Right": {
				return <RightFoot className='w-10' />;
			}
			case "Both": {
				return <BothFoot className='w-10' />;
			}
		}
	}

	return (
		<div onClick={() => f()} className='flex flex-col place-items-center '>
			{currentLeg && whichLeg(currentLeg)}
			{!noText && currentLeg}
		</div>
	);
}

export default TransitionButtons;
