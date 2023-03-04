import React, { use, useEffect, useState } from "react";
import useTricksForComboMaker from "../../../api/useTricksForComboMaker";
import Trick from "../trick";

type TrickType = {
  name: string;
  type: string;
  id: string;
  start_position?: Array<string>;
  end_position: Array<string>;
  variations?: Array<string>;
}

const TempDisplay = () => {
  //const type = useComboMarket((s) => s.type);
  const [showAllTricks, setShowAllTricks] = useState(false);
  const [showTricks, setShowTricks] = useState(true);
  const [showTransitions, setShowTransitions] = useState(true);

  const { trick_array: allTricks, trans_array: allTrans }
    : Partial<TrickType> = useTricksForComboMaker();

  return (
    <div className="abs-top z-10 w-screen max-h-[100vh] overflow-auto flex-col justify-start bg-zinc-800 bg-opacity-60">
      <div className="flex flex-col -center">
        <button
          className="btn-trick-type bg-green-400"
          onClick={() => setShowAllTricks(!showAllTricks)}
        >Show All Tricks</button>

        {showAllTricks &&
          <div className="w-screen flex-center bg-white mb-1">
            <button
              className={"btn-trick-type" + (showTricks ? " bg-green-400" : " bg-red-400")}
              onClick={() => setShowTricks(!showTricks)}
            >Trick</button>
            <button
              className={"btn-trick-type" + (showTransitions ? " bg-green-400" : " bg-red-400")}
              onClick={() => setShowTransitions(!showTransitions)}
            >Transition</button>
          </div>
        }
      </div>

      <div className="pt-2 h-full w-full flex flex-1 overflow-auto">
        <div className="flex flex-row justify-center flex-wrap gap-4">

          {allTricks && showAllTricks && allTricks.map((trick, key) => {
            if (!showTricks && trick.type === "Trick") return null;

            return (
              <Trick
                key={key}
                name={trick.name}
                type={trick.type}
                id={trick.id}
                trick_id={trick.trick_id}
                start_position={trick.start_position}
                end_position={trick.end_position}
              />
            )
          })}
          {allTrans && showAllTricks && allTrans.map((trick, key) => {
            if (!showTransitions && trick.type === "Transition") return null;

            return (
              <Trick
                key={key}
                name={trick.name}
                type={trick.type}
                id={trick.id}
                trick_id={trick.trick_id}
                start_position={trick.start_position}
                end_position={trick.end_position}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default TempDisplay;
