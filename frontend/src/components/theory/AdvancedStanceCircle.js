import React from "react";
import StanceCircleBIFO from "../theory/StanceCircleBIFO";
import StanceCircleCHMS from "../theory/StanceCircleCHMS";
function AdvancedStanceCircle() {
	return (
		<div>
			<StanceCircleCHMS />
			<div className='translate-y-[-17rem]'>
				<StanceCircleBIFO />
			</div>
		</div>
	);
}

export default AdvancedStanceCircle;
