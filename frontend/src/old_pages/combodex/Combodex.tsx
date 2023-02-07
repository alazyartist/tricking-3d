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
  const numOfTransitions = combo.comboArray?.filter(
    (t) => t.type === "Transition" && t
  ).length;
  const numOfTricks = combo.comboArray?.filter(
    (t) => t.type === "Trick" && t
  ).length;
  useEffect(() => {
    console.log("combodex sd", sessionData);
  }, []);
  const { data: sessiondatascores } =
    trpc.sessionsummaries.getSessionDataScores.useQuery(
      {
        sessiondataid: sessionData.id,
      },
      { enabled: true }
    );
  const utils = trpc.useContext();
  const { data: tricks, mutateAsync: getTricks } =
    trpc.trick.findMultipleById.useMutation();

  const [executionScore, setExecutionScore] = useState(0.1);
  const [creativityScore, setCreativityScore] = useState(0);
  const [countTotal, setCount] = useState({});
  let executionAverage =
    sessiondatascores?.reduce((sum, b) => sum + b.executionScore, 0) /
    sessiondatascores?.length;
  let localTotal = (
    combo.pointValue +
    (creativityScore / 10) * combo.pointValue +
    executionAverage * combo.pointValue
  )?.toFixed(2);
  const composition = tricks
    ?.filter((t) => t.type === "Trick")
    .map((t) => {
      //@ts-ignore
      return t?.variations.filter((tr) => tr.variation.name === "FullTwist")
        .length;
    })
    .join("");
  console.log(composition);
  useEffect(() => {
    getTricks(combo.comboArray);
  }, []);

  useEffect(() => {
    if (localTotal !== "NaN") {
      updateTotalScore({
        sessiondataid: sessionData.id,
        totalScore: parseFloat(localTotal),
        executionAverage: parseFloat(executionAverage.toFixed(3)),
      });
    }
  }, [localTotal]);

  useEffect(() => {
    if (tricks) {
      let count = {};
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
      setCount(count);
      count = Object.keys(count)
        .map((key) => count[key])
        .reduce((sum, b) => sum + b.score, 0);
      setCreativityScore(count as number);
      console.log(count);
      console.log(countTotal);
    }
  }, [tricks]);
  let mostUsed = Object.keys(countTotal)?.sort((a, b) =>
    countTotal[a]?.count > countTotal[b]?.count ? -1 : 1
  );
  const [executionOpen, setExecutionOpen] = useState(false);
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
      <div className="sticky top-0 left-0 grid h-14 w-full grid-cols-5 gap-2 bg-zinc-900 p-2">
        <div
          onClick={() => setCombodexopen(false)}
          className="outlineButton flex place-content-center place-items-center rounded-md border-transparent bg-zinc-300 bg-opacity-30 p-1 px-0 text-2xl"
        >
          X
        </div>

        <div
          className={
            "outlineButton flex flex-col border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {combo?.pointValue}
          <span className="text-[8px]">{"power"}</span>
        </div>
        <div
          className={
            "outlineButton flex flex-col border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {((creativityScore / 10) * combo.pointValue).toFixed(2)}
          <span className="text-[8px]">{"variety"}</span>
        </div>
        <div
          onClick={() => setExecutionOpen(!executionOpen)}
          className={`outlineButton ${
            executionOpen ? "border-amber-700" : "border-zinc-300"
          } flex flex-col border-opacity-40 bg-zinc-900`}
        >
          {/* {(executionScore * combo.pointValue).toFixed(2)} */}
          {(executionAverage * combo.pointValue).toFixed(2) !== "NaN"
            ? (executionAverage * combo.pointValue).toFixed(2)
            : "Need Rating"}
          <span className="text-[8px]">{"execution"}</span>
        </div>
        <div
          className={
            "outlineButton border-zinc-300 border-opacity-80 bg-zinc-900"
          }
        >
          {localTotal}
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
      <CombodexTrickDetails tricks={tricks} />
      {tricks && <RadarChart data={tricks} />}
      <div className="min-h-20 flex w-full flex-col p-2">
        <div>Composition: {composition}</div>
        <div>Length: {combo.comboArray.length}</div>
        <div>Transitions: {numOfTransitions}</div>
        <div>Tricks: {numOfTricks}</div>
        <div>Most Used: {mostUsed[0]}</div>
        <div>Density</div>
        <div className="flex gap-2">
          <div className="rounded-md bg-zinc-600 p-1">
            Tricks: {trickDensity}
          </div>
          +
          <div className="rounded-md bg-zinc-600 p-1">
            Transiton: {transitionDensity}
          </div>
          =
          <div className="rounded-md bg-zinc-600 p-1">
            All: {trickDensity + transitionDensity}
          </div>
        </div>
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
    </div>
  );
};

export default Combodex;

export const CombodexTrickDetails = ({ tricks }) => {
  return (
    <div
      className={
        "no-scrollbar flex h-fit w-full gap-1 overflow-x-scroll p-2 text-sm"
      }
    >
      {tricks &&
        tricks.map((tr) => {
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
            <div className="flex h-full flex-col place-items-center justify-between gap-1 whitespace-nowrap rounded-md bg-zinc-200 bg-opacity-20 p-1">
              <div className={"flex h-full flex-col gap-1 "} key={`${tr.name}`}>
                <div className="text-center">{tr.name}</div>
                {tr.type === "Transition" && (
                  <>
                    <div
                      className={
                        "outlineButton flex justify-between gap-2 border-zinc-300"
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
                        "outlineButton flex justify-between gap-2 border-zinc-300"
                      }
                    >
                      <div>{tr.base_id}</div>
                      <div>{tr?.base?.pointValue}</div>
                    </div>
                    {tr?.variations?.map((v) => (
                      <div
                        key={`${v.variation.name} + ${Math.random()}`}
                        className="outlineButton flex h-fit w-full justify-between gap-2 border-indigo-400"
                      >
                        <div>{v.variation.name}</div>
                        <div>{v.variation.pointValue}</div>
                      </div>
                    ))}
                    <div
                      className={
                        "outlineButton flex justify-between gap-2 border-teal-300"
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
                <div className="text-[8px]">{tr.type}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
