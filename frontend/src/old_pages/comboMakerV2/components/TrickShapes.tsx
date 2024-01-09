import React, { useState } from "react";
import { MdClose } from "../../../data/icons/MdIcons";
import {
  SetupShape,
  TricksShape,
  TransitionShape,
  StanceShape,
} from "./SVGTrickShapes";

const TrickShapes = ({
  newCombo,
  allTricks,
  lastItem,
  setCurrentItem,
  currentFilter,
  findStanceLeg,
}) => {
  const [activeDropdown, setActiveDropdown] = useState("");
  const comboPopoverStyle = `no-scrollbar flex-shrink-0  bottom-[10vh] left-[5vw] z-[20] flex h-[50vh] w-[90vw] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md`;
  return (
    <>
      {activeDropdown !== "" && (
        <div
          className="absolute right-[15vw] top-[23vh] text-4xl"
          onClick={() => setActiveDropdown("")}
        >
          <MdClose />
        </div>
      )}
      <div className=" flex h-fit w-[98vw]  flex-wrap place-content-center place-items-end gap-2 text-zinc-300"></div>
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
                  className="w-full rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center hover:bg-zinc-700"
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
          {allTricks
            ?.filter((trick) =>
              newCombo.length > 0 ? trick.fromLeg === currentFilter : trick
            )
            .map((trick) =>
              trick.type === "Transition" ? (
                <div
                  className="flex w-full justify-between rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center"
                  onClick={() => {
                    setCurrentItem((s) => [...s, trick]);
                    setActiveDropdown("");
                  }}
                  key={trick.id + "transition"}
                >
                  <div>{trick.name}</div>
                  <div className="flex w-1/2 justify-between gap-2">
                    <div className="w-[75px]">{trick.fromLeg}</div>
                    <div className="w-[75px]">{trick.toLeg}</div>
                  </div>
                </div>
              ) : null
            )}
        </div>
      )}
      {activeDropdown === "Stance" && (
        <div className={comboPopoverStyle}>
          {allTricks?.map((trick) =>
            trick.type === "Stance" ? (
              <div
                className="w-full rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center"
                onClick={() => {
                  setCurrentItem((s) => [...s, trick]);
                  setActiveDropdown("");
                }}
                key={trick.trick_id}
              >
                {trick.name}
              </div>
            ) : null
          )}
        </div>
      )}
    </>
  );
};

export default TrickShapes;

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
