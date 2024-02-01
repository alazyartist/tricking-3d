// import RadarChart from "@components/d3/RadarChartAI";
import {
  combos,
  sessiondata,
  sessionsummaries,
  transitions,
  tricks,
} from "@prisma/client";
import React from "react";
import * as d3 from "d3";
import TrickPieChart from "@components/d3/TrickPieChart";
import BIFOPieChart from "@components/d3/BIFOPieChart";
import TransitionsBarChart from "@components/d3/TransitionsBarChart";

const OverallStatDisplay = ({ profileInfo }) => {
  if (!profileInfo) return null;
  let SessionSummaries: (sessionsummaries & {
    SessionData: (sessiondata & { ClipLabel: combos })[];
  })[] = profileInfo.SessionSummaries;
  const totalTricksRaw = SessionSummaries?.map((summary) =>
    summary.SessionData?.map((data) => {
      const ca = data.ClipLabel?.comboArray as unknown as (
        | tricks
        | transitions
      )[];
      return ca?.filter((trick) => trick.type !== "Transition");
    })
  ).flat(2);
  const totalTransitionsRaw = SessionSummaries?.map((summary) =>
    summary.SessionData?.map((data) => {
      const ca = data.ClipLabel?.comboArray as unknown as (
        | tricks
        | transitions
      )[];
      return ca?.filter((trick) => trick.type === "Transition");
    })
  ).flat(2);
  let totalTricks = SessionSummaries?.map((summary) =>
    summary.SessionData?.map((data) => {
      const ca = data.ClipLabel?.comboArray as unknown as (
        | tricks
        | transitions
      )[];
      return ca?.length;
    })
  )
    ?.map((a) => {
      return a?.reduce((sum, b) => sum + b, 0);
    })
    .reduce((sum, b) => sum + b, 0);
  let totalScore = Number(
    SessionSummaries?.map((summary) =>
      summary.SessionData?.map((data) => data.totalScore)
    )
      .flat(2)
      .reduce((sum, b) => sum + b, 0)
      .toFixed(2)
  );
  let totalCombosraw = SessionSummaries?.map((summary) =>
    summary.SessionData?.map((data) => data.ClipLabel)
  ).flat(2);
  let favoriteComboCount = Array.from(d3.group(totalCombosraw, (d) => d?.name))
    .map(([key, value]) => ({ name: key, count: value.length }))
    .sort((a, b) => b.count - a.count);
  console.log(favoriteComboCount);
  let totalCombos = totalCombosraw?.length;
  let allSessionTricks = SessionSummaries?.map((summary) =>
    summary.SessionData?.map((data) => {
      const ca = data.ClipLabel?.comboArray as unknown as (
        | tricks
        | transitions
      )[];

      return ca
        ?.map((trick) => {
          if (trick.type !== "Transition") {
            // console.log(trick);
          }
          if (trick.type !== ("Transition" || "Stance")) return trick.name;
        })
        .filter((combo) => combo !== undefined);
    })
  );
  //count tricks to find most used trick
  const favoriteTrick = allSessionTricks.flat(2).reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});
  const favoriteTrickName = Object.keys(favoriteTrick)
    .map((key) => {
      return [key, favoriteTrick[key]];
    })
    .sort((a, b) => b[1] - a[1]);
  // console.log(favoriteTrickName, favoriteTrick);
  return (
    <div className="relative w-full space-y-2 text-[12px] text-zinc-400">
      <div>
        Sesions Submitted:{" "}
        <span className="text-zinc-300">
          {profileInfo.SessionSummaries.length}
        </span>
      </div>
      <div>Total Score: {totalScore.toLocaleString()}</div>
      <div>Total Tricks: {totalTricks}</div>
      <div>Total Combos: {totalCombos}</div>
      <TrickPieChart data={totalTricksRaw} group_by={"base_id"} />
      <BIFOPieChart data={totalTricksRaw} />
      <div className="h-fit w-[90vw] overflow-x-scroll">
        <div className="h-32 w-[150%] ">
          <TransitionsBarChart data={totalTransitionsRaw} />
        </div>
      </div>
      <div className="flex w-full flex-col place-items-center gap-2 whitespace-nowrap">
        <div className="flex w-full flex-wrap gap-2">
          {favoriteComboCount?.map(
            (fc, i) =>
              i < 2 && (
                <p
                  key={fc.name}
                  className="overflow-x-scroll whitespace-nowrap rounded-md bg-zinc-800 p-1"
                >
                  {fc.name} {fc.count}
                </p>
              )
          )}
        </div>
        <div className="flex w-full flex-wrap gap-2">
          {favoriteTrickName?.map(
            (ft, i) =>
              i < 5 && (
                <p
                  key={ft[0]}
                  className="whitespace-nowrap rounded-md bg-zinc-800 p-1"
                >
                  {ft[0]} {ft[1]}
                </p>
              )
          )}
        </div>
      </div>
      {/* <div className={"absolute right-5 top-5 h-[200px] w-[400px]"}>
        <RadarChart data={allSessionTricks} />
      </div> */}
    </div>
  );
};

export default OverallStatDisplay;
