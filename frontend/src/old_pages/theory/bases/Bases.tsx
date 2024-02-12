import useClickOutside from "@hooks/useClickOutside";
import { whichLeg } from "@old_pages/comboMaker/components/ArrayDisplay";
import { getStanceColor } from "@utils/styles";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
  const router = useRouter();
  const { base } = router.query;
  useEffect(() => {
    if (base) {
      const baseToOpen = bases.find((b) => b.name === base);
      setActiveBase(baseToOpen);
    }
  }, [base]);
  return (
    <div className="w-[90vw] text-zinc-300 md:w-[70vw]">
      <h1 className="w-full text-center text-2xl font-bold">Bases</h1>
      <p className="p-4 font-normal">
        Below are all the bases that are used in tricking. A base is the
        starting point for building all other tricks. Each base has a name, a
        direction, a takeoff stance, and a landing stance. The direction is the
        direction the trick is traveling, the takeoff stance is the stance the
        tricker is in when they take off, and the landing stance is the stance
        the tricker is in when they land.
      </p>
      <div className="flex w-full flex-col gap-2 md:grid md:grid-cols-6">
        {bases?.sort(sortBases).map((base) => {
          return (
            <div
              key={base.base_id}
              className={`flex flex-col gap-2 rounded-xl bg-zinc-800/40 p-2 ${
                base.name.includes("Vert") ? "col-span-3" : "col-span-2"
              }`}
            >
              <BaseDislpay base={base} />
              <button
                className="rounded-md bg-zinc-800/40 p-2 text-xs font-semibold"
                onClick={() =>
                  setActiveBase((prev) => (prev === base ? null : base))
                }
              >
                See Tricks with this Base
              </button>
              {activeBase && activeBase.base_id === base.base_id && (
                <TricksByBase close={() => setActiveBase(null)} base={base} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const BaseDislpay = ({ base }) => {
  return (
    <>
      <div className="w-full text-center text-2xl font-bold">{base.name}</div>
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
    </>
  );
};
const TricksByBase = ({ base, close }) => {
  const { data: tricks } = trpc.trick.getTricksByBase.useQuery({
    base: base.name,
  });
  const ref = useClickOutside(close);
  return (
    <div
      ref={ref}
      className="minimalistScroll absolute bottom-14 left-[5vw] flex h-[80vh] w-[90vw] flex-col gap-2 overflow-y-scroll rounded-xl bg-zinc-900/60 backdrop-blur-xl md:left-[15vw] md:w-[70vw]"
    >
      <div onClick={() => close()}>
        <BaseDislpay base={base} />
      </div>
      <p className="w-full text-center text-2xl font-bold">
        Tricks built on {base.name}
      </p>
      {tricks
        ?.sort((a, b) => {
          if (a.name === base.name) return -1;
        })
        .map((trick) => {
          return (
            <Link
              href={`/tricks/${trick.trick_id}`}
              key={trick.trick_id}
              className="flex flex-col gap-2 rounded-xl bg-zinc-800/40 p-2"
            >
              <div className="w-full text-center text-2xl font-bold">
                {trick.name}
              </div>
              <div className="w-full text-center text-xs font-semibold">
                {trick.displayName}
              </div>
            </Link>
          );
        })}
    </div>
  );
};
export default Bases;
