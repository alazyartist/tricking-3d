import React, { useEffect } from "react";
import Link from "next/link";
import { transArr } from "../../../data/TricklistClass";
import { whichLeg } from "../../comboMaker/components/ArrayDisplay";
import { trpc } from "@utils/trpc";
function Transitions() {
  const { data: transitions } = trpc.transition.getTransitions.useQuery();
  const [typeFilter, setTypeFilter] = React.useState("Singular");
  const [legs, setLegs] = React.useState({ from: "Left", to: "Right" });
  const filteredTransitions = transitions
    .filter((tr) => tr.fromLeg === legs.from && tr.toLeg === legs.to)
    .filter((tr) => {
      if (tr.transitionType === typeFilter) {
        return tr;
      }
      if (typeFilter === "All") {
        return tr;
      }
    });
  return (
    <>
      <div className="mt-4 flex flex-col place-content-center place-items-center font-inter font-bold text-zinc-300">
        <div
          onClick={() => setTypeFilter("All")}
          className="text-xl font-black text-white"
        >
          Transitions
        </div>
        {/* <div className="flex gap-2">
          <Link href="all">All</Link>
          <Link href="singular">Singular</Link>
          <Link href="sequential">Sequential</Link>
          <Link href="unified">Unified</Link>
        </div> */}
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-3 rounded-md bg-zinc-800 p-2">
            <div>From</div>
            <div className="flex gap-3">
              <button
                className={`${legs.from === "Left" ? "text-red-500" : ""}`}
                onClick={() => setLegs((l) => ({ ...l, from: "Left" }))}
              >
                Left
              </button>
              <button
                className={`${legs.from === "Right" ? "text-red-500" : ""}`}
                onClick={() => setLegs((l) => ({ ...l, from: "Right" }))}
              >
                Right
              </button>
              <button
                className={`${legs.from === "Both" ? "text-red-500" : ""}`}
                onClick={() => setLegs((l) => ({ ...l, from: "Both" }))}
              >
                Both
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-md bg-zinc-800 p-2">
            <div>To</div>
            <div className="flex gap-3">
              <button
                className={`${legs.to === "Left" ? "text-red-500" : ""}`}
                onClick={() => setLegs((l) => ({ ...l, to: "Left" }))}
              >
                Left
              </button>
              <button
                className={`${legs.to === "Right" ? "text-red-500" : ""}`}
                onClick={() => setLegs((l) => ({ ...l, to: "Right" }))}
              >
                Right
              </button>
              <button
                className={`${legs.to === "Both" ? "text-red-500" : ""}`}
                onClick={() => setLegs((l) => ({ ...l, to: "Both" }))}
              >
                Both
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {["All", "Singular", "Sequential", "Unified"].map((type) => {
            return (
              <button
                className={`${typeFilter === type ? "text-red-500" : ""}`}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </button>
            );
          })}
        </div>
        <div className="minimalistScroll flex h-[55vh] w-full flex-col gap-2 overflow-y-auto rounded-md">
          <div>Transitions Array</div>
          {filteredTransitions.map((tr) => {
            return (
              <div className=" flex flex-row place-content-center place-items-center justify-around gap-2 rounded-xl bg-black bg-opacity-40 p-1">
                <div className="w-[150px] text-xl font-bold">{tr.name}</div>
                <div className="fill-zinc-500 text-sm">
                  {tr.fromLeg && whichLeg(tr.fromLeg)}
                </div>
                <div className="fill-zinc-500 text-sm">
                  {tr.toLeg && whichLeg(tr.toLeg)}
                </div>
              </div>
            );
          })}
          {filteredTransitions.length === 0 && (
            <div className="text-xl font-bold">No transitions found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Transitions;
