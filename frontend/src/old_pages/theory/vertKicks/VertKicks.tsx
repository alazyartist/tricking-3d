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
                <div className="flex w-full place-content-center gap-8">
                  <button
                    className={`rounded-md border-2 bg-zinc-800 p-2 hover:bg-zinc-600 ${
                      dir === "Backside" ? "border-zinc-300" : "border-zinc-800"
                    }`}
                    onClick={() => setActiveDir("Backside")}
                  >
                    Backside
                  </button>
                  <button
                    className={`boder-zinc-800 rounded-md border-2 bg-zinc-800 p-2 hover:bg-zinc-600 ${
                      dir === "Frontside"
                        ? "border-zinc-300"
                        : "border-zinc-800"
                    }`}
                    onClick={() => setActiveDir("Frontside")}
                  >
                    Frontside
                  </button>
                </div>
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
      <WhyThisWay />
    </div>
  );
};

export default VertKicks;

const WhyThisWay = () => {
  const relevantTerms = [
    {
      term: "Backside",
      definition: "Kicks taking off from the backside stance with boh legs",
    },
    {
      term: "Vanish",
      definition: "Kicks taking off from Backside off the right leg",
    },
    {
      term: "Swing",
      definition: "Kicks taking off from Backside off the left leg",
    },
    {
      term: "Frontside",
      definition: "Kicks taking off from the frontside stance with both legs",
    },
    {
      term: "Step-Over",
      definition: "Kicks taking off from the frontside stance off the left leg",
    },
    {
      term: "Wrap",
      definition:
        "Kicks taking off from Frontside off the right(round kicking) leg",
    },
    {
      term: "Round",
      definition: "denotes which leg is used to kick the target",
    },
    {
      term: "Hook",
      definition: "denotes which leg is used to kick the target",
    },
    {
      term: "Swipe",
      definition:
        "specifies a round kick that lands on the kicking leg. in the past the term hyper was used to describe this variation",
    },
    {
      term: "Shuriken",
      definition:
        "specifies a hook kick that lands on the kicking leg. in the past the term hyper was used to describe this variation",
    },
    {
      term: "Turbo",
      definition:
        "specifies any kick that lands with both legs simultaneously. in the past the term hyper-style was used to describe this variation",
    },
    {
      term: "Double",
      definition:
        "this refers to tricks where the kicker performs two kicks with the same legin the same jump",
    },
    {
      term: "Triple",
      definition:
        "this refers to tricks where the kicker performs three kicks with the same leg in the same jump",
    },
    {
      term: "Knife",
      definition:
        "a swipe-hook variation where the swipe is combined with a hook kick, most comonly seen in the Jackknife. this is the equivalent of the boxcutter from invert tricks",
    },
    {
      term: "Dleg",
      definition:
        'a variation where the kicker performs a double leg kick where both legs "strike the target".',
    },
    {
      term: "Late-",
      definition:
        "refers to kicks that take place after the performer has already landed on the ground. this is the same oas the late- prefix from invert tricks",
    },
  ];
  return (
    <div className="mb-14 w-full rounded-md  p-4 text-zinc-300">
      <h1 className="w-full pb-0 font-virgil text-xl">Why This Way?</h1>
      <p className="font-inter font-normal text-zinc-400">
        Our system is based around the idea that we should name a trick using
        its actual rotation before the kick from the stance you took off from,
        not some arbitrary number that doesn't tell you anything about the
        trick. By doing this we can create a system that is both more intuitive
        and more flexible.
      </p>
      <h1 className="w-full pb-0 font-virgil text-xl">Relevant Terms</h1>
      <div className="flex flex-col gap-2">
        {relevantTerms.map((term, i) => (
          <div key={i} className="flex gap-2">
            <div className="h-fit rounded-md bg-zinc-800 p-1 font-inter font-semibold text-zinc-400">
              {term.term}:{" "}
            </div>
            <div className="p-1 font-inter font-normal text-zinc-400">
              {term.definition}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
