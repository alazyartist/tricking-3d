//import { useComboMarket } from "../../store/comboMarket";
import React, { useEffect, useState, useRef } from "react";
import useTricksForComboMaker from "../../api/useTricksForComboMaker";
import TempDisplay from "./tempDisplay"
import Trick from "./trick"


const ComboMaker = () => {
  const { trick_array: allTricks, trans_array: allTransitions } = useTricksForComboMaker();
  console.log(allTricks)
  const [combo, setCombo] = useState([])
  const [comboPosition, setComboPosition] = useState(0)
  const [comboOptions, setComboOptions] = useState([])
  const ref = useRef<HTMLDivElement>();
  const scrollToBottom = () => { ref?.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { 
    scrollToBottom()
  }, [combo]);

  const compareArrays = (arr1, arr2) => {
    if (arr1 == arr2
      || arr1.includes(arr2[0])
      || arr2.includes(arr1[0])) return true;
    return false;
  }

  const selectTrickOrTrans = (tricks) => {
    const last_trick = combo[combo.length - 1]
    if (last_trick && last_trick?.type !== tricks[0].type) {
        tricks = tricks.filter(trick => compareArrays(last_trick.end_position, trick.start_position))
        tricks = tricks.filter(trans => compareArrays(trans.start_position, last_trick.end_position))
    }
    setComboPosition(combo.length)
    setComboOptions(tricks)
  }

  const selectFromOptions = (trick) => {
    const new_trick = trick[trick.length - 1]
    const last_trick = combo[combo.length - 1]
    // Inject a linking trick
    if (new_trick.type === last_trick?.type && comboPosition === combo.length) {
      let trick_array = (new_trick.type === "Trick") ? allTransitions : allTricks
      // TODO: Rip out to a function filterPositions()
      if (new_trick.type === "Trick") {
        trick_array = trick_array.filter(trans => trans.end_position.includes(new_trick.start_position[0]))
        trick_array = trick_array.filter(trans => trans.start_position.includes(last_trick.end_position[0]))
      }
      else {
        trick_array = trick_array.filter(trick => new_trick.start_position?.includes(trick.end_position[0]))
        trick_array = trick_array.filter(trick => last_trick.end_position?.includes(trick.start_position[0]))
      }
      // Pick a Random option
      trick_array = trick_array[Math.floor(Math.random() * trick_array.length)]
      trick = [trick_array, ...trick]
    }

    let new_combo = combo.map((x) => x);
    if (comboPosition === combo.length){
      new_combo = [...combo, ...trick]
    }
    else {
      new_combo[comboPosition] = trick[0]
      setComboOptions([])
    }
    setComboPosition(new_combo.length)
    setCombo(new_combo)
  }

  const deleteLastTrick = () => { 
    setComboPosition(Math.max(0,combo.length-1))
    setCombo(combo.slice(0, -1)) 
  }

  const selectFromCombo = (trick_selected, index) => {
    let options_array = trick_selected.type === "Trick" ? allTricks : allTransitions

    if (index > 0) {
      const prev_trick = combo[index-1]
      options_array = options_array.filter(_trick =>
        compareArrays(_trick.start_position, prev_trick.end_position))
    }
    if (index < combo.length - 1) {
      const next_trick = combo[index+1]
      options_array = options_array.filter(_trick =>
        compareArrays(_trick.end_position, next_trick.start_position))
    }
    //let random_option = options_array[Math.floor(Math.random()*options_array.length)]
    //let temp_combo = combo
    //temp_combo[index] = random_option
    //setCombo([...temp_combo])
    setComboPosition(index)
    setComboOptions(options_array)
  }

  return (
    <div className="screen flex flex-col justify-end">
      {/*<TempDisplay />*/}

      <div className="display-combo">
        {combo.length > 0 ? (
          combo.map((trick, index) => (
            <button key={index.toString() + trick.name}
              className={`
                ${trick.type === "Trick" ? " display-trick" : " display-transition"}
                ${comboPosition === index ? " border-b-4 border-t-4 border-zinc-300 " : ""} 
              `}
              onClick={() => { selectFromCombo(trick, index) }}
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
              className={`display-option 
                ${trick.type === "Trick" 
                  ? " bg-green-500 text-black" 
                  : " bg-blue-500 text-white"}`}
              onClick={() => { selectFromOptions([trick]) }}
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
            selectTrickOrTrans(allTricks);
          }}> Trick </button>

        <button className="btn-clear-combo" onClick={() => deleteLastTrick()} >
          Back </button>

        <button
          className="btn-transition"
          onClick={() => {
            selectTrickOrTrans(allTransitions);
          }}> Transition </button>
      </div>
    </div>
  );
};

export default ComboMaker;
