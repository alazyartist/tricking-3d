import React from "react";
import All from "../../../data/IndividualStances/StanceCircle";
import Backside from "../../../data/IndividualStances/Backside";
import BacksideComplete from "../../../data/IndividualStances/BacksideComplete";
import BacksideHyper from "../../../data/IndividualStances/BacksideHyper";
import Inside from "../../../data/IndividualStances/Inside";
import InsideHyper from "../../../data/IndividualStances/InsideHyper";
import InsideMega from "../../../data/IndividualStances/InsideMega";
import Frontside from "../../../data/IndividualStances/Frontside";
import FrontsideMega from "../../../data/IndividualStances/FrontsideMega";
import FrontsideSemi from "../../../data/IndividualStances/FrontsideSemi";
import Outside from "../../../data/IndividualStances/Outside";
import OutsideSemi from "../../../data/IndividualStances/OutsideSemi";
import OutsideComplete from "../../../data/IndividualStances/OutsideComplete";
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
      <div className="h-[60vw] w-[60vw]">
        {currentStance && whichStance(currentStance)}
      </div>
    </div>
  );
}

export default StanceSVG;
