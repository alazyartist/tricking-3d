import { whichLeg } from "@old_pages/comboMaker/components/ArrayDisplay";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import React from "react";

const VertKicks = () => {
  const legs = [
    { leg: "Left", Backside: "Swing", Frontside: "Step-Over" },
    { leg: "Both", Backside: "Backside", Frontside: "Frontside" },
    { leg: "Right", Backside: "Vanish", Frontside: "Wrap" },
  ];
  const directions = ["Backside", "Frontside"];
  const { data: kicks } = trpc.trick.getKicks.useQuery();
  const { data: stances } = trpc.trick.findAllStances.useQuery();
  const backsideKicks = kicks
    ?.filter(
      (k) => k.stance_id.replace(/Complete|Hyper|Mega|Semi/, "") === "Backside"
    )
    ?.sort((a, b) => {
      if (a.name === "Hook") return -1;
      if (b.name === "Hook") return 1;
      return a.name?.localeCompare(b.name, "en", { numeric: true });
    });
  const frontsideKicks = kicks
    ?.filter(
      (k) => k.stance_id.replace(/Complete|Hyper|Mega|Semi/, "") === "Frontside"
    )
    ?.sort((a, b) => {
      if (a.name === "Round") return -1;
      if (b.name === "Round") return 1;

      return a.name?.localeCompare(b.name, "en", { numeric: true });
    });
  const kickMap = {
    Backside: backsideKicks,
    Frontside: frontsideKicks,
  };
  const [activeDir, setActiveDir] = React.useState("Backside");
  const [activeLeg, setActiveLeg] = React.useState("Both");
  if (!kicks || !stances) return <div>Loading Kicks...</div>;
  return (
    <div className="mb-14 rounded-md bg-zinc-900 bg-opacity-90 p-4 text-zinc-300 md:w-[60vw]">
      <h1 className="w-full pb-0 font-virgil text-xl">Vert Kicks</h1>
      <p className="font-inter font-normal text-zinc-400">
        Forget what you know about kicks from the before-time. This is the
        future. This is the way.
      </p>
      <div className="flex w-full flex-col justify-around gap-2">
        {directions.map(
          (dir, i) =>
            dir === activeDir && (
              <div
                key={i}
                className="flex w-full flex-col place-content-center place-items-center justify-around gap-2 rounded-xl border-2 border-zinc-500 p-2 "
              >
                <p
                  className="rounded-md bg-zinc-800 p-2 hover:bg-zinc-600"
                  onClick={() =>
                    setActiveDir((d) => {
                      if (d === "Backside") return "Frontside";
                      return "Backside";
                    })
                  }
                >
                  {dir}
                </p>
                <div className="flex w-full flex-row place-content-center place-items-center justify-around gap-2 rounded-xl border-2 border-zinc-500 p-2">
                  {legs.map((leg, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        setActiveLeg((l) => (l === leg.leg ? null : leg.leg))
                      }
                      className={`flex w-1/3 flex-col place-content-center place-items-center gap-2 rounded-xl border-2 hover:bg-zinc-800 ${
                        leg.leg === activeLeg
                          ? "border-zinc-200"
                          : "border-zinc-500"
                      } p-2 `}
                    >
                      <div className="fill-zinc-600 text-center text-xs">
                        {whichLeg(leg.leg)}
                      </div>
                      <div className="text-center text-xs">{leg[dir]}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap place-content-center place-items-center justify-around gap-2">
                  {kickMap[dir] &&
                    kickMap[dir]
                      ?.filter((k) =>
                        activeLeg === null
                          ? k
                          : stances.find((s) => s.name === k.stance_id).leg ===
                            activeLeg
                      )
                      ?.map((kick, i) => (
                        <Link
                          href={`/tricks/${kick.trick_id}`}
                          key={i}
                          className={`flex w-fit ${
                            kick.name === "Round" || kick.name === "Hook"
                              ? "min-w-[55%]"
                              : "min-w-[45%]"
                          } flex-row place-content-center place-items-center justify-around gap-2 rounded-xl border-2 border-zinc-500 p-2 hover:bg-zinc-800`}
                        >
                          {kick.name}
                        </Link>
                      ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default VertKicks;
