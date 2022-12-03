import React, { useState } from "react";
import { MdClose } from "../../../data/icons/MdIcons";
import {
  SetupShape,
  TricksShape,
  TransitionShape,
  StanceShape,
} from "./SVGTrickShapes";

const TrickShapes = ({ newCombo, allTricks, lastItem, setCurrentItem }) => {
  const [activeDropdown, setActiveDropdown] = useState("");
  return (
    <>
      {activeDropdown !== "" && (
        <div
          className="absolute top-[23vh] right-[15vw] text-4xl"
          onClick={() => setActiveDropdown("")}
        >
          <MdClose />
        </div>
      )}
      <div className=" flex h-fit w-[98vw] flex-wrap place-content-center place-items-end gap-2 text-zinc-300">
        {newCombo?.length <= 0 && (
          <SetupShape
            onClick={() => setActiveDropdown("Transition")}
            className={
              " top-0 h-fit w-fit flex-shrink-0 fill-zinc-300 stroke-zinc-300"
            }
          />
        )}
        {lastItem?.type !== "Transition" && (
          <TransitionShape
            onClick={() => setActiveDropdown("Transition")}
            className={
              " top-0 h-fit w-fit flex-shrink-0 fill-zinc-300 stroke-zinc-300"
            }
          />
        )}
        {lastItem?.type !== "Trick" && (
          <TricksShape
            onClick={() => setActiveDropdown("Trick")}
            className={
              " top-0 h-fit w-fit flex-shrink-0 fill-zinc-300 stroke-zinc-300"
            }
          />
        )}
        {lastItem?.type !== "Stance" && (
          <StanceShape
            onClick={() => setActiveDropdown("Stance")}
            className={
              " top-0 h-fit w-fit flex-shrink-0 fill-zinc-300 stroke-zinc-300"
            }
          />
        )}
        {/*
				<BaseLine
					className={" top-0 h-fit w-1/4 flex-shrink-0 stroke-zinc-300"}
				/>{" "}
				*/}
      </div>
      {activeDropdown === "Trick" && (
        <div className="no-scrollbar absolute bottom-[10vh] left-[10vw] z-[20] flex h-[62vh] w-[80vw] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md">
          {allTricks?.map((trick) =>
            trick.type === "Trick" ? (
              <div
                className="w-full rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center hover:bg-zinc-700"
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
      {activeDropdown === "Transition" && (
        <div className="no-scrollbar absolute bottom-[10vh] left-[10vw] z-[20] flex h-[62vh] w-[80vw] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md">
          {allTricks?.map((trick) =>
            trick.type === "Transition" ? (
              <div
                className="flex w-full justify-between rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center"
                onClick={() => {
                  setCurrentItem((s) => [...s, trick]);
                  setActiveDropdown("");
                }}
                key={trick.trick_id}
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
        <div className="no-scrollbar absolute bottom-[10vh] left-[10vw] z-[20] flex h-[62vh] w-[80vw] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md">
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
