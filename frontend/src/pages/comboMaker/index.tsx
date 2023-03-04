//import { useComboMarket } from "../../store/comboMarket";
import React, { useEffect, useState } from "react";
import useTricksForComboMaker from "../../api/useTricksForComboMaker";
import TempDisplay from "./tempDisplay"
import Trick from "./trick"

type TrickType = {
  name: string;
  type: string;
  id: string;
  start_position?: Array<string>;
  end_position: Array<string>;
  variations?: Array<string>;
}


const ComboMaker = () => {
  const [combo, setCombo] = useState([])
  const { trick_array: allTricks, trans_array: allTransitions }
    : Partial<TrickType> = useTricksForComboMaker();

  const addTrick = () => {
    const rTrick = Math.floor(Math.random() * allTricks.length)
    const rTrans = Math.floor(Math.random() * allTransitions.length)
    if (combo.length === 0 || combo[combo.length - 1].type === "Trick")
      setCombo([...combo, allTransitions[rTrans], allTricks[rTrick]])
    else
      setCombo([...combo, allTricks[rTrick]])
  }

  const addTransition = () => {
    const rTrick = Math.floor(Math.random() * allTricks.length)
    const rTrans = Math.floor(Math.random() * allTransitions.length)
    if (combo.length > 0 && combo[combo.length - 1].type === "Transition")
      setCombo([...combo, allTricks[rTrick], allTransitions[rTrans]])
    else
      setCombo([...combo, allTransitions[rTrans]])
  }
  const clearCombo = () => { setCombo([]) }

  return (
    <div className="screen flex flex-col justify-end">
      {/* 
      <TempDisplay />
      */}

      {/* Display Combo */}
      <div className="display-combo">
        {combo.length > 0 ? (
          combo.map((trick, key) => (
            <div 
              className={`display-trick 
                ${trick.type === "Trick" ? " border-green-500" : " border-blue-500"}`}>
              <span key={key}>{trick.type}: {trick.name}</span>
            </div>
          ))) : (
          <span>Waiting..</span>
        )}
      </div>

      {/* Select Trick/Transition */}
      <div className="build-combo">
        <div className="flex-row-center">
          <button className="btn-trick" onClick={() => addTrick()} >
            Trick </button>
          <button className="btn-transition" onClick={() => addTransition()} >
            Transition </button>
        </div>
        <button className="btn-clear-combo" onClick={() => clearCombo()} >
          Clear </button>
      </div>
    </div>
  );
};

export default ComboMaker;
