import React, { useState } from "react";
import { MdClose } from "../../../data/icons/MdIcons";
import {
  SetupShape,
  TricksShape,
  TransitionShape,
  StanceShape,
} from "./SVGTrickShapes";

const SelectTrickPopup = ({
  newCombo,
  allTricks,
  lastItem,
  setCurrentItem,
  setCurrentFilter,
  currentFilter,
  findStanceLeg,
}) => {
  const [activeDropdown, setActiveDropdown] = useState("");
  const comboPopoverStyle = `no-scrollbar  bottom-[10vh] left-[5vw] z-[20] flex h-full w-[90vw] justify-around flex-wrap place-items-center place-content-start gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md`;
  return (
    <>
      {/* {activeDropdown !== "" && (
        <div
          className="absolute right-[15vw] top-[23vh] text-4xl"
          onClick={() => setActiveDropdown("")}
        >
          <MdClose />
        </div>
      )} */}
      {/* <div className=" flex h-fit w-[98vw]  flex-wrap place-content-center place-items-end gap-2 text-zinc-300"></div> */}
      {/* <div className=" flex h-fit w-[98vw]  flex-wrap place-content-center place-items-end gap-2 text-zinc-300">
        {newCombo?.length <= 0 && (
          <button type="button" onClick={() => setActiveDropdown("Transition")}>
            Setup
          </button>
        )}
        {newCombo?.length > 0 && lastItem?.type !== "Transition" && (
          <button type="button" onClick={() => setActiveDropdown("Transition")}>
            Transition
          </button>
        )}
        {newCombo?.length > 0 && lastItem?.type !== "Trick" && (
          <button type="button" onClick={() => setActiveDropdown("Trick")}>
            Trick
          </button>
        )}
      </div> */}
      {newCombo?.length > 0 && lastItem?.type !== "Trick" && (
        <div className={comboPopoverStyle}>
          {allTricks
            ?.filter((trick) =>
              newCombo.length > 0
                ? findStanceLeg(trick.takeoffStance) === currentFilter
                : trick
            )
            ?.map((trick) =>
              trick.type === "Trick" ? (
                <div
                  className="w-fit rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center hover:bg-zinc-700"
                  onClick={() => {
                    setCurrentItem((s) => [...s, trick]);
                    setActiveDropdown("");
                  }}
                  key={trick.trick_id + "trick"}
                >
                  {trick.name}
                </div>
              ) : null
            )}
        </div>
      )}
      {lastItem?.type !== "Transition" && (
        <div className={comboPopoverStyle}>
          {!lastItem && (
            <div className="flex w-full justify-between gap-2">
              <p
                onClick={() => setCurrentFilter("Left")}
                className={`flex-grow rounded-md bg-zinc-200 bg-opacity-20 p-2 text-center ${
                  currentFilter === "Left"
                    ? "bg-zinc-200 bg-opacity-50"
                    : "text-zinc-400"
                }`}
              >
                Left
              </p>
              <p
                onClick={() => setCurrentFilter("Right")}
                className={`flex-grow rounded-md bg-zinc-200 bg-opacity-20 p-2 text-center ${
                  currentFilter === "Right"
                    ? "bg-zinc-200 bg-opacity-50"
                    : "text-zinc-400"
                }`}
              >
                Right
              </p>
              <p
                onClick={() => setCurrentFilter("Both")}
                className={`flex-grow rounded-md bg-zinc-200 bg-opacity-20 p-2 text-center ${
                  currentFilter === "Both"
                    ? "bg-zinc-200 bg-opacity-50"
                    : "text-zinc-400"
                }`}
              >
                Both
              </p>
            </div>
          )}
          {allTricks
            ?.filter((trick) =>
              currentFilter ? trick.fromLeg === currentFilter : trick
            )
            .map((trick) =>
              trick.type === "Transition" ? (
                <div
                  className="flex w-fit max-w-[50vw] flex-grow flex-col justify-between rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center"
                  onClick={() => {
                    setCurrentItem((s) => [...s, trick]);
                    setActiveDropdown("");
                  }}
                  key={trick.id + "transition"}
                >
                  <div>{trick.name}</div>
                  <div className="flex w-full  justify-between gap-2 pt-2 text-xs">
                    <div className="w-[37px] rounded-md bg-zinc-700 p-1">
                      {trick.fromLeg}
                    </div>
                    <div className="w-[37px] rounded-md bg-zinc-700 p-1">
                      {trick.toLeg}
                    </div>
                  </div>
                </div>
              ) : null
            )}
        </div>
      )}
    </>
  );
};

export default SelectTrickPopup;

export const TrickShapeDisplay = ({ trick, i }) => {
  return (
    <div className="flex h-[100%] w-fit place-content-end overflow-hidden">
      {trick.type === "Transition" && i === 0 && (
        <SetupShape
          title={trick?.name}
          className={" top-0 fill-zinc-300 stroke-zinc-300"}
        />
      )}
      {trick.type === "Trick" && (
        <TricksShape
          title={trick?.name}
          className={" top-0 fill-zinc-300 stroke-zinc-300"}
        />
      )}{" "}
      {trick.type === "Stance" && (
        <StanceShape
          title={trick?.name}
          className={" top-0 fill-zinc-300 stroke-zinc-300"}
        />
      )}{" "}
      {trick.type === "Transition" && i !== 0 && (
        <TransitionShape
          title={trick?.name}
          className={" top-0 fill-zinc-300 stroke-zinc-300"}
        />
      )}
    </div>
  );
};
