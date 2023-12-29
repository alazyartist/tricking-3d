import React, { useState } from "react";
import { Stance, Transition } from "@data/trickDataModel/TrickClasses";
import LeftFoot from "@data/ComboMakerSVG/Left";
import RightFoot from "@data/ComboMakerSVG/Right";
import BothFoot from "@data/ComboMakerSVG/Both";
//Nested Ternerary Hell for styling... Should have done this differently... next time this works for now.
export function ArrayDisplay(props) {
  let isEmpty = props.isEmpty;
  const [isOpen, setOpen] = useState(props.startOpen);

  return (
    <div
      className={`flex w-full flex-col rounded-lg ${
        props.bg && "bg-gradient-to-br from-zinc-400 to-sky-200"
      }  ${
        !props.isCollapsable && isOpen && !props.stanceList
          ? "max-h-[14rem]"
          : ""
      } ${props.stanceList ? "" : ""} p-2`}
    >
      <div
        onClick={() => props.isCollapsable && setOpen(!isOpen)}
        className="place-self-center text-xl font-bold text-zinc-800"
      >
        {props.name}
      </div>
      <div
        className={`w-full ${
          !props.isCollapsable && isOpen && !props.stanceList
            ? "h-[14rem] overflow-hidden rounded-lg"
            : ""
        } no-scrollbar ${
          props.stanceList ? "h-[18rem] overflow-hidden " : ""
        }overflow-y-auto`}
      >
        <div
          className={`${
            props.isCollapsable && isOpen
              ? "fixed left-0 top-[20vh] z-[10] max-h-[70vh] overflow-y-auto p-4 "
              : ""
          } no-scrollbar flex w-full flex-col place-items-center `}
        >
          <div>{isEmpty && "Select Valid Stance"}</div>
          {isOpen &&
            props.arr.map((arrV, i) => (
              <div
                key={i}
                className={`${
                  props.isCollapsable
                    ? "z-[50] text-zinc-800"
                    : "bg-opacity-20 text-zinc-800"
                } my-1 flex w-fit place-items-center rounded-lg bg-neutral-400 p-1`}
                onClick={() => {
                  props.f(arrV);
                  console.log(arrV);
                  props.isCollapsable && setOpen(!isOpen);
                }}
              >
                <div
                  className={`text-sm ${
                    props.isCollapsable ? "text-zinc-800" : "text-zinc-800"
                  }`}
                >
                  {arrV.name}
                </div>

                {arrV instanceof Transition && (
                  <div className="flex p-1 text-sm">
                    {/* {arrV?.toLeg && `to: ${arrV.toLeg}`} */}
                    {arrV?.toLeg && whichLeg(arrV.toLeg)}
                  </div>
                )}
                {arrV instanceof Stance && (
                  <div className="flex p-1 text-sm">
                    {/* {arrV?.toLeg && `to: ${arrV.toLeg}`} */}
                    {arrV?.leg && whichLeg(arrV.leg)}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div
        onClick={() => setOpen(!isOpen)}
        className={`${
          props.isCollapsable &&
          isOpen &&
          "fixed bottom-0 left-0 z-[1] h-[100vh] max-h-screen  place-content-center place-items-center overflow-y-auto bg-zinc-700 p-4 opacity-80 blur-md "
        } flex w-full flex-col place-items-center  `}
      ></div>
    </div>
  );
}
export function whichLeg(toLeg) {
  switch (toLeg) {
    case "Left": {
      return (
        <div className="h-10 w-10">
          <LeftFoot />
        </div>
      );
    }
    case "Right": {
      return (
        <div className="h-10 w-10">
          <RightFoot />
        </div>
      );
    }
    case "Both": {
      return (
        <div className="h-10 w-10">
          <BothFoot />
        </div>
      );
    }
    default:
  }
  return;
}
export default ArrayDisplay;
