import RadarChart from "@components/d3/RadarChartAI";
import { ComboDetailsDisplay } from "@old_pages/userProfile/components/ProfileSessionInfo";
import React, { useEffect, useState } from "react";
import { IoIosWalk } from "react-icons/io";
import { trpc } from "utils/trpc";
import ComboExecutionSlider from "./components/ComboExecutionSlider";
interface CombodexProps {
  combo: any;
  sessionData?: any;
  comboArray?: Array<any>;
  setCombodexopen?: any;
  totalScoreRes?: any;
  updateTotalScore?: any;
}
const Combodex: React.FC<CombodexProps> = ({
  comboArray,
  combo,
  sessionData,
  setCombodexopen,
  totalScoreRes,
  updateTotalScore,
}) => {
  const [executionOpen, setExecutionOpen] = useState(false);

  const { data: sessiondatascores } =
    trpc.sessionsummaries.getSessionDataScores.useQuery(
      {
        sessiondataid: sessionData.id,
      },
      { enabled: true }
    );
  const { data: tricks, mutateAsync: getTricks } =
    trpc.trick.findMultipleById.useMutation();
  const utils = trpc.useContext();
  const numOfTransitions = combo.comboArray?.filter(
    (t) => t.type === "Transition" && t
  ).length;
  const numOfTricks = combo.comboArray?.filter(
    (t) => t.type === "Trick" && t
  ).length;

  const [executionScore, setExecutionScore] = useState(0.1);
  const [creativityScore, setCreativityScore] = useState(0);
  const [countTotal, setCount] = useState({});
  const [trickCountTotal, setTrickCount] = useState({});
  const [chainsTotal, setChains] = useState({});
  const [chainMap, setChainMap] = useState([]);

  let executionAverage =
    sessiondatascores?.reduce((sum, b) => sum + b.executionScore, 0) /
    sessiondatascores?.length;
  let localTotalScore = (
    chainMap.reduce((sum, b) => sum + b[1], 0) +
    combo.pointValue +
    (creativityScore / 10) * combo.pointValue +
    executionAverage * combo.pointValue
  )?.toFixed(2);
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
    if (tricks) {
      let count = {};
      let trickCount = {};
      let chains = {};
      let chainNum = 0;
      let chainScore = [];
      // console.log(tricks);
      tricks.forEach((obj: any, i) => {
        console.log(i, obj);
        if (chains[`${obj?.transitionType}${chainNum}`]) {
          if (
            obj.type === "Transition" &&
            // @ts-ignore
            obj?.transitionType === tricks[i - 2]?.transitionType
          ) {
            console.log(
              "chained",
              tricks[i + 1]?.name,
              tricks[i + 1]?.pointValue
            );
            chains[`${obj?.transitionType}${chainNum}`].count++;
            if (obj.name === "Swing") {
              chains[`${obj?.transitionType}${chainNum}`].multiplier += 0.1;
            } else {
              chains[`${obj?.transitionType}${chainNum}`].multiplier += 0.05;
            }
            chainScore.push([
              i + 1,
              tricks[i + 1].pointValue *
                chains[`${obj?.transitionType}${chainNum}`]?.multiplier,
              tricks[i + 1].name,
            ]);
            chains[`${obj?.transitionType}${chainNum}`].chain.push([
              obj,
              tricks[i + 1],
              tricks[i + 1].pointValue *
                chains[`${obj?.transitionType}${chainNum}`]?.multiplier +
                tricks[i + 1].pointValue,
            ]);
            chains[`${obj?.transitionType}${chainNum}`].index = i;
          } else {
            chains[`${obj?.transitionType}${chainNum + 1}`] =
              chains[`${obj?.transitionType}${chainNum}`];
            chains[`${obj?.transitionType}${chainNum}`] = {
              chain: [],
              name: obj.name,
              count: 1,
              multiplier: obj.name === "Swing" ? 0.1 : 0.05,
              index: i,
            };

            console.log("BrokeChain");
          }
        } else {
          if (obj.type === "Transition") {
            console.log("newChain");
            chains[`${obj?.transitionType}${chainNum}`] = {
              chain: [],
              name: obj.name,
              count: 1,
              multiplier: obj.name === "Swing" ? 0.1 : 0.05,
              index: i,
            };
          }
        }
      });
      tricks
        .filter((t) => t.type === "Trick")
        .forEach((obj) => {
          if (trickCount[obj.name]) {
            trickCount[obj.name].count++;
            trickCount[obj.name].score -= 0.1;
          } else {
            trickCount[obj.name] = {
              count: 1,
              score: 1,
            };
          }
        });
      tricks
        // .filter((t) => t.type === "Trick")
        .forEach((obj) => {
          if (count[obj.name]) {
            count[obj.name].count++;
            count[obj.name].score -= 0.1;
          } else {
            count[obj.name] = {
              count: 1,
              score: 1,
            };
          }
        });
      console.log("chainsCore", chainScore);
      setChainMap(chainScore);
      setChains(chains);
      setCount(count);
      setTrickCount(trickCount);
      let cScore = Object.keys(count)
        .map((key) => count[key])
        .reduce((sum, b) => sum + b.score, 0);
      setCreativityScore(cScore as number);
    }
  }, [tricks]);
  useEffect(() => {
    console.log("chains", chainsTotal);
  }, [chainsTotal]);

  let mostUsed = Object.keys(trickCountTotal)?.sort((a, b) =>
    countTotal[a]?.count > countTotal[b]?.count ? -1 : 1
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
  return (
    <div
      className={
        "no-scrollbar relative top-0 left-0 h-full w-full place-items-center gap-2 overflow-hidden bg-zinc-900 bg-opacity-[90%] font-inter backdrop-blur-md"
      }
    >
      {/* Button Display Grid*/}
      <div className="sticky top-0 left-0 grid h-full w-full grid-cols-4 gap-2 bg-zinc-900 p-2">
        <div
          onClick={() => setCombodexopen(false)}
          className="outlineButton flex place-content-center place-items-center rounded-md border-transparent bg-zinc-300 bg-opacity-30 p-1 px-0 text-2xl"
        >
          X
        </div>
        <div
          className={
            "outlineButton col-span-3 border-[1px] border-zinc-300 border-opacity-80 bg-zinc-900 text-xl"
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
          {combo?.pointValue}
          <span className="text-[8px]">{"power"}</span>
        </div>
        <div
          className={
            "outlineButton flex flex-col border-[1px] border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {((creativityScore / 10) * combo.pointValue).toFixed(2)}
          <span className="text-[8px]">{"variety"}</span>
        </div>
        <div
          onClick={() => setExecutionOpen(!executionOpen)}
          className={`outlineButton border-[1px] ${
            executionOpen ? "border-amber-700" : "border-zinc-300"
          } flex flex-col border-opacity-40 bg-zinc-900`}
        >
          {(executionAverage * combo.pointValue).toFixed(2) !== "NaN"
            ? (executionAverage * combo.pointValue).toFixed(2)
            : "Need Rating"}
          <span className="text-[8px]">{"execution"}</span>
        </div>
        <div
          className={
            "outlineButton flex flex-col border-[1px] border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {chainMap.reduce((sum, b) => sum + b[1], 0).toFixed(2)}
          <span className="text-[8px]">{"chains"}</span>
        </div>
      </div>
      {/* </div> */}
      {/* <div>{combo?.comboArray.map((t) => t.trick_id)}</div> */}
      {executionOpen && (
        <ComboExecutionSlider
          sessionData={sessionData}
          executionScore={executionScore}
          setExecutionScore={setExecutionScore}
        />
      )}
      <CombodexTrickDetails chainMap={chainMap} tricks={tricks} />
      <div className="w-full p-2 text-center">
        <span className="text-zinc-400">Most Used: </span>
        <span className="text-zinc-200">{mostUsed[0]}</span>
      </div>
      <div className="text-center">
        A <span className="font-bold">{combo.comboArray.length}</span>
        {" hit combo with "}
        <span className="font-bold">{numOfTricks}</span> tricks
      </div>
      <div className="min-h-2 flex w-full gap-1 overflow-x-scroll p-2">
        {composition?.map((c) => (
          <div className={`h-[${parseInt(c) * 25}px] w-full bg-zinc-800 p-1 `}>
            {c}
          </div>
        ))}
      </div>
      <DensityDisplay
        trickDensity={trickDensity}
        transitionDensity={transitionDensity}
      />
      {tricks && <RadarChart data={tricks} />}
      {/* <div>
          json:{" "}
          {JSON.stringify(
            countTotal !== undefined &&
              Object.keys(countTotal)?.sort((a, b) =>
                countTotal[a]?.count > countTotal[b]?.count ? -1 : 1
              )
          )}
        </div> */}
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
        <div>Density</div>
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
            <span className="text-center text-xs">All:</span>
            <div>{(trickDensity + transitionDensity)?.toFixed(3)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CombodexTrickDetails = ({ tricks, chainMap }) => {
  return (
    <div
      className={
        "no-scrollbar flex h-fit w-full gap-1 overflow-x-scroll p-2 text-sm"
      }
    >
      {tricks &&
        tricks.map((tr, i) => {
          // if (tr.type === "Transition") {
          //   return (
          //     <div className="flex flex-col place-items-center gap-1 whitespace-nowrap rounded-md bg-zinc-200 bg-opacity-20 p-1">
          //       <div>{tr.name}</div>
          //       <div className="outlineButton flex w-full justify-between gap-2 whitespace-nowrap border-teal-300">
          //         <div>{tr.name}</div>
          //         <div>{tr.pointValue}</div>
          //       </div>
          //     </div>
          //   );
          // } else if (tr.type === "Trick") {
          return (
            <div
              className={`flex h-full flex-col place-items-center justify-between gap-1 whitespace-nowrap rounded-md bg-opacity-20 p-1 ${
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
                    {tr?.variations?.map((v) => (
                      <div
                        key={`${v.variation.name} + ${Math.random()}`}
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
                  <div>{tr.pointValue}</div>
                  {tr.defaultAnimation && (
                    <IoIosWalk className="text-emerald-500" />
                  )}
                </div>
                <div>
                  {chainMap.map((cm) =>
                    cm[0] === i ? cm[1].toFixed(2) : null
                  )}
                </div>
                <div>
                  {chainMap.map((cm) =>
                    cm[0] === i ? (tr.pointValue + cm[1]).toFixed(2) : null
                  )}
                </div>
                <div className="text-[8px]">{tr.type}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
