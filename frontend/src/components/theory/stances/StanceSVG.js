import React from "react";
import { ReactComponent as All } from "../../../data/IndividualStances/StanceCircle.svg";
import { ReactComponent as Backside } from "../../../data/IndividualStances/Backside.svg";
import { ReactComponent as BacksideComplete } from "../../../data/IndividualStances/BacksideComplete.svg";
import { ReactComponent as BacksideHyper } from "../../../data/IndividualStances/BacksideHyper.svg";
import { ReactComponent as Inside } from "../../../data/IndividualStances/Inside.svg";
import { ReactComponent as InsideHyper } from "../../../data/IndividualStances/InsideHyper.svg";
import { ReactComponent as InsideMega } from "../../../data/IndividualStances/InsideMega.svg";
import { ReactComponent as Frontside } from "../../../data/IndividualStances/Frontside.svg";
import { ReactComponent as FrontsideMega } from "../../../data/IndividualStances/FrontsideMega.svg";
import { ReactComponent as FrontsideSemi } from "../../../data/IndividualStances/FrontsideSemi.svg";
import { ReactComponent as Outside } from "../../../data/IndividualStances/Outside.svg";
import { ReactComponent as OutsideSemi } from "../../../data/IndividualStances/OutsideSemi.svg";
import { ReactComponent as OutsideComplete } from "../../../data/IndividualStances/OutsideComplete.svg";
function StanceSVG({ currentStance }) {
	function whichStance(cur) {
		switch (cur) {
			case "All":
				return <All />;
			case "Backside":
				return <Backside />;
			case "BacksideComplete":
				return <BacksideComplete />;
			case "BacksideHyper":
				return <BacksideHyper />;
			case "Inside":
				return <Inside />;
			case "InsideHyper":
				return <InsideHyper />;
			case "InsideMega":
				return <InsideMega />;
			case "Frontside":
				return <Frontside />;
			case "FrontsideMega":
				return <FrontsideMega />;
			case "FrontsideSemi":
				return <FrontsideSemi />;
			case "Outside":
				return <Outside />;
			case "OutsideSemi":
				return <OutsideSemi />;
			case "OutsideComplete":
				return <OutsideComplete />;
		}
	}

	return (
		<div>
			<div className='h-[60vw] w-[60vw]'>
				{currentStance && whichStance(currentStance)}
			</div>
		</div>
	);
}

export default StanceSVG;
