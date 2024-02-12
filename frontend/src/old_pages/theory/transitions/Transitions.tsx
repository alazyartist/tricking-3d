import React, { useEffect } from "react";
import Link from "next/link";
import { transArr } from "../../../data/TricklistClass";
import { whichLeg } from "../../comboMaker/components/ArrayDisplay";
import { trpc } from "@utils/trpc";
import { MdInfoOutline } from "@data/icons/MdIcons";
import { transitions, tricks } from "@prisma/client";
import { useRouter } from "next/router";
function Transitions() {
  const { data: transitions } = trpc.transition.getTransitions.useQuery();
  const [typeFilter, setTypeFilter] = React.useState("Singular");
  const [legs, setLegs] = React.useState({ from: "Left", to: "Left" });
  const filteredTransitions = transitions
    ?.filter((tr) => tr.fromLeg === legs.from && tr.toLeg === legs.to)
    ?.filter((tr) => {
      if (tr.transitionType === typeFilter) {
        return tr;
      }
      if (typeFilter === "All") {
        return tr;
      }
    });
  const [activeTransition, setActiveTransition] = React.useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      const transition = transitions?.find(
        (t) => t.id === parseInt(id as string)
      );
      console.log(transitions, transition, id);
      setActiveTransition(transition);
      setTypeFilter(transition?.transitionType);
      setLegs({ from: transition?.fromLeg, to: transition?.toLeg });
    }
  }, [id]);
  return (
    <>
      <div className="flex w-[90vw] flex-col place-content-center place-items-center rounded-lg bg-zinc-900 bg-opacity-70 font-inter font-bold text-zinc-300 lg:w-[60vw]">
        <div
          onClick={() => setTypeFilter("All")}
          className="p-4 text-xl font-black text-white"
        >
          Transitions
        </div>
        {/* <div className="flex gap-2">
          <Link href="all">All</Link>
          <Link href="singular">Singular</Link>
          <Link href="sequential">Sequential</Link>
          <Link href="unified">Unified</Link>
        </div> */}
        <div className="flex w-full items-center justify-around p-2 text-sm lg:w-[60vw] lg:text-2xl ">
          <div className="flex flex-col items-center gap-2 rounded-md bg-zinc-800 p-2 ">
            <div>From</div>
            <div className="flex gap-2 lg:gap-6 lg:p-4">
              <button
                className={`${
                  legs.from === "Left" ? "text-indigo-500" : ""
                } flex flex-col place-content-center place-items-center`}
                onClick={() => {
                  setLegs((l) => ({ ...l, from: "Left" }));
                  if (legs.to === "Left") setTypeFilter("Singular");
                  if (legs.to === "Right") setTypeFilter("Sequential");
                  if (legs.to === "Both") setTypeFilter("Unified");
                }}
              >
                {whichLeg("Left")}
                Left
              </button>
              <button
                className={`${
                  legs.from === "Right" ? "text-indigo-500" : ""
                } flex flex-col place-content-center place-items-center`}
                onClick={() => {
                  setLegs((l) => ({ ...l, from: "Right" }));
                  if (legs.to === "Right") setTypeFilter("Singular");
                  if (legs.to === "Left") setTypeFilter("Sequential");
                  if (legs.to === "Both") setTypeFilter("Unified");
                }}
              >
                {whichLeg("Right")}
                Right
              </button>
              <button
                className={`${
                  legs.from === "Both" ? "text-indigo-500" : ""
                } flex flex-col place-content-center place-items-center`}
                onClick={() => setLegs((l) => ({ ...l, from: "Both" }))}
              >
                {whichLeg("Both")}
                Both
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-md bg-zinc-800 p-2">
            <div>To</div>
            <div className="flex place-content-center gap-2 lg:gap-6 lg:p-4">
              <button
                className={`${
                  legs.to === "Left" ? "text-indigo-500" : ""
                } flex flex-col place-content-center place-items-center `}
                onClick={() => {
                  setLegs((l) => ({ ...l, to: "Left" }));
                  if (legs.from === "Left") setTypeFilter("Singular");
                  if (legs.from === "Right") setTypeFilter("Sequential");
                  if (legs.from === "Both") setTypeFilter("Unified");
                }}
              >
                {whichLeg("Left")}
                Left
              </button>
              <button
                className={`${
                  legs.to === "Right" ? "text-indigo-500" : ""
                } flex flex-col place-content-center place-items-center`}
                onClick={() => {
                  setLegs((l) => ({ ...l, to: "Right" }));
                  if (legs.from === "Right") setTypeFilter("Singular");
                  if (legs.from === "Left") setTypeFilter("Sequential");
                  if (legs.from === "Both") setTypeFilter("Unified");
                }}
              >
                {whichLeg("Right")}
                Right
              </button>
              <button
                className={`${
                  legs.to === "Both" ? "text-indigo-500" : ""
                } flex flex-col place-content-center place-items-center`}
                onClick={() => {
                  setLegs((l) => ({ ...l, to: "Both" }));
                  setTypeFilter("Unified");
                }}
              >
                {whichLeg("Both")}
                Both
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 lg:p-4 lg:text-2xl">
          {["All", "Singular", "Sequential", "Unified"].map((type) => {
            return (
              <button
                key={type + "filter"}
                className={`${typeFilter === type ? "text-indigo-500" : ""}`}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </button>
            );
          })}
        </div>
        <div className="no-scrollbar flex h-fit max-h-[55vh] w-full max-w-[80vw] flex-col gap-2 overflow-y-auto rounded-md">
          {filteredTransitions?.map((tr) => {
            return (
              <div
                key={tr.id}
                onClick={() => setActiveTransition(tr)}
                className="flex  flex-row place-content-center place-items-center justify-around gap-2 rounded-xl bg-zinc-900 bg-opacity-40 p-1"
              >
                <div
                  className={`w-[150px] text-xl font-bold ${
                    tr?.id === activeTransition?.id
                      ? "text-indigo-500"
                      : "text-zinc-300"
                  }`}
                >
                  {tr.name}
                </div>
                <div className="fill-zinc-500 text-sm">
                  {tr.fromLeg && whichLeg(tr.fromLeg)}
                </div>
                <div className="fill-zinc-500 text-sm">
                  {tr.toLeg && whichLeg(tr.toLeg)}
                </div>
              </div>
            );
          })}
          {filteredTransitions?.length === 0 && (
            <div className="text-xl font-bold">No transitions found</div>
          )}
        </div>
        <TransitionCombos activeTransition={activeTransition} />
      </div>
    </>
  );
}

