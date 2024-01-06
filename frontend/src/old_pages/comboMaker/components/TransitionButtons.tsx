import React from "react";
import Left from "@data/ComboMakerSVG/Left";
import Right from "@data/ComboMakerSVG/Right";
import Both from "@data/ComboMakerSVG/Both";
interface TransitionButtonProps {
  noText?: boolean;
  currentLeg: string;
  f?: any;
}
const TransitionButtons: React.FC<TransitionButtonProps> = ({
  noText,
  currentLeg,
  f,
}) => {
  function whichLeg(toLeg) {
    switch (toLeg) {
      case "Left": {
        return <Left className=" w-10" />;
      }
      case "Right": {
        return <Right className="w-10" />;
      }
      case "Both": {
        return <Both className="w-10" />;
      }
    }
  }

  return (
    <div onClick={() => f && f()} className="flex flex-col place-items-center ">
      {currentLeg && whichLeg(currentLeg)}
      {!noText && currentLeg}
    </div>
  );
};

export default TransitionButtons;
