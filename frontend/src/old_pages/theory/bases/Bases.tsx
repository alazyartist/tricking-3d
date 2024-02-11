import { whichLeg } from "@old_pages/comboMaker/components/ArrayDisplay";
import { getStanceColor } from "@utils/styles";
import { trpc } from "@utils/trpc";
import React from "react";

const Bases = () => {
  const { data: bases } = trpc.trick.getBases.useQuery();
  const [activeBase, setActiveBase] = React.useState(null);
  const sortBases = (a, b) => {
    if (a.name === "VertF") return 1;
    if (b.name === "VertF") return -1;
    if (a.name === "VertB") return 1;
    if (b.name === "VertB") return -1;
    const directionOrder = ["Backwards", "Inside", "Forwards", "Outside"];
    const legOrder = ["Both", "Left", "Right"];
    const directionDifference =
      directionOrder.indexOf(a.direction) - directionOrder.indexOf(b.direction);
    if (directionDifference === 0) {
      return legOrder.indexOf(a.fromLeg) - legOrder.indexOf(b.fromLeg);
    }
    return directionDifference;
  };

  return (
    <div className="w-[90vw] text-zinc-300 md:w-[60vw]">
      <h1 className="text-xl">Bases</h1>
      <div className="flex flex-col gap-2">
        {bases?.sort(sortBases).map((base) => {
          return (
            <div
              key={base.base_id}
              onClick={() =>
                setActiveBase((prev) => (prev === base ? null : base))
              }
              className="flex flex-col gap-2 rounded-xl bg-zinc-800/40 p-2"
            >
              <div className="w-full text-center text-2xl font-bold">
                {base.name}
              </div>
              <div className="w-full text-center text-xs font-semibold">
                {base.direction}
              </div>
              <div className="flex justify-around gap-2">
                <div className="text-md fill-zinc-500 font-semibold">
                  {whichLeg(base.fromLeg)}
                </div>
                <div className="text-md fill-zinc-500 font-semibold">
                  {whichLeg(base.toLeg)}
                </div>
              </div>
              <div className="flex justify-around gap-2">
                <div
                  className={`rounded-md border-[2px] p-2 py-1 text-sm font-semibold`}
                  style={{
                    borderColor: getStanceColor(base.takeoffStance),
                  }}
                >
                  {base.takeoffStance}
                </div>
                <div
                  className={`rounded-md border-[2px] p-2 py-1 text-sm font-semibold`}
                  style={{
                    borderColor: getStanceColor(base.landingStance),
                  }}
                >
                  {base.landingStance}
                </div>
              </div>
              {activeBase && activeBase.base_id === base.base_id && (
                <TricksByBase base={base.name} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TricksByBase = ({ base }) => {
  const { data: tricks } = trpc.trick.getTricksByBase.useQuery({ base });
  return (
    <div className="minimalistScroll flex h-[40vh] flex-col gap-2 overflow-y-scroll">
      <h1 className="text-xl">{base}</h1>
      {tricks
        ?.sort((a, b) => {
          if (a.name === base) return -1;
        })
        .map((trick) => {
          return (
            <div
              key={trick.trick_id}
              className="flex flex-col gap-2 rounded-xl bg-zinc-800/40 p-2"
            >
              <div className="w-full text-center text-2xl font-bold">
                {trick.name}
              </div>
              <div className="w-full text-center text-xs font-semibold">
                {trick.displayName}
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Bases;
