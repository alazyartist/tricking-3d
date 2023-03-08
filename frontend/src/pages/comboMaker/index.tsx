//import { useComboMarket } from "../../store/comboMarket";
import React, { useEffect, useState, useRef } from "react";
import useTricksForComboMaker from "../../api/useTricksForComboMaker";
import TempDisplay from "./tempDisplay"
import Trick from "./trick"


const ComboMaker = () => {
  const { trick_array: allTricks, trans_array: allTransitions } = useTricksForComboMaker();
  const [combo, setCombo] = useState([])
  const [comboOptions, setComboOptions] = useState([])
  const [lastTrick, setLastTrick] = useState()
  const ref = useRef<HTMLDivElement>(); 
  const scrollToBottom = () => { 
    ref?.current?.scrollIntoView({ behavior: "smooth" }); 
  }; 
  useEffect(() => { 
    scrollToBottom(); 
  }, [combo]); 

  const showTricks = (tricks) => {
    const trick_type = tricks[0]?.type
    const _last_trick = combo[combo.length - 1]
    if (combo.length > 0 && trick_type != _last_trick?.type) {
      const _last_end = _last_trick.end_position;
      if (trick_type === "Trick")
        tricks = tricks.filter(trick => _last_end.includes(trick.start_position[0]))
      else
        tricks = tricks.filter(trans => trans.start_position?.includes(_last_end[0]))
    }
    setComboOptions(tricks)
  }

  const addToCombo = (trick) => {
    if (combo.length > 0) {
      const last_trick = combo[combo.length - 1]
      const new_trick = trick[trick.length - 1]
      if (new_trick.type === last_trick.type) {
        let trick_array = (new_trick.type === "Trick") ? allTransitions : allTricks
        if (new_trick.type === "Trick") {
          trick_array = trick_array.filter(trans => trans.end_position.includes(new_trick.start_position[0]))
          trick_array = trick_array.filter(trans => trans.start_position.includes(last_trick.end_position[0]))
        }
        else {
          trick_array = trick_array.filter(trick => new_trick.start_position?.includes(trick.end_position[0]))
          trick_array = trick_array.filter(trick => last_trick.end_position?.includes(trick.start_position[0]))
        }


        trick_array = trick_array[Math.floor(Math.random() * trick_array.length)]
        trick = [...[trick_array], ...trick]
      }
    }
    setCombo([...combo, ...trick])
  }
  const deleteLastTrick = () => { setCombo(combo.slice(0, -1)) }

  return (
    <div className="screen flex flex-col justify-end">
    {/*<TempDisplay />*/}

      <div className="display-combo">
        {combo.length > 0 ? (
          combo.map((trick, key) => (
            <button key={key.toString() + trick.name}
              className={`display-trick ${trick.type === "Trick" ? " bg-green-500" : " bg-blue-500"}`}
              onClick={() => { console.log("Selected") }}
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
            /*
            <div key={trick.name + key.toString()}
              className={`display-trick 
                ${trick.type === "Trick" ? " border-green-500" : " border-blue-500"}`}>
              <span key={key}>{trick.name}</span>
            </div>
              */
          ))) : (
          <span>Waiting..</span>
        )}
        <div ref={ref}>
        </div>
      </div>

      <div className="display-options">
        {comboOptions &&
          comboOptions.map((trick, key) => (
            <button key={key.toString() + trick.name}
              className={`display-option ${trick.type === "Trick" ? " bg-green-500" : " bg-blue-500"}`}
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

      <div className="trick-or-trans">
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
  );
};

export default ComboMaker;
