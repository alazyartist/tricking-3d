import React, { useEffect, useState } from "react";
import useGetTricks from "../../api/useGetTricks";
import Trick from "./trick";

const ComboMaker = () => {
  // @TODO: Create a component that makes a usable trick object from useGetTricks
  const { data: allTricks } = useGetTricks();

  const [showTricks, setShowTricks] = useState(true);
  const [showTransitions, setShowTransitions] = useState(true);
  const [showStances, setShowStances] = useState(true);


  return (
    <div className="screen flex-col justify-start">
      <div className="w-screen flex-center bg-white mb-1">
        <button
          className={"btn-trick-type" + (showTricks ? " bg-green-400" : " bg-red-400")}
          onClick={() => setShowTricks(!showTricks)}
        >Trick</button>
        <button
          className={"btn-trick-type" + (showTransitions ? " bg-green-400" : " bg-red-400")}
          onClick={() => setShowTransitions(!showTransitions)}
        >Transition</button>
        <button
          className={"btn-trick-type" + (showStances ? " bg-green-400" : " bg-red-400")}
          onClick={() => setShowStances(!showStances)}
        >Stance</button>
      </div>
      <div className="pt-2 h-full w-full flex flex-1 overflow-auto">
        <div className="flex flex-row justify-center flex-wrap gap-4">

          {allTricks && allTricks.map((trick) => {
            console.log("trick var ", trick.Variations);
            let variations: String[] = [];

            {
              trick.Variations && trick.Variations.map((variation) => {
                console.log("var ", variation);

                if (variation.Variation) {
                    console.log("varName ", variation.Variation);
                    variations.push(variation.Variation.name);
                }
              })
            }

            if (!showTricks && trick.type === "Trick") return null;
            if (!showTransitions && trick.type === "Transition") return null;
            if (!showStances && trick.type === "Stance") return null;
            return (
              <Trick
                startingStance={trick.takeoffStance}
                landingStance={trick.landingStance}
                type={trick.type}
                name={trick.name}
                id={trick.trick_id}
                variations={variations} />
            )
          })
          }
        </div>
      </div>
    </div>
  );
};

export default ComboMaker;
