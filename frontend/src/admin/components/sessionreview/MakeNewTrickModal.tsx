import React, { useEffect, useState } from "react";
import StanceRemap from "../../../components/info/trickInfo/StanceRemap";
import { MdClose, MdSave } from "../../../data/icons/MdIcons";
import { useTrickMakerStore } from "../trickMaker/TrickMakerStore";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import { trpc } from "@utils/trpc";
const details = {
  base_id: "Backflip",
  Variations: [{ name: "Fulltwist" }, { name: "hyper" }],
  name: "Cork.hyper",
  landingStance: "BacksideHyper",
  takeoffStance: "BacksideComplete",
};
const MakeNewTrickModal = () => {
  const { data: trickParts } = trpc.trick.getTrickParts.useQuery();
  const trickType = useTrickMakerStore((s) => s.trickType);
  const getTrickInfo = useTrickMakerStore((s) => s.getTrickInfo);
  const clearTrickInfo = useTrickMakerStore((s) => s.clearTrickInfo);
  const name = useTrickMakerStore((s) => s.name);
  const takeoffStance = useTrickMakerStore((s) => s.takeoffStance);
  const landingStance = useTrickMakerStore((s) => s.landingStance);
  const base_id = useTrickMakerStore((s) => s.base_id);
  const variationsArr = useTrickMakerStore((s) => s.variationsArr);
  const setTrickType = useTrickMakerStore((s) => s.setTrickType);
  const setName = useTrickMakerStore((s) => s.setName);

  const basePoints = useTrickMakerStore((s) => s.basePoints);
  const landingStancePoints = useTrickMakerStore((s) => s.landingStancePoints);
  const setBase_id = useTrickMakerStore((s) => s.setBase_id);
  const setBasePoints = useTrickMakerStore((s) => s.setBasePoints);
  const setPowerScore = useTrickMakerStore((s) => s.setPowerScore);

  const addVariation = useTrickMakerStore((s) => s.addVariation);
  const removeVariation = useTrickMakerStore((s) => s.removeVariation);
  const trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
  const setTrickMakerOpen = useSessionSummariesStore(
    (s) => s.setTrickMakerOpen
  );
  const [allTricks, setAllTricks] = useState({
    bases: [],
    stances: [],
    variations: [],
  });
  let trickInfo = getTrickInfo();
  let powerScore =
    (variationsArr.length &&
      variationsArr?.reduce((sum, b) => {
        return sum + (b?.pointValue as number);
      }, 0)) +
    landingStancePoints +
    basePoints;

  useEffect(() => {
    setPowerScore(powerScore);
  }, [powerScore]);

  // const { mutate: saveTrick, data: response } = useSaveTrick();
  const { mutate: saveTrick, data: response } =
    trpc.trick.makeNewTrick.useMutation();
  // console.log("re-ran", getTrickInfo());
  useEffect(() => {
    let bases = trickParts?.filter((e) => e.type === "Base");
    let stances = trickParts?.filter((e) => e.type === "Stance");
    let variations = trickParts?.filter((e) => e.type === "Variation");
    //@ts-ignore
    setAllTricks({ bases, stances, variations });
    console.log(response);
    if (response?.trick_id) {
      clearTrickInfo();
      setTrickMakerOpen(false);
    }
  }, [response, trickParts]);
  return trickMakerOpen ? (
    <>
      <div className="fixed left-[2.5vw] top-[3vh] z-[4000] h-[80vh] w-[95vw] overflow-hidden rounded-xl bg-zinc-800 font-inter md:left-[15vw] md:w-[70vw]">
        <MdClose
          className={`absolute right-2 top-2 text-2xl text-zinc-300 md:text-5xl`}
          onClick={() => setTrickMakerOpen(false)}
        />
        <MdSave
          onClick={() => saveTrick(trickInfo)}
          className={`absolute right-2 top-12 text-2xl text-zinc-300 md:top-[10vh] md:text-5xl`}
        />
        <div className="flex w-full place-content-center ">
          <input
            spellCheck="false"
            placeholder="set trick name"
            onChange={(e) => setName(e.target.value)}
            type={"text"}
            value={name}
            className=" w-full bg-transparent text-center font-titan text-3xl text-zinc-300"
          />
        </div>
        <div
          onClick={() =>
            trickType === "Invert"
              ? setTrickType("Kick")
              : setTrickType("Invert")
          }
          className={`relative left-[40%] w-fit rounded-md bg-zinc-700 p-1 text-xl text-zinc-300 md:absolute md:left-2 md:top-[10vh] md:text-3xl`}
        >
          {trickType}
        </div>
        <div className="relative left-[10%] top-[12vh] text-zinc-300">
          {powerScore}
        </div>
        <div className="text-md m-2 flex flex-col items-center gap-4 text-zinc-300 md:text-3xl">
          <div className="flex min-h-[15vh]  items-center gap-2 rounded-md border-2 border-zinc-700">
            <StanceRemap trickMaker={true} stance={takeoffStance} />
            <div className="flex flex-col gap-2">
              <div className="rounded-md border-[1px] border-zinc-400 p-1 px-4 text-center">
                {(base_id !== name && base_id) || `Base Trick`}
              </div>
              <div className="flex flex-col">
                {variationsArr?.map((v) => (
                  <div
                    onClick={() => removeVariation(v)}
                    key={`${v.id}+${Math.random()}`}
                    className="border-2 border-purple-400 p-1 px-4 first:rounded-t-md first:border-b-[1px] last:rounded-b-md last:border-t-[1px]"
                  >
                    {v?.name}
                  </div>
                ))}
              </div>
            </div>
            <StanceRemap trickMaker={true} stance={landingStance} />
          </div>
          <div className="no-scrollbar grid h-[52vh] max-w-[90vw] grid-cols-2 flex-col gap-2 overflow-hidden overflow-y-scroll rounded-md pb-12 text-base text-zinc-800  md:flex-row md:overflow-visible lg:flex">
            <div className="h-fit rounded-md bg-zinc-300 p-1">
              {allTricks.bases?.map((base) => (
                <p
                  onClick={() => {
                    setBase_id(base.name);
                    setBasePoints(base.pointValue);
                  }}
                  className="mt-2 rounded-md bg-zinc-800 bg-opacity-20 p-1 first:mt-0"
                >
                  {base.name}
                </p>
              ))}
            </div>
            <div className="rounded-md  bg-emerald-300 p-1">
              {allTricks.stances?.map((stance) => (
                <ChooseStance stance={stance} />
              ))}
            </div>
            <div className="col-span-2 h-full  rounded-md bg-purple-300 p-1 md:columns-3">
              {allTricks.variations
                ?.sort((a, b) => {
                  if (a.variationType < b.variationType) return -1;
                  if (a.variationType > b.variationType) return 1;
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                ?.map((variation) => (
                  <div
                    onClick={() => addVariation(variation)}
                    className="mt-2 flex place-items-center justify-between gap-2 rounded-md bg-zinc-800 bg-opacity-20 p-1 first:mt-0"
                  >
                    <p className="w-1/3">{variation.name}</p>
                    <div className="flex w-1/3 place-items-center gap-2">
                      <p>{variation.variationType}</p>
                      {variation.variationType === "Kick" && (
                        <p
                          className={`${
                            variation.value[0] === "R"
                              ? "bg-zinc-400"
                              : "bg-zinc-600"
                          } place-self-end rounded-md bg-opacity-40 px-2 text-[8pt]`}
                        >
                          {variation.value[0]}
                        </p>
                      )}
                    </div>
                    <p className="w-1/6 text-xs">{variation.pos}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 z-[3400] h-[100vh] w-[100vw] backdrop-blur-sm" />
    </>
  ) : null;
};

export default MakeNewTrickModal;

const ChooseStance = ({ stance }) => {
  const [choosingStance, setChoosingStance] = useState(false);
  const setTakeoffStance = useTrickMakerStore((s) => s.setTakeoffStance);
  const setLandingStance = useTrickMakerStore((s) => s.setLandingStance);
  const setLandingStancePoints = useTrickMakerStore(
    (s) => s.setLandingStancePoints
  );
  return (
    <div className="mt-2 first:mt-0">
      {choosingStance ? (
        <div className="flex gap-2">
          <div
            className="w-1/2 rounded-md bg-zinc-800 bg-opacity-40 p-1 hover:bg-emerald-600"
            onClick={() => {
              setTakeoffStance(stance.name);
              setChoosingStance(false);
            }}
          >
            Takeoff
          </div>
          <div
            className="w-1/2 rounded-md bg-zinc-800 bg-opacity-40 p-1 hover:bg-emerald-600"
            onClick={() => {
              setLandingStance(stance.name);
              setLandingStancePoints(stance.pointValue);
              setChoosingStance(false);
            }}
          >
            Landing
          </div>
        </div>
      ) : (
        <p
          onClick={() => setChoosingStance(true)}
          className=" rounded-md bg-zinc-800 bg-opacity-20 p-1"
        >
          {stance.name}
        </p>
      )}
    </div>
  );
};
