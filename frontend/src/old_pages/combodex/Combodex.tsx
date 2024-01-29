import RadarChart from "@components/d3/RadarChartAI";
import { ComboDetailsDisplay } from "@old_pages/userProfile/components/ProfileSessionInfo";
import React, { useEffect, useState } from "react";
import { IoIosWalk } from "react-icons/io";
import { trpc } from "utils/trpc";
import ComboExecutionSlider from "./components/ComboExecutionSlider";
import Link from "next/link";
import TrickPieChart from "@components/d3/TrickPieChart";
interface CombodexProps {
  combo: any;
  sessionData?: any;
  comboArray?: Array<any>;
  setCombodexopen?: any;
  totalScoreRes?: any;
  updateTotalScore?: any;
}

export const useExecutionSlider = (sessionData) => {
  const { data: totalScoreRes, mutateAsync: updateTotalScore } =
    trpc.sessionsummaries.updateTotalScore.useMutation();
  const { data: sessiondatascores } =
    trpc.sessionsummaries.getSessionDataScores.useQuery(
      {
        sessiondataid: sessionData.id,
      },
      { enabled: true }
    );
  const [executionScore, setExecutionScore] = useState(
    sessionData?.executionAverage ?? 0.1
  );

  let executionAverage =
    sessiondatascores?.reduce((sum, b) => sum + b.executionScore, 0) /
      sessiondatascores?.length || 0;
  let executionScoreTotal =
    executionAverage * (sessionData?.powerScore + sessionData.varietyScore);
  const localTotalScore = (
    sessionData?.chainTotal +
    sessionData?.powerScore +
    sessionData?.varietyScore +
    sessionData?.bonusScore +
    executionScoreTotal
  )?.toFixed(2);

  useEffect(() => {
    if (localTotalScore !== "NaN") {
      updateTotalScore({
        sessiondataid: sessionData.id,
        totalScore: parseFloat(localTotalScore),
        executionAverage: parseFloat(executionAverage.toFixed(3)),
      });
    }
  }, [localTotalScore]);

  useEffect(() => {
    if (executionAverage) {
      setExecutionScore(executionAverage);
    }
  }, [executionAverage]);

  return {
    executionScore,
    setExecutionScore,
    executionAverage,
    executionScoreTotal,
    localTotalScore,
  };
};
const Combodex: React.FC<CombodexProps> = ({
  comboArray,
  combo,
  sessionData,
  setCombodexopen,
  totalScoreRes,
  updateTotalScore,
}) => {
  const [executionOpen, setExecutionOpen] = useState(false);

  const { data: tricks, mutateAsync: getTricks } =
    trpc.trick.findMultipleById.useMutation();
  const numOfTransitions = combo.comboArray?.filter(
    (t) => t.type === "Transition" && t
  ).length;
  const numOfTricks = combo.comboArray?.filter(
    (t) => t.type === "Trick" && t
  ).length;

  const {
    executionScore,
    setExecutionScore,
    executionAverage,
    executionScoreTotal,
    localTotalScore,
  } = useExecutionSlider(sessionData);
  // console.log(
  //   executionAverage,
  //   executionScoreTotal,
  //   sessionData.executionAverage,
  //   sessionData.powerScore
  // );

  const composition = tricks
    ?.filter((t) => t.type === "Trick")
    .map((t) => {
      //@ts-ignore
      return t?.variations.filter(
        (tr) =>
          tr.variation.name === "FullTwist" || tr.variation.name === "Twist"
      ).length;
    });

  useEffect(() => {
    getTricks(combo.comboArray);
  }, []);

  let mostUsed = Object.keys(sessionData?.trickCount)
    ?.filter((key) => sessionData?.trickCount[key].count > 1)
    .sort((a, b) =>
      sessionData?.trickCount[a]?.count > sessionData?.trickCount[b]?.count
        ? -1
        : 1
    );
  let trickDensity =
    combo.comboArray
      .filter((t) => t.type === "Trick")
      .reduce((sum, b) => sum + b?.pointValue, 0) /
    combo.comboArray.filter((t) => t.type === "Trick").length;
  let transitionDensity =
    combo.comboArray
      .filter((t) => t.type === "Transition")
      .reduce((sum, b) => sum + b?.pointValue, 0) /
    combo.comboArray.filter((t) => t.type === "Transition").length;
  const [seeRadar, setSeeRadar] = useState(false);
  return (
    <div
      className={
        "no-scrollbar relative left-0 top-0 h-full w-full place-items-center gap-2 overflow-hidden bg-zinc-900 bg-opacity-[90%] font-inter backdrop-blur-md"
      }
    >
      {/* Scores Display Grid*/}
      <div className="sticky left-0 top-0 grid h-[120px] w-full grid-cols-5 gap-2 bg-zinc-900 p-2">
        <div
          onClick={() => setCombodexopen(false)}
          className="outlineButton flex place-content-center place-items-center rounded-md border-transparent bg-zinc-300 bg-opacity-30 p-1 px-0 text-2xl"
        >
          X
        </div>
        <div
          className={
            "outlineButton col-span-4 border-[1px] border-zinc-300 border-opacity-80 bg-zinc-900 text-xl"
          }
        >
          <div>
            {localTotalScore}
            <span className="px-1 text-[10px]">pts</span>
          </div>
        </div>
        <div
          className={
            "outlineButton flex flex-col border-[1px] border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {sessionData.powerScore?.toFixed(2)}
          <span className="text-[8px]">{"power"}</span>
        </div>
        <div
          className={
            "outlineButton flex flex-col border-[1px] border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {sessionData.varietyScore?.toFixed(2)}
          <span className="text-[8px]">{"variety"}</span>
        </div>
        <div
          onClick={() => setExecutionOpen(!executionOpen)}
          className={`outlineButton border-[1px] ${
            executionOpen ? "border-amber-700" : "border-zinc-300"
          } flex flex-col border-opacity-40 bg-zinc-900`}
        >
          {executionAverage > 0.1
            ? executionScoreTotal?.toFixed(2)
            : executionAverage > 0
            ? "Need Rating"
            : executionScoreTotal?.toFixed(2)}
          <span className="text-[8px]">{"execution"}</span>
        </div>
        <div
          className={
            "outlineButton flex flex-col border-[1px] border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {sessionData?.chainTotal?.toFixed(2)}
          <span className="text-[8px]">{"chains"}</span>
        </div>
        <div
          className={
            "outlineButton flex flex-col border-[1px] border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {sessionData.bonusScore?.toFixed(2)}
          <span className="text-[8px]">{"bonus"}</span>
        </div>
      </div>

      {executionOpen && (
        <ComboExecutionSlider
          sessionData={sessionData}
          executionScore={executionScore}
          setExecutionScore={setExecutionScore}
        />
      )}
      <div className="flex h-fit w-full place-content-center p-2">
        <Link
          href={`/combos/${sessionData.clipLabel}`}
          className="h-fit w-fit rounded-md bg-zinc-700 bg-opacity-70 p-2 text-center"
        >
          See combo page!
        </Link>
      </div>
      {/* <CombodexTrickDetails
        chainMap={sessionData?.chainMap}
        varietyMap={sessionData?.varietyMap}
        tricks={tricks}
      /> */}
      {
        mostUsed?.length > 0 ? (
          <div className="w-full p-2 text-center">
            <span className="text-zinc-400">Most Used: </span>
            <span className="text-zinc-200">{mostUsed[0]}</span>
          </div>
        ) : null
        //  (
        // <div className="w-full p-2 text-center">
        //   <span className="text-zinc-200">No Repeats!! </span>
        // </div>
        // )
      }
      <div className="text-center">
        A <span className="font-bold">{numOfTricks}</span>
        {" hit combo with "}
        <span className="font-bold">{numOfTransitions}</span> transitions
      </div>
      <div className="min-h-2 no-scrollbar flex w-full gap-1 overflow-x-scroll p-2">
        <div className="w-[50%]">
          <h1>Compositon</h1>
          <p className="text-[10px] leading-none">
            the rotation of each trick in the combo
          </p>
        </div>
        <div className="overflow-scroll-x flex w-[50%] gap-1">
          {composition?.map((c) => (
            <div className={`h-full w-full bg-zinc-800 p-1 `}>{c}</div>
          ))}
        </div>
      </div>

      <DensityDisplay
        trickDensity={trickDensity}
        transitionDensity={transitionDensity}
      />
      {
        <div
          className="flex place-content-center p-2 text-center "
          onClick={() => setSeeRadar(!seeRadar)}
        >
          <div className={"outlineButton p-2"}>
            {!seeRadar ? "See pie" : "Hide pie"}
          </div>
        </div>
      }
      <div className={"h-[30%] w-full"}>
        {/* {tricks && seeRadar && <RadarChart data={tricks} />} */}
        {tricks && seeRadar && (
          <TrickPieChart
            group_by={"base_id"}
            data={tricks.filter((t) => t.type !== "Transition")}
          />
        )}
      </div>
    </div>
  );
};

export default Combodex;

export const DensityDisplay = ({ trickDensity, transitionDensity }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-zinc-700 p-2">
      <div
        onClick={() => setDetailsVisible((prev) => !prev)}
        className="flex w-full justify-between rounded-md bg-zinc-800 p-2"
      >
        <div>
          <h1>Density</h1>

          <p className="w-[45%] text-[10px] leading-none">
            this is an average of the raw trick score across the combo
          </p>
        </div>
        <div>{(trickDensity + transitionDensity)?.toFixed(3)}</div>
      </div>
      {detailsVisible && (
        <div className="flex w-full place-items-center justify-around gap-2">
          <div className="rounded-md bg-zinc-800 p-2">
            <span className="text-center text-xs">Tricks:</span>
            <div>{trickDensity?.toFixed(3)}</div>
          </div>
          <div className="text-xl">+</div>
          <div className="rounded-md bg-zinc-800 p-2">
            <span className="text-center text-xs">Transitons:</span>
            <div>{transitionDensity?.toFixed(3)}</div>
          </div>
          <div className="text-xl">=</div>
          <div className="rounded-md bg-zinc-800 p-2">
            <span className="text-center text-xs">Total:</span>
            <div>{(trickDensity + transitionDensity)?.toFixed(3)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CombodexTrickDetails = ({ tricks, chainMap, varietyMap }) => {
  return (
    <div
      className={
        "no-scrollbar flex h-fit w-full gap-1 overflow-x-scroll p-2 text-sm"
      }
    >
      {tricks &&
        tricks.map((tr, i) => {
          let bonusTotal = (
            parseFloat(
              chainMap?.map((cm) => (cm[0] === i ? cm[1] : "0"))[0] || 0
            ) +
            tr.pointValue +
            parseFloat(
              varietyMap?.map((vm) => (vm[0] === i ? vm[2] : "0"))[0] || 0
            )
          ).toFixed(2);
          return (
            <div
              key={tr.trick_id}
              className={`relative flex h-full flex-col place-items-center justify-between gap-1 whitespace-nowrap rounded-md bg-opacity-20 p-1 ${
                tr.type === "Transition" ? "bg-zinc-600" : "bg-zinc-300"
              }`}
            >
              <div className={"flex h-full flex-col gap-1 "} key={`${tr.name}`}>
                <div className="text-center font-medium">{tr.name}</div>
                {tr.type === "Transition" && (
                  <>
                    <div
                      className={
                        "outlineButton flex justify-between gap-2 border-[1px] border-zinc-300 p-1 text-xs"
                      }
                    >
                      <div>{tr.name}</div>
                      <div>{tr.pointValue}</div>
                    </div>
                  </>
                )}
                {tr.type === "Trick" && (
                  <>
                    <div
                      className={
                        "outlineButton flex justify-between gap-2 border-[1px] border-zinc-300 p-1 text-xs"
                      }
                    >
                      <div>{tr.base_id}</div>
                      <div>{tr?.base?.pointValue}</div>
                    </div>
                    {tr?.variations?.map((v, i) => (
                      <div
                        key={`${v.variation.name} + ${i}`}
                        className="outlineButton flex h-fit w-full justify-between gap-2 border-[1px] border-indigo-400 p-1 text-xs"
                      >
                        <div>{v.variation.name}</div>
                        <div>{v.variation.pointValue}</div>
                      </div>
                    ))}
                    <div
                      className={
                        "outlineButton flex justify-between gap-2 border-[1px] border-teal-300 p-1 text-xs"
                      }
                    >
                      <div>{tr.landingStance}</div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex place-content-center place-items-center gap-2">
                  {/* <div>{tr.pointValue}</div> */}
                  {tr.defaultAnimation && (
                    <Link
                      href={`/sandbox/${tr.animation.model}/${tr.animation.animationName}`}
                      onClick={() => console.log(tr)}
                      className="text-emerald-500"
                    >
                      <IoIosWalk />
                    </Link>
                  )}
                </div>
                <div>
                  {chainMap.map((cm) =>
                    cm[0] - 2 === i ? (
                      <>
                        <div
                          className={`absolute bottom-[10px] left-[90%] z-[-1] h-4 w-[110px] rounded-md bg-zinc-300 bg-opacity-20`}
                        />
                      </>
                    ) : null
                  )}
                </div>
                {/* <div>
                  {chainMap.map((cm) =>
                    cm[0] === i ? (
                      <div className="flex gap-1">
                        <div className={"text-[10px]"}>
                          {cm[2].toFixed(2)}cx
                        </div>
                        <div>{cm[1].toFixed(2)}</div>
                      </div>
                    ) : null
                  )}
                </div> */}
                {/* <div>
                  {varietyMap.map((vm) =>
                    vm[0] === i ? (
                      <div className="flex gap-1">
                        <div className={"text-[10px]"}>
                          {vm[1].toFixed(2)}vx
                        </div>
                        <div>{vm[2].toFixed(2)}</div>
                      </div>
                    ) : null
                  )}
                </div> */}
                {/* <div>{bonusTotal}</div> */}
                <div className="text-[8px]">{tr.type}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
