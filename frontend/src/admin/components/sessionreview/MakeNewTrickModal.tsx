import React, { useEffect, useState } from "react";
import StanceRemap from "../../../components/info/trickInfo/StanceRemap";
import { MdClose, MdSave } from "../../../data/icons/MdIcons";
import { useTrickMakerStore } from "../trickMaker/TrickMakerStore";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import { trpc } from "@utils/trpc";
import { IoMdQuote } from "react-icons/io";
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
  const displayName = useTrickMakerStore((s) => s.displayName);
  const takeoffStance = useTrickMakerStore((s) => s.takeoffStance);
  const landingStance = useTrickMakerStore((s) => s.landingStance);
  const base_id = useTrickMakerStore((s) => s.base_id);
  const variationsArr = useTrickMakerStore((s) => s.variationsArr);
  const setTrickType = useTrickMakerStore((s) => s.setTrickType);
  const setName = useTrickMakerStore((s) => s.setName);
  const setDisplayName = useTrickMakerStore((s) => s.setDisplayName);

  const basePoints = useTrickMakerStore((s) => s.basePoints);
  const landingStancePoints = useTrickMakerStore((s) => s.landingStancePoints);
  const setBase_id = useTrickMakerStore((s) => s.setBase_id);
  const setBasePoints = useTrickMakerStore((s) => s.setBasePoints);
  const setPowerScore = useTrickMakerStore((s) => s.setPowerScore);

  const setTakeoffStance = useTrickMakerStore((s) => s.setTakeoffStance);
  const setLandingStance = useTrickMakerStore((s) => s.setLandingStance);
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
  const [variationFilter, setVariationFilter] = useState("All");
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
  useEffect(() => {
    let bases = trickParts?.filter((e) => e.type === "Base");
    let stances = trickParts?.filter((e) => e.type === "Stance");
    let variations = trickParts?.filter((e) => e.type === "Variation");
    //@ts-ignore
    setAllTricks({ bases, stances, variations });
    if (response?.trick_id) {
      clearTrickInfo();
      setTrickMakerOpen(false);
    }
  }, [response, trickParts]);
  const saveDisabled =
    trickInfo.name === "" ||
    trickInfo.name === null ||
    trickInfo.base_id === null ||
    trickInfo.takeoffStance === null ||
    trickInfo.landingStance === null ||
    trickInfo.trickType === null;
  return trickMakerOpen ? (
    <>
      <div className="fixed left-[2.5vw] top-10 z-[4000] h-[84vh] w-[95vw] overflow-hidden rounded-xl bg-zinc-800 font-inter md:left-[7.5vw] md:w-[70vw]">
        <MdClose
          className={`absolute left-2 top-2 text-2xl text-zinc-300 md:text-5xl`}
          onClick={() => setTrickMakerOpen(false)}
        />

        <div className="flex w-full flex-col place-content-center ">
          <input
            spellCheck="false"
            placeholder="set technical name"
            onChange={(e) => setName(e.target.value)}
            type={"text"}
            value={name}
            className="w-full bg-transparent p-2 text-center font-inter text-xl font-semibold text-zinc-300 outline-none md:text-3xl"
          />{" "}
          <input
            spellCheck="false"
            placeholder="set dislay name"
            onChange={(e) => setDisplayName(e.target.value)}
            type={"text"}
            value={displayName}
            className="w-full bg-transparent p-2 text-center font-inter text-xl font-semibold text-zinc-300 outline-none md:text-3xl"
          />{" "}
        </div>
        <div className="text-md m-2 flex flex-col items-center gap-4 text-zinc-300 md:text-3xl">
          <div className="flex w-full justify-around gap-2 p-2">
            <button
              className="h-fit w-fit place-self-center rounded-md border-[1px] border-zinc-300 px-2 py-1 text-xl text-zinc-300 md:text-3xl"
              onClick={() => setDisplayName(name)}
            >
              <IoMdQuote />
            </button>{" "}
            <div className="flex flex-col items-center gap-0 ">
              <div
                onClick={() =>
                  trickType === "Invert"
                    ? setTrickType("Kick")
                    : setTrickType("Invert")
                }
                className={`w-fit rounded-md bg-zinc-700 p-1 text-xl text-zinc-300 md:text-3xl`}
              >
                {trickType}
              </div>
              <div className=" text-center text-zinc-300">{powerScore}</div>
            </div>
            <button
              disabled={saveDisabled}
              onClick={() => saveTrick(trickInfo)}
              className={`${
                saveDisabled
                  ? "border-zinc-600 text-zinc-600"
                  : "border-zinc-300 text-zinc-300"
              } h-fit  w-fit place-self-center rounded-md border-[1px] px-2 py-1 text-xl md:text-3xl`}
            >
              <MdSave />
            </button>
          </div>

          <div className="flex min-h-[15vh]  items-center gap-2 rounded-md border-2 border-zinc-700">
            <div onClick={() => setTakeoffStance(null)}>
              <StanceRemap trickMaker={true} stance={takeoffStance} />
            </div>
            <div className="flex flex-col gap-2">
              <div
                onClick={() => setBase_id(null)}
                className="rounded-md border-[1px] border-zinc-400 p-1 px-4 text-center"
              >
                {(base_id !== name && base_id) ||
                  (base_id === null ? "Select Base" : `Base Trick`)}
              </div>
              <div className="flex flex-col">
                {variationsArr?.map((v) => (
                  <div
                    onClick={() => removeVariation(v)}
                    key={`${v.id}+${Math.random()}`}
                    className="border-2 border-purple-400 p-1 px-4 first:rounded-t-md first:border-b-[1px] last:rounded-b-md last:border-t-[1px]"
                  >
                    {v?.name}
                    <p className="text-center text-xs">{v.pos}</p>
                  </div>
                ))}
              </div>
            </div>
            <div onClick={() => setLandingStance(null)}>
              <StanceRemap trickMaker={true} stance={landingStance} />
            </div>
          </div>
          <div className="no-scrollbar flex h-[52vh] w-full max-w-[90vw]  flex-col gap-2  overflow-y-scroll rounded-md pb-16 text-base text-zinc-800  ">
            {!base_id && (
              <div className="h-fit  rounded-md bg-zinc-300 p-1 pb-12">
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
            )}
            {(trickInfo.takeoffStance === null ||
              trickInfo.landingStance === null) &&
              trickInfo.base_id !== null && (
                <div className="no-scrollbar h-fit overflow-y-scroll rounded-md bg-emerald-300 p-1 pb-12 ">
                  {allTricks.stances?.map((stance) => (
                    <ChooseStance stance={stance} />
                  ))}
                </div>
              )}
            {trickInfo.base_id !== null &&
              trickInfo.takeoffStance !== null &&
              trickInfo.landingStance !== null && (
                <div className="  h-fit w-full place-content-start space-y-2 place-self-start rounded-md bg-purple-300 p-1  ">
                  <VariationFilterNav
                    variationFilter={variationFilter}
                    setVariationFilter={setVariationFilter}
                  />
                  <div className=" flex  w-full flex-col place-content-start justify-around gap-2 pb-12  md:flex-row md:flex-wrap">
                    {allTricks.variations
                      ?.sort((a, b) => {
                        if (a.variationType < b.variationType) return -1;
                        if (a.variationType > b.variationType) return 1;
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                      })
                      .filter((variation) => {
                        if (variationFilter === "All") {
                          return variation;
                        }
                        if (variationFilter === variation.variationType)
                          return variation;
                        if (variationFilter === "Other") {
                          return (
                            variation.variationType !== "Kick" &&
                            variation.variationType !== "Rotation" &&
                            variation.variationType !== "Touchdown" &&
                            variation.variationType !== "Shape"
                          );
                        }
                      })
                      ?.map((variation) => (
                        <div
                          onClick={() => addVariation(variation)}
                          className=" flex h-fit place-items-center justify-between gap-2 rounded-md bg-zinc-800 bg-opacity-20 p-1 md:w-[30%]"
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
              )}
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 z-[3400] h-[100vh] w-[100vw] backdrop-blur-sm" />
    </>
  ) : null;
};

export default MakeNewTrickModal;
const VariationFilterNav = ({ setVariationFilter, variationFilter }) => {
  return (
    <div className="no-scrollbar sticky top-1 flex w-full place-items-center justify-between gap-2 overflow-x-scroll rounded-md bg-zinc-800 bg-opacity-40 text-zinc-200">
      <p
        onClick={(e) => setVariationFilter("All")}
        className={`rounded-md bg-zinc-800  p-1 ${
          variationFilter === "All"
            ? " bg-opacity-70 text-zinc-200 "
            : "bg-opacity-30 text-zinc-400"
        }`}
      >
        All
      </p>
      <p
        onClick={(e) => setVariationFilter("Kick")}
        className={`rounded-md bg-zinc-800  p-1 ${
          variationFilter === "Kick"
            ? " bg-opacity-70 text-zinc-200 "
            : "bg-opacity-30 text-zinc-400"
        }`}
      >
        Kicks
      </p>
      <p
        onClick={(e) => setVariationFilter("Rotation")}
        className={`rounded-md bg-zinc-800  p-1 ${
          variationFilter === "Rotation"
            ? " bg-opacity-70 text-zinc-200 "
            : "bg-opacity-30 text-zinc-400"
        }`}
      >
        Rotations
      </p>
      <p
        onClick={(e) => setVariationFilter("Shape")}
        className={`rounded-md bg-zinc-800  p-1 ${
          variationFilter === "Shape"
            ? " bg-opacity-70 text-zinc-200 "
            : "bg-opacity-30 text-zinc-400"
        }`}
      >
        Shapes
      </p>
      <p
        onClick={(e) => setVariationFilter("Touchdown")}
        className={`rounded-md bg-zinc-800  p-1 ${
          variationFilter === "Touchdown"
            ? " bg-opacity-70 text-zinc-200 "
            : "bg-opacity-30 text-zinc-400"
        }`}
      >
        Touchdowns
      </p>
      <p
        onClick={(e) => setVariationFilter("Other")}
        className={`rounded-md bg-zinc-800  p-1 ${
          variationFilter === "Other"
            ? "bg-opacity-70 text-zinc-200"
            : "bg-opacity-30 text-zinc-400"
        }`}
      >
        Other
      </p>
    </div>
  );
};

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