export default Transitions;

const TransitionCombos = ({ activeTransition }) => {
  const { data: combos } = trpc.transition.getCombosWithTransition.useQuery({
    id: activeTransition?.id,
  });

  return (
    <div className="flex w-full flex-col gap-2">
      {combos &&
        combos?.map((combo) => {
          const comboArray = combo.comboArray as (tricks | transitions)[];
          return (
            <div
              key={combo.combo_id}
              className="flex flex-col place-content-center place-items-center justify-around gap-2 rounded-xl bg-zinc-900 bg-opacity-40 p-1"
            >
              <div className=" flex w-full overflow-x-scroll whitespace-normal break-keep p-2 text-sm font-bold">
                {comboArray.map((trick, i) => {
                  return (
                    <span key={i + combo.combo_id}>
                      {trick.name}
                      {i !== comboArray?.length - 1 && ">"}
                      <wbr />
                    </span>
                  );
                })}
              </div>

              <div className="flex flex-row place-items-center gap-2">
                <div className="fill-zinc-500 text-sm">
                  {combo?.Clips?.length} clips
                </div>
                <Link
                  href={`/combos/${combo.combo_id}`}
                  className="flex place-items-center justify-around gap-2 rounded-md bg-zinc-700 p-2 text-xs"
                >
                  <p>See Combo Page</p>
                  <div className="text-xs">
                    <MdInfoOutline />
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      {combos && combos.length === 0 && (
        <div className="w-full p-2 text-center text-xl font-bold">
          No combos found
        </div>
      )}
    </div>
  );
};
