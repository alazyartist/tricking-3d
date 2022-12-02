import React, { useEffect, useState } from "react";
import StanceCircle from "@data/AdvancedStancesSVG";
import { useSpring, animated, config } from "react-spring";
import { stances } from "../../../data/trickDataModel/TrickObjects";
// import { ReactComponent as StanceCircleSelector } from "../../../data/AdvancedStancesSelector.svg";
import { useComboMakerStore } from "../../../store/comboMakerStore";

function StanceAnimationTest({ currentStance, isSmall, handleStanceAdd }) {
  const setCurrentStance = useComboMakerStore((s) => s.setCurrentStance);
  const setCurrentLeg = useComboMakerStore((s) => s.setCurrentLeg);
  const currentLeg = useComboMakerStore((s) => s.currentLeg);
  const [lastRotation, setLastRotation] = useState(0);
  let newRot = stances[currentStance]?.getRotation();

  useEffect(() => {
    if (newRot === 0 && lastRotation >= 90) {
      newRot = 360;
      setLastRotation(360);
    }

    // if (newRot >= 0 && lastRotation >= 360) {
    // 	newRot = lastRotation + 360;
    // 	setLastRotation(newRot);
    // }

    // sets rotation for comparison in next render
    // setLastRotation(newRot);
    console.log(newRot);
  }, [newRot]);
  const rotateSpring = useSpring<{}>({
    from: { rotate: lastRotation },
    to: { rotate: newRot },
    config: {
      duration: 750,
      config: config.wobbly,
    },
  });
  const fadeSpring = useSpring<{}>({
    reset: true,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 750,
      config: config.wobbly,
    },
  });
  return (
    <div
      className={`h-fit ${isSmall ? `max-h-[40vw]` : `max-h-[50vw]`} w-full ${
        isSmall ? `max-w-[40vw]` : `max-w-[50vw]`
      }`}
    >
      {/* <animated.div style={(...fadeSpring, ...rotateSpring)}> */}
      {/* <StanceCircleSelector
          className={`absolute z-[5] ${
            isSmall ? `max-h-[40vw]` : `max-h-[50vw]`
          } ${
            isSmall ? `max-w-[40vw]` : `max-w-[50vw]`
          } rotate-[-90deg] rounded-full opacity-0`}
          onClick={(e) => {
            if (e?.target?.id !== "Layer_1") {
              setCurrentStance(e.target.id);
              setCurrentLeg(stances[e.target.id].leg);
              handleStanceAdd(stances[e.target.id]);
              console.log(e);
            }
            console.log(e.target.id, stances);
          }}
        /> */}
      <StanceCircle className={`rotate-[-90deg]`} />
      {/* </animated.div> */}
    </div>
  );
}

export default StanceAnimationTest;
