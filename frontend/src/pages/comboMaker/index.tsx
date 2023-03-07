//import { useComboMarket } from "../../store/comboMarket";
import React, { useEffect, useState } from "react";
import useTricksForComboMaker from "../../api/useTricksForComboMaker";
import TempDisplay from "./tempDisplay"
import Trick from "./trick"


const ComboMaker = () => {
  const [combo, setCombo] = useState([])
  const [comboOptions, setComboOptions] = useState([])
  const { trick_array: allTricks, trans_array: allTransitions } = useTricksForComboMaker();

  const showTricks = () => { setComboOptions(allTricks) }
  const showTransitions = () => { setComboOptions(allTransitions) }
  /*
    const random = Math.floor(Math.random() * allTransitions.length)
    let newTrick = [allTransitions[random]]
    if (combo.length % 2 === 1) { newTrick = [...showTricks(), ...newTrick] }
    return newTrick
  }
  */
  const addToCombo = (trick) => { setCombo([...combo, ...trick]) }
  const deleteLastTrick = () => { setCombo(combo.slice(0, -1)) }

  return (
    <div className="screen flex flex-col justify-end">
      {/* 
      */}
      <TempDisplay />

      {/* Display Combo */}
      <div className="display-combo">
        {combo.length > 0 ? (
          combo.map((trick, key) => (
            <div key={key}
              className={`display-trick 
                ${trick.type === "Trick" ? " border-green-500" : " border-blue-500"}`}>
              <span key={key}>{trick.type}: {trick.name}</span>
            </div>
          ))) : (
          <span>Waiting..</span>
        )}
      </div>

      {/* Select From Options */}
      <div className="combo-options">
        {comboOptions &&
          comboOptions.map((trick, key) => (
            /*
              <button key={key}
                className={`combo-option 
                  ${trick.type === "Trick" ? " bg-green-500" : " bg-blue-500"}`}
                onClick={() => { addToCombo([trick]) }}>
                {trick.name} </button>
                */
            <div className={`rounded-lg ${trick.type === "Trick" ? " bg-green-500" : " bg-blue-500"}`}>
              <Trick
                key={key}
                type={"_" + trick.type}
                name={trick.name}
                id={trick.id}
                trick_id={trick.trick_id}
                start_position={[["_"], [...trick.start_position]]}
                end_position={[["_"], [...trick.end_position]]}
              />
            </div>
          ))
        }
      </div>

      {/* Select Trick/Transition */}
      <div className="build-combo">
        <div className="flex-row-center">
          <button className="btn-trick" onClick={() => showTricks()} >
            Trick </button>
          <button className="btn-clear-combo" onClick={() => deleteLastTrick()} >
            Back </button>
          <button className="btn-transition" onClick={() => showTransitions()} >
            Transition </button>
        </div>
      </div>
    </div>
  );
};

export default ComboMaker;
