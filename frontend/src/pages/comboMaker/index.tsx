//import { useComboMarket } from "../../store/comboMarket";
import React, { useEffect, useState } from "react";
import useTricksForComboMaker from "../../api/useTricksForComboMaker";
import TempDisplay from "./tempDisplay"
import Trick from "./trick"


const ComboMaker = () => {
  const { trick_array: allTricks, trans_array: allTransitions } = useTricksForComboMaker();
  const [combo, setCombo] = useState([])
  const [comboOptions, setComboOptions] = useState([])
  const [lastTrick, setLastTrick] = useState()

  const showTricks = (tricks) => {
    const trick_type = tricks[0]?.type
    const _last_trick = combo[combo.length - 1]
    if ( combo.length > 0  && trick_type != _last_trick?.type) {
      const _last_end = _last_trick.end_position;
      if(trick_type === "Trick" ) 
        tricks = tricks.filter(trick => _last_end.includes(trick.start_position[0]))
      else 
        tricks = tricks.filter(trick => trick.start_position?.includes(_last_end[0]))
    }
    setComboOptions(tricks)
  }

  const addToCombo = (trick) => { 
    setCombo([...combo, ...trick]) 
  }
  const deleteLastTrick = () => { setCombo(combo.slice(0, -1)) }

  return (
    <div className="screen flex flex-col justify-end">
      <TempDisplay />

      <div className="display-combo">
        {combo.length > 0 ? (
          combo.map((trick, key) => (
            <div key={trick.name + key.toString()}
              className={`display-trick 
                ${trick.type === "Trick" ? " border-green-500" : " border-blue-500"}`}>
              <span key={key}>{trick.type}: {trick.name}</span>
            </div>
          ))) : (
          <span>Waiting..</span>
        )}
      </div>

      <div className="combo-options">
        {comboOptions &&
          comboOptions.map((trick, key) => (
            <button key={key.toString() + trick.name}
              className={`rounded-lg ${trick.type === "Trick" ? " bg-green-500" : " bg-blue-500"}`}
              onClick={() => { addToCombo([trick]) }}
            >
              <Trick
                type={"_" + trick.type}
                name={trick.name}
                id={trick.id}
                trick_id={trick.trick_id}
                start_position={[["_"], [...trick.start_position]]}
                end_position={[["_"], [...trick.end_position]]}
              />
            </button>
          ))
        }
      </div>

      <div className="build-combo">
        <div className="flex-row-center">
          <button 
            className="btn-trick" 
            onClick={() => {
              showTricks(allTricks);
            }}> Trick </button>

          <button className="btn-clear-combo" onClick={() => deleteLastTrick()} >
            Back </button>

          <button 
            className="btn-transition" 
            onClick={() => {
              showTricks(allTransitions);
            }}> Transition </button>

        </div>
      </div>
    </div>
  );
};

export default ComboMaker;
  /*
    const random = Math.floor(Math.random() * allTransitions.length)
    let newTrick = [allTransitions[random]]
    if (combo.length % 2 === 1) { newTrick = [...showTricks(), ...newTrick] }
    return newTrick
  }
  */
